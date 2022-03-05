const serverLoader = require('./server.loaders');
const databaseLoader = require('./database.loaders');
const routesLoader = require('../loaders/route.loaders');

module.exports.init = ({ applicationServer }, {
    ROUTES_FOLDER,
    MONGO_IS_ENABLED,
    MONGO_HOST,
}) => {
    const { httpServer } = serverLoader({ applicationServer });

    databaseLoader.init({
        MONGO_HOST,
        MONGO_IS_ENABLED,
    }); 

    routesLoader({ applicationServer }, { routesFolder: ROUTES_FOLDER });

    return { httpServer };
}