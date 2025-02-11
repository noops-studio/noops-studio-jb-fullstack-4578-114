import Joi from "joi";

export const newCommentValidator = Joi.object({
    postId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required(),
    body: Joi.string().min(1).required()
});
