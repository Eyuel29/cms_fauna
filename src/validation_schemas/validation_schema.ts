import Joi from "joi";

export const blogSchema = Joi.object({
    "title" : Joi.string().trim().min(8).required(),
    "content" : Joi.string().trim().min(50).required(),
    "author" : Joi.string().trim().min(5).required(),
});

export const certificateSchema = Joi.object({
    "title" : Joi.string().trim().min(5).required(),
    "issuer" : Joi.string().trim().min(3).required(),
    "dateIssued" : Joi.date().required(),
    "description" : Joi.string().min(50),
    "url" : Joi.string().uri(),
});

export const experienceSchema = Joi.object({
    "companyName" : Joi.string().trim().min(5).required(),
    "role" : Joi.string().trim().min(5).required(),
    "startDate" : Joi.date().required(),
    "endDate" : Joi.date(),
    "description" : Joi.string().trim().min(10).required(),
});

export const projectSchema = Joi.object({
    "name" : Joi.string().trim().min(5).required(),
    "description" : Joi.string().trim().min(50).required(),
    "startDate" : Joi.date().required(),
    "endDate" : Joi.date(),
    "technologies" : Joi.string().trim().min(10).required(),
    "url" : Joi.string().trim().min(10).required(),
});

export const reviewSchema = Joi.object({
    "name" : Joi.string().trim().min(5).required(),
    "description" : Joi.string().trim().min(50).required(),
    "startDate" : Joi.date().required(),
    "endDate" : Joi.date(),
    "technologies" : Joi.string().trim().min(10).required(),
    "url" : Joi.string().trim().min(10).required(),
});


export const reviewSchema = Joi.object({
    "reviewerName" : Joi.string().trim().min(5).required(),
    "reviewerEmail" : Joi.string().trim().email().min(5).required(),
    "rating" : Joi.number().min(1).max(5).required(),
    "content" : Joi.string().min(5).required(),
});