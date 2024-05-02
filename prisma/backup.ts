import { PrismaClient } from "@prisma/client";

import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const prisma = new PrismaClient();

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });