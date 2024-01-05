import userRoutes from "./user";
import authRoutes from "./auth";
import { RouterType } from "../../validations/route-dto";

const routes: RouterType[] = [
  {
    api: "auth",
    router: authRoutes
  },
  {
    api: "user",
    router: userRoutes
  }
];

export default routes;