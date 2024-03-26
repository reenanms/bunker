import { UserPermission } from '../basic/auth/UserPermission';
import { UserPermissionService } from '../basic/auth/UserPermissionService';
import { PrismaClient } from './prisma/client'
import { AuthService } from '../basic/auth/AuthService';


async function getUserPermissions(prisma: PrismaClient, username: string) : Promise<UserPermission[]> {
  const user = await prisma.user.findFirst({
    where: { username: username },
    include: { groups: { include: { routesPermissions: true } } }
  });

  const userRoutesPermissions = user!.groups
    .map(e => e.routesPermissions)
    .reduce((acc, routesPermissions) => acc.concat(routesPermissions), [])

  const userPermissions = userRoutesPermissions
      .map<UserPermission>(e => ({
              Username: user!.username,
              Route: e.route,
              Permission: e.permission })
          );
  
  return userPermissions;
}

async function userHasAccess(prisma: PrismaClient, username: string, route: string, permission: string) {
  const userPermissions = await getUserPermissions(prisma, username);

  return new UserPermissionService(userPermissions)
      .hasAccess(route, permission);
}

async function main(prisma: PrismaClient) {
  // SAMPLE:
  const user = "admin";
  const routeToAccess = "/"
  const permissionNecessary = "w";

  const authService = new AuthService();
  const token = await authService.generateToken(user);
  const validatedAuth = await authService.getTokenPaylod(token.token);

  const hasAccess = await userHasAccess(prisma, validatedAuth!.username, routeToAccess, permissionNecessary);
  console.log(user, routeToAccess, permissionNecessary, hasAccess);
}

{
  const prisma = new PrismaClient()
  main(prisma)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    });
}
