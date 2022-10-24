//import cron from 'node-cron';
import schedule  from 'node-schedule';
import { deleteFromJobDBbyIds, readFromJobDBAll, updateJobs } from '../DataFolder/proxyDatabase.js';
import { MAX_ALERT_ALLOWED } from '../scheduleConfig.js';
import { createMessageDataSource, createOrderInDB } from './abandonedCheckout.js';


export const scheduleJobForNotification = () => {
    let job = schedule.scheduleJob('5 * * * * *', async() =>  {

        console.log("job running ... ");
        const max_alert_allowed = MAX_ALERT_ALLOWED
        let CurrentDate = new Date();

        // Get all the jobs that are Dated: Today
        try {
            let jobObjList = await readFromJobDBAll()

            let job_Ids_to_delete = []
            let jobs_to_update = []
            let abandoned_checkout_ids = []
    
            if(jobObjList!=null && jobObjList.length > 0) {
                jobObjList.forEach(job => {
                     // it should check for the currTimeStamp >= defined timeStamp in the job object
                    if(job.completed === null) {
                        if((Date.parse(CurrentDate) >= Date.parse(job.alert_time[job.alert_count]) && (parseInt(job.alert_count) < parseInt(max_alert_allowed)))) {
                            abandoned_checkout_ids.push(job.abandoned_checkout_id)
                            job.alert_count = parseInt(job.alert_count) + 1;
                            jobs_to_update.push(job)
                        }
                        //check if the max _ count have exceeded
                        if(job.alert_count === max_alert_allowed) {
                            //remove the job
                            job_Ids_to_delete.push(job.id)
                        }
                    } else {
                        // create a new Order object and store in Order_DB
                        createOrderInDB(job.abandoned_checkout_id)
                        // remove the job from the job_DB
                        job_Ids_to_delete.push(job.id)
                    }
                });    
            } else {
                console.log("No Jobs available");
            }
    
            // we are doing the updatetion and deletion outside the for loop
            if(abandoned_checkout_ids.length > 0) {
                for (const id of abandoned_checkout_ids) {
                    await createMessageDataSource(id)
                    console.log("message created");
                }
            }
            if(jobs_to_update.length > 0) {
                try {
                    await updateJobs(jobs_to_update)
                    console.log("jobs updated");
                } catch (error) {
                    console.log(error);
                }
                
            }
            if(job_Ids_to_delete.length > 0) {
                try {
                    await deleteFromJobDBbyIds(job_Ids_to_delete)
                    console.log("jobs deleted");
                } catch (error) {
                   console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    return job
}