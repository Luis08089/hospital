const {doctorSchema} = require('../schemas/doctor.schema');
const {getClients} = require('../../../../initializer/lib/loaders/database.loaders');

const conn = getClients().mongoInstance;

const Doctor = conn.model("doctor", doctorSchema);

async function doctorCreate(body){
    let doctor = new Doctor({
        firstname: body.firstname, 
        lastname: body.lastname, 
        email: body.email, 
        phone_number: body.phone_number, 
        password: body.password, 
        locality: body.locality, 
        state: body.state, 
        street_name: body.street_name, 
        street_number: body.street_number, 
        username: body.username 
    });
    return await doctor.save();
}

module.exports = {
    doctorCreate
}
