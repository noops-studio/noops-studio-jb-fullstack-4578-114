import { NextFunction, Request, Response } from "express";
import AppError from "./app-error";

export default function errorResponder(err:Error , req : Request , res : Response, next : NextFunction){
    if (err instanceof AppError){
        return res.status(err.status).send(err.message)
    }else{
        res.status(500).send(err.message)
    }
}