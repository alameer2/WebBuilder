import { DatabaseStorage } from "./storage-db";
import { SimpleMemoryStorage } from "./storage-simple";
import { API_KEYS } from "../config/api-keys";

// Create storage instance based on environment
let storageInstance: DatabaseStorage | SimpleMemoryStorage;

if (API_KEYS.DATABASE_URL) {
  console.log("Using PostgreSQL database storage");
  storageInstance = new DatabaseStorage();
} else {
  console.log("DATABASE_URL not found, using in-memory storage");
  storageInstance = new SimpleMemoryStorage();
}

export const storage = storageInstance;
export * from "./storage-db";
export * from "./storage-simple";