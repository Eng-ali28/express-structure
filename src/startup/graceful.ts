import {Server} from "http"
import mongoose from 'mongoose'
import logger from "./logging";

export default function shutdown(server : Server){
    process.on("SIGINT" , ()=>{
        logger.info("SIGTERM signal received.")
        logger.info("Closing http server")
        server.close();
    })

    server.on("close" , ()=>{
        logger.info("http serber closed")
        mongoose.connection.close(false).then(()=>{
            logger.info("MongoDb connection closed.");
            process.exit(0);
        })
    })
}

