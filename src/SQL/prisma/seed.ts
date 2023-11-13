import { BasicTypes, DataTypes, PrismaClient } from './client'


async function seedUsers(prisma: PrismaClient) {
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

async function seedDataTypes(prisma: PrismaClient) {
  await prisma.dataType.create({
    data: {
      name: "integer",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.NO_QUOTES,
            regexValidator: "^\\d{1,}$"
          }
      }
    }
  });

  await prisma.dataType.create({
    data: {
      name: "float",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.NO_QUOTES,
            regexValidator: "^\\d{1,}[.]{0,1}\\d{0,}$"
          }
      }
    }
  });

  await prisma.dataType.create({
    data: {
      name: "boolean",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.NO_QUOTES,
            regexValidator: "^true|false$"
          }
      }
    }
  });
  
  await prisma.dataType.create({
    data: {
      name: "string",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.QUOTES,
            regexValidator: "^.{0,}$"
          }
      }
    }
  });

  await prisma.dataType.create({
    data: {
      name: "date",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.QUOTES,
            regexValidator: "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))$"
          }
      }
    }
  });

  await prisma.dataType.create({
    data: {
      name: "datetime",
      dataType: DataTypes.BASIC,
      dataTypeBasic: {
        create: {
            basicType: BasicTypes.QUOTES,
            regexValidator: "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}$"
          }
      }
    }
  });
}

async function seed(prisma: PrismaClient) {
  await seedUsers(prisma);
  await seedDataTypes(prisma);
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
