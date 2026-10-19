import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/client/client.ts";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to connect to the portfolio database.");
}

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter });
export { PrismaClient };
export type { ContactMessage } from "../generated/client/client.ts";
