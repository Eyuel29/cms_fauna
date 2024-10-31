import Joi from "joi";

export const blogSchema = Joi.object({
    "title" : Joi.string().trim().min(8).required().messages({
      'string.min': 'Title must be at least 8 characters long.',
      'any.required': 'Title is required.',
    }),
    "content" : Joi.string().trim().min(50).required().messages({
      'string.min': 'Content must be at least 50 characters long.',
      'any.required': 'Content is required.',
    }),
    "author" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Author name must be at least 5 characters long.',
      'any.required': 'Author is required.',
    }),
});

export const userSchema = Joi.object({
    "username" : Joi.string().trim().min(5).max(30).pattern(/^[a-zA-Z0-9_]{5,15}$/).required().messages({
      'string.min': 'Username must be at least 5 characters long.',
      'string.max': 'Username must not exceed 30 characters.',
      'string.pattern.base': 'Username can only contain letters, numbers, and underscores.',
      'any.required': 'Username is required.',
    }),
    "email" : Joi.string().trim().email().required().messages({
      'string.email': 'Email must be a valid email address.',
      'any.required': 'Email is required.',
    }),
    "password" : Joi.string().trim().min(8).max(30).pattern(/(?=.*[A-Z])/).pattern(/(?=.*\d)/).pattern(/(?=.*[@$!%*?&^#_])/).required().messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special character.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must not exceed 30 characters.',
      'any.required': 'Password is required.',
    }),
});

export const certificateSchema = Joi.object({
    "title" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Certificate title must be at least 5 characters long.',
      'any.required': 'Certificate title is required.',
    }),
    "issuer" : Joi.string().trim().min(3).required().messages({
      'string.min': 'Issuer name must be at least 3 characters long.',
      'any.required': 'Issuer is required.',
    }),
    "dateIssued" : Joi.date().required().messages({
      'date.base': 'Date Issued must be a valid date.',
      'any.required': 'Date Issued is required.',
    }),
    "description" : Joi.string().min(50).messages({
      'string.min': 'Description must be at least 50 characters long.',
    }),
    "url" : Joi.string().uri().messages({
      'string.uri': 'URL must be a valid URI.',
    }),
});

export const experienceSchema = Joi.object({
    "companyName" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Company name must be at least 5 characters long.',
      'any.required': 'Company name is required.',
    }),
    "role" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Role must be at least 5 characters long.',
      'any.required': 'Role is required.',
    }),
    "startDate" : Joi.date().required().messages({
      'date.base': 'Start Date must be a valid date.',
      'any.required': 'Start Date is required.',
    }),
    "endDate" : Joi.date().messages({
      'date.base': 'End Date must be a valid date.',
    }),
    "description" : Joi.string().trim().min(10).required().messages({
      'string.min': 'Description must be at least 10 characters long.',
      'any.required': 'Description is required.',
    }),
});

export const projectSchema = Joi.object({
    "name" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Project name must be at least 5 characters long.',
      'any.required': 'Project name is required.',
    }),
    "description" : Joi.string().trim().min(50).required().messages({
      'string.min': 'Description must be at least 50 characters long.',
      'any.required': 'Description is required.',
    }),
    "startDate" : Joi.date().required().messages({
      'date.base': 'Start Date must be a valid date.',
      'any.required': 'Start Date is required.',
    }),
    "endDate" : Joi.date().messages({
      'date.base': 'End Date must be a valid date.',
    }),
    "technologies" : Joi.string().trim().min(10).required().messages({
      'string.min': 'Technologies must be at least 10 characters long.',
      'any.required': 'Technologies is required.',
    }),
    "url" : Joi.string().trim().min(10).required().messages({
      'string.min': 'URL must be at least 10 characters long.',
      'any.required': 'URL is required.',
    }),
});

export const reviewSchema = Joi.object({
    "reviewerName" : Joi.string().trim().min(5).required().messages({
      'string.min': 'Reviewer name must be at least 5 characters long.',
      'any.required': 'Reviewer name is required.',
    }),
    "reviewerEmail" : Joi.string().trim().email().min(5).required().messages({
      'string.email': 'Reviewer email must be a valid email address.',
      'string.min': 'Reviewer email must be at least 5 characters long.',
      'any.required': 'Reviewer email is required.',
    }),
    "rating" : Joi.number().min(1).max(5).required().messages({
      'number.min': 'Rating must be at least 1.',
      'number.max': 'Rating must be at most 5.',
      'any.required': 'Rating is required.',
    }),
    "content" : Joi.string().min(5).required().messages({
      'string.min': 'Content must be at least 5 characters long.',
      'any.required': 'Content is required.',
    }),
});
