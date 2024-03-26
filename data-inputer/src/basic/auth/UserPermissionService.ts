import { UserPermission } from "./UserPermission";


export class UserPermissionService {
  private userPermissions: UserPermission[];

  constructor(userPermissions: UserPermission[]) {
    this.userPermissions = userPermissions;
  }

  private async buildPossibleRoutePermission(route: string): Promise<string[]> {
    const ROUTE_DIVISOR = "/";
    const ROUTE_ALL = "*";

    const possibleRoutes = [route];
    const routeParts = route.split(ROUTE_DIVISOR);

    let possibleRoute = "";
    for (const routePart of routeParts) {
      possibleRoutes.push(`${possibleRoute}${ROUTE_ALL}`);
      possibleRoute = `${possibleRoute}${routePart}${ROUTE_DIVISOR}`;
    }

    return possibleRoutes;
  }

  private async getRoutePermissions(route: string): Promise<UserPermission[]> {
    const routeLowerCase = route.toLowerCase();
    const possibleRoutePermission = await this.buildPossibleRoutePermission(routeLowerCase);

    const permissions = this.userPermissions.filter(
      permission => {
        const currentRouteLowerCase = permission.Route.toLowerCase();
        for (const route of possibleRoutePermission) {
          if (route == currentRouteLowerCase)
            return true;
        }

        return false;
      }
    );

    return permissions;
  }

  private async hasPermission(routePermissions: UserPermission[], permission: string): Promise<boolean> {
    const PERMISSION_ALL = "*";

    for (const routePermission of routePermissions) {
      if (routePermission.Permission == PERMISSION_ALL)
        return true;

      if (routePermission.Permission == permission)
        return true;
    }

    return false;
  }

  public async hasAccess(route: string, permission: string): Promise<boolean> {
    const userRoutePermissions = await this.getRoutePermissions(route);
    const userHasPermission = await this.hasPermission(userRoutePermissions, permission);
    return userHasPermission;

    /*
    TODO: Create test
    const allUserPermissions = [
      { Username: "user", Route: "*",            Permission: "a" }, //<--
      { Username: "user", Route: "/*",           Permission: "b" }, //<--
      { Username: "user", Route: "/user/send",   Permission: "c" }, //<--
      { Username: "user", Route: "/user/send/*", Permission: "d" },
      { Username: "user", Route: "/user/*",      Permission: "e" }, //<--
      { Username: "user", Route: "/user/mm",     Permission: "f" },
      { Username: "user", Route: "/tst",         Permission: "g" }
    ]
 
    const result = await getRoutePermissions(allUserPermissions, "/user/send");
    console.log(result); //expected: a,b,c,e
 
    const a = await hasPermission(result, "a");
    const b = await hasPermission(result, "b");
    const c = await hasPermission(result, "c");
    const d = await hasPermission(result, "d");
    const e = await hasPermission(result, "e");
    const f = await hasPermission(result, "f");
    const g = await hasPermission(result, "g");
 
    
    console.log(a,b,c,d,e,f,g); //expected: true,true,true,false,true, false,false
    */
  }
}
