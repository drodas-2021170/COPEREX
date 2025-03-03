import { body } from "express-validator"
import { validateErrors } from "./validate.error.js"

export const loginValidator=[
    body('userData', 'Please introduce your information').notEmpty(),
    body('password', 'Please introduce your password').notEmpty(),
    validateErrors
]

export const addCetegoryValidator =[
    body('name', 'Name cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    validateErrors
]

export const addCompanyValidator =[
    body('name', 'Name cannot be empty').notEmpty(),
    body('impactLevel', 'impact level cannot be empty').notEmpty(),
    body('trayectoryYears', 'Trayerctory years cannot be empty').notEmpty().isNumeric().withMessage('You can only introduce a number'),
    body('businessPhone', 'Business phone cannot be empty').notEmpty().isMobilePhone().withMessage('You can only introduce a valid telefonic number'),
    body('businessEmail', 'business email cannot be empty').notEmpty().isEmail().withMessage('You can only introduce a valid email'),
    body('category','Category cannot be empty').notEmpty(),
    validateErrors
]

export const getCategoryValidator =[
    body('category', 'Please introduce de ID category').notEmpty(),
    validateErrors
]

export const getOrderValidator =[
    body('Order', 'Please introduce a option').notEmpty(),
    validateErrors
]

export const getTrayectoryValidator =[
    body('trayectoryYears', 'Trayectory Years cannot be empty').notEmpty().isNumeric().withMessage('You can only introduce a number'),
    validateErrors
]