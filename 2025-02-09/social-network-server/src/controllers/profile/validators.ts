import Joi from "joi";
import { title } from "process";

export const newPostValidator = Joi.object({
    title: Joi.string().required().min(10).max(40),
    body: Joi.string().required().min(10)
});