import express from 'express';
import redis from 'redis';
import util from 'util';
import kue from 'kue';

const client = redis.createClient();
const reserveSeatAsync = util.promisify(client.set).bind(client);
const getCurrentAvailableSeatsAsync = util.promisify(client.get).bind(client);

const queue = kue.createQueue();

const app = express();
const PORT = 1245;

let reservationEnabled = true;
let numberOfAvailableSeats = 50;

// Reserve a seat
async function reserveSeat(number) {
  try {
    await reserveSeatAsync('available_seats', number);
  } catch (error) {
    throw new Error('Failed to reserve seat');
  }
}

// Get current available seats
async function getCurrentAvailableSeats() {
  try {
    return await getCurrentAvailableSeatsAsync('available_seats');
  } catch (error) {
    throw new Error('Failed to get current available seats');
  }
}

// Initialize available seats
reserveSeat(numberOfAvailableSeats);

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const response = {
    numberOfAvailableSeats: await getCurrentAvailableSeats(),
  };
  res.json(response);
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  try {
    const job = queue.create('reserve_seat').save();
    job.on('complete', () => {
      console.log(`Seat reservation job ${job.id} completed`);
    });
    job.on('failed', (errorMessage) => {
      console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    });
    res.json({ status: 'Reservation in process' });
  } catch (error) {
    res.json({ status: 'Reservation failed' });
  }
});

// Route to process the queue and decrease available seats
app.get('/process', async (req, res) => {
  try {
    const availableSeats = await getCurrentAvailableSeats();
    const newAvailableSeats = parseInt(availableSeats) - 1;

    if (newAvailableSeats < 0) {
      throw new Error('Not enough seats available');
    }

    await reserveSeat(newAvailableSeats);

    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }

    res.json({ status: 'Queue processing' });
  } catch (error) {
    res.json({ status: 'Queue processing failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
