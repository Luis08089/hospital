const dao = require('./dao/consults.dao')
const {closeConnections} = require('../../../initializer/lib/loaders/database.loaders');




    async function registerDoctor(req, res, next) {
      try{ 
        await dao.doctorCreate(req.body)
    } catch(e){
      next(e);  
      closeConnections();
    }
}



module.exports = {registerDoctor}