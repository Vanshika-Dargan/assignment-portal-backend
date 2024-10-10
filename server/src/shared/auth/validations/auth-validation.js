import Joi from 'joi';

export const authSchema = Joi.object({
  name: Joi.string().required().messages({
      'any.required': 'Name is required.',
      'string.base': 'Name must be a string.',
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*+,-./:;<=>?@\^_|~])[A-Za-z\d!#$%&*+,-./:;<=>?@\^_|~]{8,}$/)
    .messages({
      'any.required': 'Password is required.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base': 'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    })
});


