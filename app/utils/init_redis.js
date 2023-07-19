const redisDB = require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on('connect', () => console.log('connect to redis'));
redisClient.on('err', (err) => console.log('redisErr', err.message));
redisClient.on('ready', () => console.log('conneced to redis and ready to use'));
redisClient.on('end', () => console.log('disconneced from redis'));


module.exports = redisClient