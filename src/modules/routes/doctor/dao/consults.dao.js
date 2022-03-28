const {Doctor} = require('../schemas/doctor.schema');
const {hashPassword, compare} = require('../../../../shared/lib/bcrypt/encrypt')




async function doctorCreate(body){
    let pass = await hashPassword(body.password);
    let doctor = new Doctor({
        firstName: body.first_name, 
        lastName: body.last_name,
        cedule_number: body.cedule_number,
        speciality: body.speciality, 
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

async function getDoctor(data){ 
    let doc = Doctor.find({"email": data});
    return doc;
}

module.exports = {
    doctorCreate,
    getDoctor
}
