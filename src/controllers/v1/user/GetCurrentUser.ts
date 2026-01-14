/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module

// Custom Module

// Model

// Middleware

// Types
import Logger from '@/lib/Winston.lib';
import UserModel from '@/model/UserModel';
import type { Request, Response } from 'express';

const GetCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select('-__v').lean().exec();

    return res.status(200).json({
      success: true,
      message: 'Get Current user is work',
      data: user,
    });
  } catch (error) {
    Logger.error('Controller Update User Error: ', error);
    return res.status(500).json({
      code: 'ServerError',
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default GetCurrentUser;
