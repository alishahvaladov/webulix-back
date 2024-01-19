import { Express } from "express";
import { RoutesType } from "./src/validations/route-dto";
import { ErrorHandler } from "./src/middleware/ErrorHandler";


export default class RouteInitializer {
  constructor(public app: Express, public routes: RoutesType[]) {
    this.routes = routes;
    this.app = app;
  }

  initializeRoutes() {
    this.routes.forEach(routesItem => {
      routesItem.routes.forEach(routerItem => {
        this.app.use(`/${routesItem.api}/${routerItem.api}`, routerItem.router);
      });
    });

    this.app.use(ErrorHandler);
  }
}