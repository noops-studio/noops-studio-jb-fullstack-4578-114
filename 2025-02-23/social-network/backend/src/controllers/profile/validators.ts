import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).required(),
    body: Joi.string().min(20).allow('').required(),  // Allow empty strings
});


export const editPostValidator = newPostValidator;
