export class AuthFilterValueConverter {
  toView(routes, isAuthenticated) {
    console.log(routes, isAuthenticated)
    return routes.filter(r => r.config.auth === undefined || r.config.auth === !!isAuthenticated);
  }
}
