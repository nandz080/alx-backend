// Import necessary modules
import { expect } from 'chai';

import kue from 'kue';

import createPushNotificationsJobs from './8-job.js';

// Set up the Kue queue
const queue = kue.createQueue();


// Enter test mode
queue.testMode.enter();

describe('createPushNotificationsJobs', () => {
  // Clear the queue before each test
  beforeEach(() => {
    queue.testMode.clear();
  });


  // Exit test mode after all tests are done
  after(() => {
    queue.testMode.exit();
  });


  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs(null, queue)).to.throw('Jobs is not an array');
  });


  it('should create two new jobs to the queue', () => {
    // Define the array of jobs
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
    ];


    // Call the function to create jobs
    createPushNotificationsJobs(jobs, queue);

    // Expect two jobs to be created in the queue
    expect(queue.testMode.jobs.length).to.equal(2);
  });
});
