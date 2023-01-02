import { routes } from "../routes";

/**
 * Modules base routes. Provided an object of it just to
 * easily configure application data sync module slices
 */
export const moduleRoutes = {
  clients: `${routes.dashboardRoute}/${routes.clientsModuleRoute}`,
};
