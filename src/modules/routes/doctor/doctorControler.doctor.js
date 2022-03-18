const dao = require('./dao/consults.dao')
const {closeConnections} = require('../../../initializer/lib/loaders/database.loaders');
const {BadRequest,ServiceUnavailable} = require('../../../shared/errors/databaseError.error');
const {BAD_REQUEST, SERVICE_UNAVAILABLE} = require('../../../shared/errors/messages/error.messages');

    async function registerDoctor(request, response, next) {
      
      try{ 
       let doc = await dao.doctorCreate(request.body)
      if(doc)  response.json(doc)

      } catch(e){
      next(e);  
      closeConnections();
    }
    }





module.exports = {registerDoctor,registrarSeeder}