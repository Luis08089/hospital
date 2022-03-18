const { validationResult } = require("express-validator");
const { BadRequest } = require("../errors/databaseError.error");
const {BAD_REQUEST} = require('../errors/messages/error.messages');

const errorFormatter = ({ msg }) => msg;

const validateRequest = (validations) => async (request, response, next) => {
  await Promise.all(validations.map((validation) => validation.run(request)));

  const errors = validationResult(request).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    const badreq = new BadRequest(BAD_REQUEST.message, BAD_REQUEST.code, errors.mapped());

    return next(badreq);
  }

  next();
};

module.exports = validateRequest;
