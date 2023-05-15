import * as dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})

import express , {Express} from 'express';
import {Server} from "http"
import './src/startup/db'

const app:Express = express();

app.get("/ping",(req , res)=>{
    res.send("healthy")
})

const server:Server = app.listen(4000 , ()=>{
    console.log("Server running ...")
})
