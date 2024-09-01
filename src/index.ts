import app from "./app"
import config from "./configs";
import purgeUnverifiedUsers from "./models/cron";
import connectDb from "./utils/db";
// import log from "./utils/logger";

const startServer = async () => {
    try {
        await connectDb();

        purgeUnverifiedUsers();
     
        app.listen(config.PORT, ()=>{
        console.log("server is running, don't ask for port");
        // log.info("Server is now running")
    })
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
  };
  
startServer();