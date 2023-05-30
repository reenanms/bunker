import { PrismaClient } from './client'


async function seed(prisma: PrismaClient) {
  await prisma.group.create({
    data: {
      name: "Default",
      routesPermissions: {
        create: [
          { route: "*", permission: "r" }
        ]
      }
    }
  });

  const adminGroup = await prisma.group.create({
    data: {
      name: "Administrator",
      routesPermissions: {
        create: [
          { route: "*", permission: "*" }
        ]
      }
    }
  });

  await prisma.user.create({
    data: {
      username: "admin",
      password: "admin",
      name: "Administrator",
      groups: {
        connect: [{ id: adminGroup.id }]
      }
    }
  });
}

const prisma = new PrismaClient()
seed(prisma)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
