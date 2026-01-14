/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import bcrypt from "bcrypt"
// Custom Module
import Logger from '@/lib/Winston.lib'

// Model
import UserModel from '@/model/UserModel'

// Types
import { IUser } from '@/types/auth/UserType'
import type { Request, Response } from 'express'

const UpdateCurrentUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as IUser
    const userId = req.userId

    if (data.password) { 
        const salt = await bcrypt.genSalt(10) 
        data.password = await bcrypt.hash(data.password, salt) 
    }

    const updateUser = await UserModel.findByIdAndUpdate(userId, data, {new: true,}).select('-__v').lean().exec()

    if (!updateUser) {
      return res.status(400).json({
        success: false,
        message: 'Update user false',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Update User Success',
      data: updateUser,
    });
  } catch (error) {
    Logger.error('Controller Update User Error: ', error);
    return res
      .status(500)
      .json({
        code: 'ServerError',
        message: 'Server error',
        error: error instanceof Error ? error.message : String(error),
      });
  }
};

export default UpdateCurrentUser
