import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min().max().required(),
    email: Joi.string().email().min().max().required(),
    password: Joi.string.password().min().max().required(),
});