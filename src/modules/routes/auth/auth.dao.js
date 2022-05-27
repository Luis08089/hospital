const {Doctor} = require('../doctor/schemas/doctor.schema');
const {hashPassword, compare} = require('../../../shared/lib/bcrypt/encrypt');


async function getDoctor(data){
    let doc = Doctor.find({"email": data.email}, {"_id": false});
    return doc;
}