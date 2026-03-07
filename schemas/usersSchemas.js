import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required().messages({
    "any.required": "Subscription is required",
    "any.only": "Subscription must be one of [starter, pro, business]",
  }),
});
