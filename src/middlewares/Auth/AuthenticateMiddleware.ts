/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { VerifyAccessToken } from '@/lib/JsonWebToken';
import Logger from '@/lib/Winston.lib';
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';
const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({
        code: 'AuthenticationError',
        message: 'Access denied, no access token provided',
      });
  }
  const [, token] = authHeader.split(' ');
  try {
    const jwtPayload = VerifyAccessToken(token) as {
      userId: Types.ObjectId;
      role: string;
    };
    req.userId = jwtPayload.userId;
    req.role = jwtPayload.role;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({
          code: 'AuthenticationError',
          message: 'Access token expired, request a new one with refresh token',
        });
    }
    if (error instanceof JsonWebTokenError) {
      return res
        .status(401)
        .json({ code: 'AuthenticationError', message: 'Access token invalid' });
    }
    Logger.error('Error during authentication', error);
    return res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error', error });
  }
};
export default Authenticate;
