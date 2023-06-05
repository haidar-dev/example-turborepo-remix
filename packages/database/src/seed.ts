import type { User } from "@prisma/client";

import { prisma } from ".";

const DEFAULT_USERS = [
  { name: "Admin", email: "admin@admin.com" },
  { name: "Editor", email: "editor@editor.com" },
  { name: "User", email: "user@user.com" },
] as Partial<User>[];

async function seed() {
  await seedUsers();
  await seedNotes();
}

async function seedUsers() {
  console.info("🟡 Seed users...");
  await prisma.user.deleteMany();

  DEFAULT_USERS.map(
    async (user) =>
      await prisma.user.upsert({
        where: { email: user.email! },
        update: { ...user },
        create: { ...user },
      })
  );
}

async function seedNotes() {
  console.info("🟡 Seed notes...");
}

(async () => {
  try {
    console.info("🟢 Seeding...");
    await seed();
  } catch (error) {
    console.error("🔴 Failed to seed");
    console.error(error);
    process.exit(1);
  } finally {
    console.error("🔵 Finished seeding");
    await prisma.$disconnect();
  }
})();
