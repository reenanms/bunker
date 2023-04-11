//USE SAMPLE

import { PrismaClient } from './prisma/client'

const prisma = new PrismaClient()

async function main() {
  const exampleToCreate = {
    name: "sample1"
  };

  const examplesFound = await prisma.example.findMany({
    where: { name: exampleToCreate.name }
  });

  if (examplesFound.length == 0) {
    const createdUser = await prisma.example.create({
      data: exampleToCreate
    });

    console.log("exampleToCreate:", exampleToCreate);
  }

  const allExamples = await prisma.example.findMany();
  
  console.log("allExamples:", allExamples);
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