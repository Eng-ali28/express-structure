import { NextFunction, Request, Response } from "express";
import ApiError from "../core/api-error";
import { FailResponse } from "../core/api-response";
import {StatusCodes} from 'http-status-codes'

export default function(err:Error , req:Request , res : Response , next:NextFunction){
    if(err instanceof ApiError){
        return new FailResponse(err.httpStatus , err.message , err.userMessage).send(res);
    }

    return new FailResponse(StatusCodes.INTERNAL_SERVER_ERROR , err.message , null ).send(res)
    
}