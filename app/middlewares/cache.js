const redisConfig = require("../config/redisConfig")

getCache = async (req, res, next) =>{
    let data = await redisConfig.client.getAsync(req.params.id);
    if(data){
        res.status(200).send(JSON.parse(data));
        return;
    }
    
    next();
}


const cache = {
    getCache
  };
  
module.exports = cache;