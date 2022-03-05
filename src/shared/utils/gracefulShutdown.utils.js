const logger = require('../lib/winston/logger.winston');
const database = require('../../initializer/lib/loaders/database.loaders');
const { SHUTDOWN_TIMER } = require('../utils/defaults.utils');

const appStatus = {
    server: true,
    database: true,
};

function kill(code) {
    setTimeout( () => {
        logger.info('Aplication is shutting down');
        process.exit(code);
    }, SHUTDOWN_TIMER);
}

function handleShutdown({ applicationServer }) {
    try {
        applicationServer.close();
        database.closeConnections();
        appStatus.server = false;
        appStatus.database = false;
        kill(0);
    } catch (error) {
        logger.error('Error occured while shutting dows application', { error });
        kill(1);
    }
}

module.exports = ({ applicationServer }) => {
    process.on('SIGINT', () => {
        handleShutdown({ applicationServer });
    });
    process.on('SIGTERM', () => {
        handleShutdown({ applicationServer });
    });
};

module.exports.getStatus = () => appStatus;
