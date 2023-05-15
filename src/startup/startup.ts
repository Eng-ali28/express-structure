import config from 'config'
import cors from 'cors'
import morgan from 'morgan';
import express, {Express, NextFunction, Request, Response} from "express"
import { join } from 'path'

export default function(app:Express){
    const corsOptions = {
        origin: '*',
        methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE" , "OPTIONS"],
        allowedHeaders : ["Content-Type" , "x-auth-token" , "Authorization"],
        Credentials:true
    }

    app.use(cors(corsOptions));

    app.use(express.json({limit:"10mb"}));
    app.use(express.urlencoded({extended:true , limit:"10mb"}));
    app.use(express.static(join(__dirname , "../public")));
    app.use("/uploads" , express.static("uploads"))
    app.use(morgan('dev'))

    app.use(function(req:Request , res:Response, next : NextFunction){
        const aYear = 60 * 60 * 24 * 365;

        res.set("Strict-Transport-Security" , "max-age=" + aYear + ";uncludeSubdomains");
        next()
    });

    app.get('/ping' , (req:Request , res : Response)=>{
        return res.send("Healthy check")
    })
}