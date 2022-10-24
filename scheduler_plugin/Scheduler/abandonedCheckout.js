import {
    readFromAbandonedDB,
    writeToAbandonedDB,
    writeToJobDB,
    writeToOrderDB,
    createMessageInDb,
    readFromMessageDBAll,
    readFromOrderDBAll,
    removeAllDb
} from '../DataFolder/proxyDatabase.js'
import { SCHEDULE_CONFIG } from '../scheduleConfig.js';

// function to generate future Date object
const getFutureDate = (timeFrame, count) => {
    let date = new Date()
    if(timeFrame === "minutes") {
        let futureDate = new Date(date.getTime() + count*60000);
        return futureDate
    } 
    if(timeFrame === "days") {
        let futureDate = new Date(date.setDate(date.getDate() + count));
        return futureDate
    }
}


// we pass the abandoned_checkout_Id
export const createOrderInDB = async (id) => {
    //get the abandoned_checkout_data by id from the abandoned_checkout_data_DB
    const abandoned_checkout_data = await readFromAbandonedDB(id);
    const orderData = {
        id: new Date().valueOf(),
        order: abandoned_checkout_data
    }
    writeToOrderDB(orderData)
}

export const createMessageDataSource = async(abandoned_checkout_id) => {
    // get the abandoned_checkout_data from DB
    const abandoned_checkout_data = await readFromAbandonedDB(abandoned_checkout_id)
    
        const newMessage = {
            id:  new Date().valueOf(),
            customer: abandoned_checkout_data.customer,
            abandoned_checkout_url: abandoned_checkout_data.abandoned_checkout_url,
            user_id: abandoned_checkout_data.user_id,
            total_price: abandoned_checkout_data.total_price,
            order_id: abandoned_checkout_data.id
        }
        await createMessageInDb(newMessage)
        console.log("New Message Created");
}

const createJobDataSource = (abandoned_checkout_data) => {
    // this data will be stored that the job scheduler will constantly keep
    // on checking for the timeStamp
    const date = new Date();
    const curr_time = Date.now;

    //create the alert_time_arr

    let alert_time_arr = []

    SCHEDULE_CONFIG.forEach((schedule) => {
        alert_time_arr.push(getFutureDate(schedule.timeframe, schedule.value))
    })

    const {
        id,
        completed_at
    }  = abandoned_checkout_data

    let jobData = {
        id: new Date().valueOf(),
        abandoned_checkout_id: id,
        alert_count: 0,
        alert_time: alert_time_arr,
        completed: completed_at
    }
    // we store this job data in a separate data source to allow our job Scheduler to check
    // for push notification
    return jobData
}

// controller --> localhost:PORT/abandoned
export const abandonedCheckoutController = (req, res, next) => {
    try {
        const abandoned_data = req.body;
        const jobData = createJobDataSource(abandoned_data)

        writeToAbandonedDB(abandoned_data)
        writeToJobDB(jobData)

        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }
}

export const getAllMessages = async(req, res, next) => {
    try {
        const message_data_list = await readFromMessageDBAll()
        res.json({success: true, error: null, data: message_data_list})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }
}

export const getAllOrders = async(req, res, next) => {
    try {
        const order_data_list = await readFromOrderDBAll()
        res.json({success: true, error: null, data: order_data_list})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }
}

export const resetAllDbs = async(req, res, next) => {
    try {
        await removeAllDb()
        console.log("All resources reset complete");
        res.json({success: true, error: null})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }
}