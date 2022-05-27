const { Router } = require("express")

const validateRequestMiddleware = require('../../../shared/Middlewares/validateRequest.middleware');
const authController = require('./authController.auth')
const loginSchema = require('./schemas/loginSchema.auth');

const controller = new authController();

module.exports = () => {
    const router = Router();

    router.post('/login', validateRequestMiddleware(loginSchema), controller.loginMethod);

    return router;
};