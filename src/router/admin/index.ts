import { RouterType } from "../../validations/route-dto";
import prefixRoutes from "./prefix";
import severityRoutes from "./severity";

const routes: RouterType[] = [
  {
    api: "prefix",
    router: prefixRoutes
  },
  {
    api: "severity",
    router: severityRoutes
  }
];

export default routes;