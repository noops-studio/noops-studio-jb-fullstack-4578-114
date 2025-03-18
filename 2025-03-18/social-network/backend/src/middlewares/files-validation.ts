import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

 export default function fileValidator(validator:ObjectSchema) {
return  async function (req: Request, res: Response, next: NextFunction)  {
        try {
            await validator.validateAsync(req.files);
            next();
        } catch (error) {
            next({
                status: 422,
                message: error.message
            })
            
        }
}
}