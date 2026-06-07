import app from "./app";
import config from "./config";
import { initDB } from "./db"


const main=()=>{
    initDB();
    app.listen(config.port,()=>{
      console.log(`APP LISTENING ON PORT ${config.port}`);
    })
}
main()