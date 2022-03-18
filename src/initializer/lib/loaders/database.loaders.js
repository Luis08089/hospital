const mongoose = require('mongoose');
const _= require('lodash');
const logger = require('../../../shared/lib/winston/logger.winston');
const {STORE_CONNECTION_TIMEOUT} = require('../../../shared/utils/defaults.utils');
const {DatabaseError} = require('../../../shared/errors/databaseError.error');


const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw new DatabaseError();
    }, STORE_CONNECTION_TIMEOUT);
}

function instanceEventListeners({ conn }) {
    conn.on('connected', () => {
        logger.info('Database - Connection status: connected');
        clearTimeout(connectionTimeout);
    });

    conn.on('disconnected', () => {
        logger.info('Database - Connection status: disconected');
        throwTimeoutError();
    });

    conn.on('reconnected', () => {
        logger.info('Database - Connection status: reconnected');
        clearTimeout(connectionTimeout);
    });

    conn.on('close', () => {
        logger.info('Database - Connection status: close');
        clearTimeout(connectionTimeout);
    });
}

module.exports.init = ({
    MONGO_IS_ENABLED,
    MONGO_HOST,
}) => {
    if(MONGO_IS_ENABLED) {
      const mongoInstance = mongoose.createConnection(MONGO_HOST,{  
        useNewUrlParser: true,
        keepAlive: true,
        w: 'majority',
      });
      clients.mongoInstance = mongoInstance;
      instanceEventListeners({ conn: mongoInstance }); 
    }

    module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.close());
    module.exports.getClients = () => clients;
}
