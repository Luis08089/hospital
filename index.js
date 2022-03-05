const lib = require('./src/initializer/lib/bin/inicializador.bin.js');

lib.Start({
    ROUTES_FOLDER: './src/modules/routes',
    APP_PORT: 1338,
    MONGO_HOST: process.env.DATABASE_HOST,
    MONGO_IS_ENABLED: true
});