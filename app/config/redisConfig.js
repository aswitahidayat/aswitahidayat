const redis = require('redis')
const util = require('util')

const client = redis.createClient({
  port:process.env.REDIS_PORT, 
  host:process.env.REDIS_HOST,
});

client.on('connect', () => {
  require('bluebird').promisifyAll(redis)
})

// client.on('ready', function () {
// 	console.log('Successfully connect to Redis.');
// }).on('error', function () {
// 	console.log('Redis not connected!' , err);
// });

const redisConfig = {
    client
  };
  
module.exports = redisConfig;