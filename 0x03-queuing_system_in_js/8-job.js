// Import the Kue library
import kue from 'kue';

// Define the function createPushNotificationsJobs
const createPushNotificationsJobs = (jobs, queue) => {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    // Iterate over each job in the array
    jobs.forEach((jobData) => {
        // Create a job in the queue push_notification_code_3
        const job = queue.create('push_notification_code_3', jobData);

        // Event listener for job creation
        job.on('enqueue', () => {
            console.log(`Notification job created: ${job.id}`);
        });

        // Event listener for job completion
        job.on('complete', () => {
            console.log(`Notification job ${job.id} completed`);
        });

        // Event listener for job failure
        job.on('failed', (errorMessage) => {
            console.log(`Notification job ${job.id} failed: ${errorMessage}`);
        });

        // Event listener for job progress
        job.on('progress', (progress, data) => {
            console.log(`Notification job ${job.id} ${progress}% complete`);
        });

        // Save the job to the queue
        job.save();
    });
};

// Export the createPushNotificationsJobs function
export default createPushNotificationsJobs;
