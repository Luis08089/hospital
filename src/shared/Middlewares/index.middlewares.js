const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const validateJsonPayloadMiddleware = require('../Middlewares/validateJsonPayload.middleware');
const errorHandlerMiddleware = require('../Middlewares/errorHandler.middleware');

module.exports = ({ applicationServer }) => {
    const middlewares = [
        cors({origin: 'http://localhost', credentials: true}),
        helmet(),
        express.json(),
        express.urlencoded({ extended: false }),
        cookieParser(),
        compression(),
        morgan('dev'),
        validateJsonPayloadMiddleware(),
        errorHandlerMiddleware()
    ];
    middlewares.forEach((x) => applicationServer.use(x));
};
