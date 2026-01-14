/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Types
import type { Request, Response } from 'express';

// Custom module
import Logger from '@/lib/Winston.lib';
import { GenerateAccessToken, GenerateRefreshToken } from '@/lib/JsonWebToken';
import Env from '@/configs/Env.config';

// Utils
import { genUsername } from '@/utils';

// Model
import UserModel from '@/model/UserModel';
import TokenModel from '@/model/TokenModel';

// Types
import type { UserRegister } from '@/types/auth/UserType';



const Register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body as UserRegister;
  if(role == 'admin' && !Env.WHITELISTED_ADMIN_MAIL.includes('email')){
    res.status(403).json({
        code: 'AuthorizationError',
        message: "You can't register has an admin"
    })
    Logger.warn(
        `User ${email} is not register with role admin. Because this email not in white list admin`
    )
    return
  }
  try {
    const username = genUsername();
    const newUser = await UserModel.create({ email, password, role, username });

    // Generate Accesstoken and refresh token
    const accessToken = GenerateAccessToken(newUser._id);
    const refreshToken = GenerateRefreshToken(newUser._id);

    // Store Refresh token in database
    await TokenModel.create({token: refreshToken, userId: newUser._id})
    Logger.info("Refresh token created for user:",{
        userId: newUser._id,
        refreshToken: refreshToken
    })

    // Save Token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: Env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Create account success',
      data: {
        name: newUser.username,
        email: newUser.email,
      },
      accessToken,
    });
    Logger.info('Create new user success:', {
      email: newUser.email,
      name: newUser.username,
      role: newUser.role,
    });
  } catch (error: any) { 
    Logger.error('Register controller failed:', { 
        message: error.message, stack: error.stack, 
        name: error.name, 
    })
    res.status(500).json({ 
        success: false, 
        message: 'Đăng ký thất bại, vui lòng thử lại sau'
    })
  }
};

export default Register;
