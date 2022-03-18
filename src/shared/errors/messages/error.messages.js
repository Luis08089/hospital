const { badRequest, notFound, serviceUnavailable, internalServerError } = require('../../utils/httpStatusCodes.utils');

module.exports = {
    SERVICE_UNAVAILABLE: {
        code: serviceUnavailable,
        message: {
            en: 'Service is temporarily unavailable',
            es: 'Servicio temporalmente fuera de servicio',
        },
    },
    NOT_FOUND: {
        code: notFound,
        message: {
            en: 'The server has not found anything matching the Request-URI',
            es: 'No se ha encontrado coincidencias de la URI en el servidor',
        },
    },
    BAD_REQUEST: {
        code: badRequest,
        message: {
            en: 'Something went wrong while processing the request.',
            es: 'Ups! Algo salio mal durante el proceso de peticion.',   
        },
    },
    DB_CONNECTION: {
        code: -999,
        message: {
            en: 'Database connection error.',
            es: 'Error al conectar con la base de datos',
        },
    },
    MISSING_CONFIG:{
        code: -1024,
        message: {
            en: 'Configuration parameter is missing',
            es: 'Se han perdido los parametros de configuracion',
        },
    },
    ERROR_SERVER:{ 
        code: internalServerError,
        message: {
            en: 'Internal server error', 
            es: 'Error interno de servidor',
        }
    }
};