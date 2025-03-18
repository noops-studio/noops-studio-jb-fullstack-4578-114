import Joi from "joi";

export const newPostValidator = Joi.object({
  title: Joi.string().min(10).required(),
  body: Joi.string().min(20).allow("").required(),
});

export const newPostFileValidator = Joi.object({
  postImage: Joi.object({
    mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg"),
  })
    .unknown(true)
    .optional(),
});

export const editPostValidator = newPostValidator;
