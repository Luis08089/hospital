const fs = require("fs");
const path = require("path");
const { plural } = require("pluralize");
const AsyncWrapper = require("../../../shared/utils/asyncWrapper.utils");
const logger = require("../../../shared/lib/winston/logger.winston");
const {
  ServiceUnavailable,
  NotFound,
} = require("../../../shared/errors/databaseError.error");
const { getStatus } = require("../../../shared/utils/gracefulShutdown.utils");

const filesToExclude = ["index"];

module.exports = ({ applicationServer }, { routesFolder }) => {
  const routesDir = path.join(process.cwd(), routesFolder);

  if (fs.existsSync(routesFolder)) {
    const dir = fs.readdirSync(routesDir);

    const filteredDir = dir.filter((x) => x !== filesToExclude.map((y) => y));

    applicationServer.use("/", (req, res, next) => {
      if (!getStatus().server) {
        return next(new ServiceUnavailable());
      }
      return next();
    });
    filteredDir.forEach((route) => {
      const routeName = route.split(".").shift().toLocaleLowerCase();
      applicationServer.use(
        `/${plural(routeName)}`,
        require(`${routesDir}\\${routeName}\\${routeName}.routes.js`)()
      );
    });
  } else {
    logger.info("Routes folder is not found!");
  }

  applicationServer.use("*", (req, res, next) => next(new NotFound()));
  applicationServer.use((err, req, res, next) =>
    new AsyncWrapper({ err, req, res, next }).errorHandler()
  );
};
