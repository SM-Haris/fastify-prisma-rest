import userRoutes from "./app/user/routes";
import authRoutes from "./app/auth/routes";

export const routes = {
  "/api/user": userRoutes,
  "/api/auth": authRoutes,
};
