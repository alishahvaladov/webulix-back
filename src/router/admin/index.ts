import { RouterType } from "../../validations/route-dto";
import prefixRoutes from "./prefix";
import severityRoutes from "./severity";
import fieldRoutes from "./field";
import errorReasonRoutes from "./error_reason";
import customErrorRoutes from "./custom_errors";
import roleRoutes from "./role";
import collectionRoutes from "./collection";

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
  },
  {
    api: "custom-error",
    router: customErrorRoutes
  },
  {
    api: "role",
    router: roleRoutes
  },
  {
    api: "collection",
    router: collectionRoutes
  }
];

export default routes;