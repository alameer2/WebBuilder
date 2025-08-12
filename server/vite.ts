import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { storage } from "./storage";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Static with cache headers for assets
  app.use((req, res, next) => {
    if (/(?:\/assets\/|\.woff2$|\.woff$|\.ttf$|\.eot$|\.svg$|\.png$|\.jpg$|\.jpeg$|\.webp$|\.gif$)/.test(req.path)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    next();
  });

  app.get(["/robots.txt"], (_req, res) => {
    res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n");
  });

  app.get(["/sitemap.xml"], async (_req, res) => {
    try {
      const baseUrl = process.env.PUBLIC_URL || "https://yemen-flix.com";
      const indexHtml = path.resolve(distPath, "index.html");
      if (!fs.existsSync(indexHtml)) {
        return res.status(404).end();
      }

      const staticUrls = ["/", "/movies", "/series", "/shows", "/mix", "/recent", "/contactus", "/favorites", "/notifications"];

      let dynamicUrls = "";
      try {
        const all = await storage.getAllMovies();
        dynamicUrls = all
          .map((m) => {
            const loc = m.category === 'series' ? `/series/${m.id}` : `/movie/${m.id}`;
            const lastmod = (m.updatedDate || m.addedDate) ? new Date(m.updatedDate || m.addedDate as any).toISOString() : undefined;
            return `<url><loc>${baseUrl}${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
          })
          .join("");
      } catch (_e) {
        dynamicUrls = ""; // fallback quietly
      }

      const urls = staticUrls.map((u) => `<url><loc>${baseUrl}${u}</loc></url>`).join("") + dynamicUrls;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
      res.type("application/xml").send(xml);
    } catch {
      res.status(500).end();
    }
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
