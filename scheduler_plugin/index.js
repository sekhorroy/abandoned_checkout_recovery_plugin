import express from 'express';
import scheduleRoute from './route.js';
import { scheduleJobForNotification } from './Scheduler/jobScheduler.js';

const app = express();
const port = 8001;

app.use(express.json())

app.use('/', scheduleRoute)

app.listen(port, ()=>{
    console.log("Server is listening! PORT : " + port);

    //start out scheduler
    const job = scheduleJobForNotification()
})