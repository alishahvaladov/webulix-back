import { RouterType } from "../../validations/route-dto";
import prefixRoutes from "./prefix";
import severityRoutes from "./severity";
import fieldRoutes from "./field";
import errorReasonRoutes from "./error_reason";

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
  },
  {
    api: "error-reason",
    router: errorReasonRoutes
  }
];

export default routes;