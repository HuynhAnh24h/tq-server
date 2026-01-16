/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
import { body, cookie, param, query } from 'express-validator';

// Model
import UserModel from '@/model/UserModel';

import type { UserLogin } from '@/types/auth/UserType';

export const RegisterValidateSchema = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const exsitsUser = await UserModel.exists({ emial: value });
      if (exsitsUser) {
        throw new Error('User email or password is in valid');
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
    .isIn(['admin', 'manager', 'user'])
    .withMessage('Role must be either admin, user, manager'),
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
    .custom(async (value, { req }) => {
      const { email } = req.body as UserLogin;
      const user = await UserModel.findOne({ email }).select('password').exec();
      if (!user) {
        throw new Error('User email or password is invalid');
      }
      const passwordMatch = await user.comparePassword(value);
      if (!passwordMatch) {
        throw new Error('Password is not match');
      }
    }),
];

export const RefreshTokenValidateSchema = [
  cookie('refreshToken')
    .notEmpty()
    .withMessage('Refresh token required')
    .isJWT()
    .withMessage('Invalid refresh token'),
];

export const UpdateUserValidateSchema = [
  body('username')
    .optional()
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'content', 'user'])
    .withMessage('Invalid role'),
  body('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string'),
  body('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string'),
  body('phone')
    .optional()
    .isMobilePhone('vi-VN')
    .withMessage('Invalid Vietnamese phone number'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('socialLinks.facebook')
    .optional()
    .isURL()
    .withMessage('Facebook link must be a valid URL'),
  body('socialLinks.instagram')
    .optional()
    .isURL()
    .withMessage('Instagram link must be a valid URL'),
  body('socialLinks.twitter')
    .optional()
    .isURL()
    .withMessage('Twitter link must be a valid URL'),
  body('socialLinks.tiktok')
    .optional()
    .isURL()
    .withMessage('Tiktok link must be a valid URL'),
];

export const GetAllUserValidateSchema = [
  query('limit')
    .optional()
    .isInt({min:1, max: 50})
    .withMessage('Limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({min:0})
    .withMessage("Offset must be a positive integer")
]

export const GetOneUserIdValidateSchema = [
  param('userId')
    .notEmpty()
    .isMongoId()
    .withMessage('Invalid user Id')
]