const _= require('lodash');
const { GenericError } = require('../errors/databaseError.error');
const { internalServerError, success } = require('../utils/httpStatusCodes.utils');
const { DEFAULT_LANG } = require('../utils/selectors.utils');

module.exports = ({ data, error, lang = DEFAULT_LANG}) => {
   let status = success;
   const result = {
       code: 1,
       name: undefined,
       data,
       message: undefined,
   };

   if (error instanceof GenericError) {
       result.code = error.code;
       result.message = error.genericMessage[lang];
       status = error.httpStatus;
   } else if (error instanceof Error) {
       result.code = 0;
       status = internalServerError;
   }

   return _.pickBy({ result, status }, _.identity);
}