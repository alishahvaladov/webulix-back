import MemberRoutes from "./members";
import AdminRoutes from "./admin";
import { RoutesType } from "../validations/route-dto";

const allRoutes: RoutesType[] = [
  {
    api: "api",
    routes: MemberRoutes
  },
  {
    api: "api/admin",
    routes: AdminRoutes
  }
];

export default allRoutes;