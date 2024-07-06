import { logger } from "./src/apps/logging.js";
import { web } from "./src/apps/web.js";

const port = 7000;

web.get("/", (req, res) => {
  res.send("server and mongo works");
});

web.listen(port, () => {
  logger.info(`App start listening on http://localhost:${port}`);
});
