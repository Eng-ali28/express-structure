import { Express } from "express";
import error from "../middleware/error";


export default function(app:Express){
    app.use(error)
}