const validator = require('../../../shared/utils/validators.util');

module.exports = [
validator.firstName,

validator.lastName,

validator.phone_number,

validator.email,

validator.password,

validator.locality,

validator.state,

validator.street_name,

validator.street_number,

validator.userName,

validator.confirmPassword('password')
];