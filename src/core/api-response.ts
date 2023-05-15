import { Response } from 'express';
import {StatusCodes} from 'http-status-codes'

abstract class ApiResponse {
    constructor(protected statusCode : StatusCodes , protected message:string){}
}

type Success<T> ={
    success : boolean,
    message : string;
    status : StatusCodes,
    data : T
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(status : StatusCodes , message : string , private data:T){
        super(status , message);
    }

    send(res:Response):Response{
        let response : Success<T> = {
            success : true,
            message : this.message,
            status : this.statusCode,
            data : this.data
        }
        return res.status(this.statusCode).send(response);
    }
}


type Fail ={
    success : boolean,
    message : string;
    status : StatusCodes,
    userMessage? : string
}

export class FailResponse extends ApiResponse {
    constructor(status : StatusCodes , message : string , private userMessage:string | null){
        super(status , message);
    }

    send(res:Response):Response{
        let response : Fail = {
            success : false,
            message : this.message,
            status : this.statusCode
        }
        this.userMessage ? response.userMessage = this.userMessage : null 
        return res.status(this.statusCode).send(response);
    }
}