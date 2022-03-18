const seeder = require('mongoose-seed');
const {faker} = require('@faker-js/faker');
const {DB} = require('./src/config/index');

const db = `mongodb://${DB.USER}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.DATABASE_NAME}?authSource=${DB.USER}`;

seeder.connect(db, function () {
    seeder.loadModels(['./src/modules/routes/doctor/schemas/doctorSeed.schema']);

    //seeder.clearModels(['doctorSeed']);
    
    seeder.populateModels(data, function (err,done) {
        if(err) { 
            return console.log('seed err', err);
        }
        if(done)
            return console.log('seed done', done);

        seeder.disconnect();    
    })
});

const data = [
    {
        'model': 'doctorSeed', 
        'documents': [
            {
                'firstName':faker.name.firstName(),

                'lastName': faker.name.lastName(),

                'cedule_number': faker.random.alphaNumeric(20),

                'speciality': "Optamologo",

                'phone_number': faker.phone.phoneNumberFormat(),

                'email': faker.internet.email(),

                'password': faker.internet.password(),

                'locality': faker.address.city(),

                'state': faker.address.state(),

                'street_name': faker.address.streetName(),

                'street_number': faker.address.streetAddress(),

                'userName': faker.internet.userName(),
            }
        ]
    }
];