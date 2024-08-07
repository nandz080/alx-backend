import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Connect to Redis server
client
	.on('connect', () => {
  	console.log('Redis client connected to the server');
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);


client.hgetall('HolbertonSchools', (err, obj) => {
  if (err) {
    console.error(err);
  } else {
    console.log(obj);
  }
  // Close the connection to Redis server
  client.quit();
});
