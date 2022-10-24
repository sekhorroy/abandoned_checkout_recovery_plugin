import { log } from 'console';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// write to abandoned_checkout_data_store
export const writeToAbandonedDB = (req_data) => {
    //const dataPath = path.resolve('/Users/debashishroy/Desktop/scheduler_plugin/DataFolder', '../DataFolder/abandoned_checkout_dataSource.json')
    const dataPath = path.resolve(__dirname + "/abandoned_checkout_dataSource.json")

    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
       // emptyFile
        const jsonData = []
        jsonData.push(req_data)
        const json = JSON.stringify(jsonData); //convert it back to json
        fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                console.log('abandoned_checkout_dataSource write complete ');
        }); // write it back 
    } else {
        fs.readFile(dataPath , 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
    
                const obj = JSON.parse(data); //now it an object
    
                obj.push(req_data); //add some data
    
                const json = JSON.stringify(obj); //convert it back to json
                fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                    console.log('abandoned_checkout_dataSource write complete ');
                }); // write it back 
            }
        });
    }
}
export const readFromAbandonedDB = async (id) => {
    const dataPath = path.resolve(__dirname + "/abandoned_checkout_dataSource.json")
    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
        return null;
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data); //now it an object
        return objList.find(obj => obj.id === id)
    }
}

// Job Related DB queries
export const writeToJobDB = (req_data) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json");
    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
        // emptyFile
         const jsonData = []
         jsonData.push(req_data)
         const json = JSON.stringify(jsonData); //convert it back to json
         fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                 console.log('jobDataSource write complete ');
         }); // write it back 
     } else {
        fs.readFile(dataPath, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            const obj = JSON.parse(data); //now it an object
    
            obj.push(req_data); //add some data
    
            const json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                console.log('jobDataSource write complete');
            }); // write it back 
        }});
     }
}
export const updateJobDBbyId = async(id, req_data) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);
    if(stat.size === 0) {
        // emptyFile
        // do nothing       
        console.log("Nothing to update on an empty Job Data Source");
    } else {
        // else we update the value
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data);
        const index = objList.findIndex(ob => ob.id === id)
        //update the entire object
        objList[index] = req_data


        try {
            const json = JSON.stringify(objList)
            await fs.promises.writeFile(dataPath, json,  "utf8")
            console.log("Job Updated");
        } catch (error) {
            console.log("Write Failed ion update Job By Id function");
            console.log(error);
        }
    }
}
export const updateJobs = async(jobs) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);
    if(stat.size === 0) {
        // emptyFile
        // do nothing       
        console.log("Nothing to update on an empty Job Data Source");
    } else {
        // else we update the value
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data);
        jobs.forEach((job)=> {
            const index = objList.findIndex(ob => ob.id === job.id)
            //update the entire object
            objList[index] = job
        })
        
        try {
            const json = JSON.stringify(objList)
            await fs.promises.writeFile(dataPath, json,  "utf8")
            console.log("Job Updated");
        } catch (error) {
            console.log("Write Failed ion update Job By Id function");
            console.log(error);
        }
    }
}
export const readFromJobDBbyId =  async (id) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
        return null;
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data); //now it an object
        return objList.find(obj => obj.id === id)
    }

    /*
    fs.readFile(dataPath, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                 const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        return JSON.parse(data);
            const objList = JSON.parse(data); //now it an object

            return 
    }});
    */
}
export const readFromJobDBAll = async() => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);
    //if nothing in the file then
    if(stat.size === 0) {
        return null;
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        return JSON.parse(data);
    }
}
export const deleteFromJobDBbyId = async (id) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);
    //if nothing in the file then
    if(stat.size === 0) {
       
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data)
        const newList = objList.filter(ob => ob.id !== id)
        console.log(newList);
        try {
            const json = JSON.stringify(newList)
            await fs.promises.writeFile(dataPath, json,  "utf8")
            console.log("Job Delete Complete");
        } catch (error) {
            console.log("Job Deletion Error");
            console.log(error);
        }
    }
}
export const deleteFromJobDBbyIds = async (ids) => {
    const dataPath = path.resolve(__dirname + "/jobDataSource.json")
    const stat = fs.statSync(dataPath);
    //if nothing in the file then
    if(stat.size === 0) {
       
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        const objList = JSON.parse(data)

        let newList = []

        ids.forEach((id)=>{
            newList = objList.filter(ob => ob.id !== id)
        })
        //const newList = objList.filter(ob => ob.id !== id)
        console.log(newList);
        try {
            const json = JSON.stringify(newList)
            await fs.promises.writeFile(dataPath, json,  "utf8")
            console.log("Job Delete Complete");
        } catch (error) {
            console.log("Job Deletion Error");
            console.log(error);
        }
    }
}

// Order Related DB queries
export const writeToOrderDB = (req_data) => {
    const dataPath = path.resolve(__dirname + "/orders_dataSource.json")
    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
        // emptyFile
         const jsonData = []
         jsonData.push(req_data)
         const json = JSON.stringify(jsonData); //convert it back to json
         fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                 console.log('Orders Data Source write complete ');
         }); // write it back 
     } else {
        fs.readFile(dataPath, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            const obj = JSON.parse(data); //now it an object
    
            obj.push(req_data); //add some data
    
            const json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(dataPath, json, 'utf8', function writeFileCallback(err, data){
                console.log('Orders Data Source write complete');
            }); // write it back 
        }});
     }
}
export const readfromOrderDB = (id) => {
    const dataPath = path.resolve(__dirname + "/orders_dataSource.json")
    fs.readFile(dataPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        const obj = JSON.parse(data); //now it an object

        return obj.find(ob => ob.id === id)
    }});
}
export const readFromOrderDBAll = async() => {
    const dataPath = path.resolve(__dirname + "/orders_dataSource.json")
    const stat = fs.statSync(dataPath);
    //if nothing in the file then
    if(stat.size === 0) {
        return null;
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        return JSON.parse(data);
    }
}


// Message Related DB queries
export const createMessageInDb = async(message_data) => {
    const dataPath = path.resolve(__dirname + "/messageDataSource.json")
    const stat = fs.statSync(dataPath);

    if(stat.size === 0) {
        // emptyFile
         const jsonData = []
         jsonData.push(message_data)
         const json = JSON.stringify(jsonData); //convert it back to json
         await fs.promises.writeFile(dataPath, json, 'utf8'); // write it back 
         console.log("Message Send to Customer");
     } else {
        try {
            const data = await fs.promises.readFile(dataPath, 'utf8')
            const objList = JSON.parse(data)
            objList.push(message_data)
            const json = JSON.stringify(objList)

            try {
                await fs.promises.writeFile(dataPath, json, 'utf8')
                console.log("Message Send to Customer");
            } catch (error) {
                console.log("Message Write error" + error);
            }
        } catch (error) {
            console.log("Message Read Error" + error);
        }
     }
}
export const readFromMessageDBAll = async() => {
    const dataPath = path.resolve(__dirname + "/messageDataSource.json")
    const stat = fs.statSync(dataPath);
    //if nothing in the file then
    if(stat.size === 0) {
        return null;
    } else {
        const data = await fs.promises.readFile(dataPath, 'utf8').catch((error) => console.log(error))
        return JSON.parse(data);
    }
}


export const removeAllDb = async() => {
    const json = []
    // reset abondoned db
    let dataPath = path.resolve(__dirname + "/abandoned_checkout_dataSource.json")
    try {
        await fs.promises.writeFile(dataPath, json, 'utf8')
        console.log("Reset abandoned_checkout DB");
    } catch (error) {
        console.log(error);
    }

    // reset job db
    dataPath = path.resolve(__dirname + "/jobDataSource.json");
    try {
        await fs.promises.writeFile(dataPath, json, 'utf8')
        console.log("Reset Job DB");
    } catch (error) {
        console.log(error);
    }
   
    // reset message db
    dataPath = path.resolve(__dirname + "/messageDataSource.json")
    try {
        await fs.promises.writeFile(dataPath, json, 'utf8')
        console.log("Reset Message DB");
    } catch (error) {
        console.log(error);
    }
}