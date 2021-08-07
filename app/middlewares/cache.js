const redis = require('redis')
var client = redis.createClient()
client.on('connect', () => {
    require('bluebird').promisifyAll(redis)
  })


getCache = async (req, res, next) =>{
    let data = await client.getAsync(req.params.id);
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