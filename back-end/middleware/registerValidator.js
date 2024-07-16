const { body } = require('express-validator');
const employee = require("../model/user.js");
const registerValidator = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    body('email').custom(async (value) => {
        const existingUser = await employee.findOne({ email: value });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        return true;
    }),

];


module.exports = registerValidator;


