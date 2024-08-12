import Joi from "joi";


export  const  registerValidation = Joi.object().keys({
  firstName: Joi.string().required('first name  is required'),
  lastName: Joi.string().required('last name is required'),
  email: Joi.string().email().required('Email is required'),
  phoneNumber: Joi.string() .required('Phone number is required'),
  password: Joi.string().min(8).required('Password is required'),
  messageSubscribed: Joi.boolean(),
  role: Joi.string(),
  username: Joi.string().required('Username is required'),
 
});

export const changePasswordValidation = Joi.object().keys({
    oldPassword: Joi.string().min(8).required('Password is required'),
    newPassword: Joi.string().min(8).required('Confirm password is required'),
});


export const loginValidation = Joi.object().keys({
    username: Joi.string().required(
    'Username  is required'
  ),
  password: Joi.string().required('Password is required'),
});


export const updateUserValidation = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  
  phoneNumber: Joi.string(),
});
