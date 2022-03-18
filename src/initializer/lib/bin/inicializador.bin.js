const express = require('express');
const loaders = require('../loaders/index.loaders');
const milddlewares = require('../../../shared/Middlewares/index.middlewares');
const gracefulShutdown = require('../../../shared/utils/gracefulShutdown.utils');
const {DB} = require('../../../config/index');
const {APP} = require('../../../config/index');
const logger = require('../../../shared/lib/winston/logger.winston');

module.exports.Start = ({
    ROUTES_FOLDER = 'routes',
    APP_PORT = APP.PORT,
    MONGO_IS_ENABLED = true,
    MONGO_HOST = `mongodb://${DB.USER}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.DATABASE_NAME}?authSource=${DB.USER}`,
    //mongodb://admin:pancho97@localhost:27017/hospitals?authSource=admin
}) => {
    const applicationServer = express();

    milddlewares({ applicationServer });
    applicationServer.disable('etag');

    const { httpServer } = loaders.init({ applicationServer }, {
        ROUTES_FOLDER,
        MONGO_IS_ENABLED,
        MONGO_HOST,
    });

    gracefulShutdown({ applicationServer: httpServer });

    applicationServer.set('port', APP_PORT);

    httpServer.listen(APP_PORT);

    httpServer.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof APP_PORT === 'string' ? `Pipe ${APP_PORT}` : `APP_PORT ${APP_PORT}`;

        switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
        }
    });

    httpServer.on('listening', () => {
        const addr = httpServer.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info('HTTP Server listening', { port: bind });
    });
};
