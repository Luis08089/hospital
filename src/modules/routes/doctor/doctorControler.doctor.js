const dao = require('./dao/consults.dao')
const {closeConnections} = require('../../../initializer/lib/loaders/database.loaders');
const {BadRequest,ServiceUnavailable} = require('../../../shared/errors/databaseError.error');
const {BAD_REQUEST, SERVICE_UNAVAILABLE} = require('../../../shared/errors/messages/error.messages');

let doc, getDoc;
    async function registerDoctor(request, response, next) {
      
      try{ 
       doc = await dao.doctorCreate(request.body)
      if(doc)  response.json(doc);

      } catch(e){
      next(e);  
      closeConnections();
    }
    }

    async function getDoctor(request, response, next) {
      try{ 
        getDoc = await dao.getDoctor(request.headers);
        if(getDoc) response.json(getDoc);
      } catch(e) { 
        next(e)
        closeConnections();
      }
    }





module.exports = {registerDoctor, getDoctor}