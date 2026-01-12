/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
import { body, cookie } from 'express-validator';
import bcrypt from "bcrypt"

// Model 
import UserModel from '@/model/UserModel';

import type { UserLogin } from '@/@types/auth/UserType';

export const RegisterValidateSchema = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async(value)=>{
        const exsitsUser = await UserModel.exists({emial: value})
        if(exsitsUser){
            throw new Error('User email or password is in valid')
        }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role musbe a string')
    .isIn(['admin','manager','user'])
    .withMessage('Role must be either admin, user, manager')
];

export const LoginValidateSchema = [
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters')
    .custom(async(value,{req})=>{
        const {email} = req.body as UserLogin
        const user =await UserModel.findOne({email}).select('password').exec()
        if(!user){
            throw new Error('User email or password is invalid')
        }
        const passwordMatch = await user.comparePassword(value)
        if(!passwordMatch){
            throw new Error('Password is not match')
        }
    }),
]

export const RefreshTokenValidateSchema = [
    cookie('refreshToken')
        .notEmpty()
        .withMessage('Refresh token required')
        .isJWT()
        .withMessage('Invalid refresh token')
]
