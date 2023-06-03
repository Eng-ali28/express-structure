import * as dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})

import express , {Express} from 'express';
import {Server} from "http"
import './src/startup/db'
import graceful from './src/startup/graceful';
import startup from './src/startup/startup';
import routes from './src/startup/routes';

const app:Express = express();

startup(app);
routes(app)

const server:Server = app.listen(4000 , ()=>{
    console.log("Server running ...")
})

graceful(server);