const {Doctor} = require('../schemas/doctor.schema');
const {hashPassword, compare} = require('../../../../shared/lib/bcrypt/encrypt')




async function doctorCreate(body){
    let pass = hashPassword(body.password);
    let doctor = new Doctor({
        firstName: body.first_name, 
        lastName: body.last_name, 
        email: body.email, 
        phone_number: body.phone_number, 
        password: pass, 
        locality: body.locality, 
        state: body.state, 
        street_name: body.street_name, 
        street_number: body.street_number, 
        userName: body.userName 
    });
    return await doctor.save();
}

module.exports = {
    doctorCreate
}
