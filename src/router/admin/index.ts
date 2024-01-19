import { RouterType } from "../../validations/route-dto";
import prefixRoutes from "./prefix";
import severityRoutes from "./severity";
import fieldRoutes from "./field";

const routes: RouterType[] = [
  {
    api: "prefix",
    router: prefixRoutes
  },
  {
    api: "severity",
    router: severityRoutes
  },
  {
    api: "field",
    router: fieldRoutes
  }
];

export default routes;