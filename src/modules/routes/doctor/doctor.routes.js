const { Router } = require("express");

const validateRequestMiddleware = require("../../../shared/Middlewares/validateRequest.middleware");
const doctorSchema = require("./doctor.schemaValid");
const emailSchema = require("./doctor.emailValid");
const docCont = require("./doctorControler.doctor");

module.exports = () => {
  const router = Router();

  router.post(
    "/",
    validateRequestMiddleware(doctorSchema),
    docCont.registerDoctor
  );

  router.get(
    "/",
    validateRequestMiddleware(emailSchema),
    docCont.getDoctor)

  return router;
};
