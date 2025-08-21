import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { API_KEYS, getDatabaseConfig } from "../config/api-keys";

neonConfig.webSocketConstructor = ws;

const dbConfig = getDatabaseConfig();
if (!dbConfig.url) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: dbConfig.url });
export const db = drizzle({ client: pool, schema });
