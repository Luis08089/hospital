const express = require('express');
const loaders = require('../loaders/index.loaders');
const milddlewares = require('../../../shared/Middlewares/index.middlewares');
const gracefulShutdown = require('../../../shared/utils/gracefulShutdown.utils');
const logger = require('../../../shared/lib/winston/logger.winston');

module.exports.Start = ({
    ROUTES_FOLDER = 'routes',
    APP_PORT = 1338,
    MONGO_IS_ENABLED = true,
    MONGO_HOST = 'mongodb://localhost:27017',
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
