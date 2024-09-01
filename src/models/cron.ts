import * as cron from "node-cron";
import User from "./users";


function purgeUnverifiedUsers (){
    cron.schedule( "0 * * * *", async ()=>{
        try{
            const expiryDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
            const purge = await User.deleteMany({emailVerified: false, createdAt: {$lt: expiryDate}})
            console.log(`Successfully purged ${purge.deletedCount}  unverified users`);
        }catch(error){
            console.log("Error deleting unverified users", error)
        }
    })
}

export default purgeUnverifiedUsers;