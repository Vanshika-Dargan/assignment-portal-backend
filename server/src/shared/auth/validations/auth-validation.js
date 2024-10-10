import Joi from 'joi';

export const authSchema = Joi.object({
    password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*+,-./:;<=>?@\^_|~])[A-Za-z\d!#$%&*+,-./:;<=>?@\^_|~]{8,}$/)
    .messages({
      'any.required': 'Password is required.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base': 'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
});

export const registerSchema = authSchema.keys({
    name: Joi.string().required().messages({
        'any.required': 'Name is required.',
        'string.base': 'Name must be a string.',
      }),
      role: Joi.string()
      .valid('admin', 'user')
      .required()
      .messages({
        'any.only': 'Role must be either "admin" or "user".',
        'any.required': 'Role is required.',
      }),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.required': 'Confirm Password is required.',
      'any.only': 'Confirm Password must match Password.',
    }),
})


export const loginSchema = authSchema;

export const loginWithGoogleSchema = Joi.object({
    role: Joi.string()
      .valid('admin', 'user')
      .required()
      .messages({
        'any.only': 'Role must be either "admin" or "user".',
        'any.required': 'Role is required.',
      }),
    type: Joi.string()
    .valid('google', 'custom')
    .required()
    .messages({
      'any.only': 'Type could either be google or custom ".',
      'any.required': 'Type is required.',
    }),
})