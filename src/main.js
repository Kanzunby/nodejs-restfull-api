import { logger } from "./apps/logging.js";
import { web } from "./apps/web.js";

web.listen(300, () => {
  logger.info("App start");
});
