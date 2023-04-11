//USE SAMPLE

import { PrismaClient } from './prisma/client'

const prisma = new PrismaClient()

async function main() {

  const userToCreate = {
      name: 'Alice',
      email: 'alice2@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
  };

  const usersFound = await prisma.user.findMany({
    where: { email: userToCreate.email }
  })

  if (usersFound.length == 0) {
    const createdUser = await prisma.user.create({
      data: userToCreate
    });

    console.log("createdUser:", createdUser);
  }

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.log("allUsers:", allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });