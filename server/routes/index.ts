import apiRoutes from "./apis";
import pagesRoutes from "./pages";

const routesMiddleware = (app: Express.Application, ...routes: Function[]) => {
    routes.forEach((route: Function) => {
        route(app);
    });
}

export = (app: Express.Application) => {
    routesMiddleware(app, apiRoutes, pagesRoutes);
}
