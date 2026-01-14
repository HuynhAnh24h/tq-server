/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import type { Request, Response } from "express"

// Type
import { UserLogin } from "@/types/auth/UserType"

// Model
import UserModel from "@/model/UserModel"
import TokenModel from "@/model/TokenModel"

// Custom module
import { GenerateAccessToken, GenerateRefreshToken } from "@/lib/JsonWebToken"
import Logger from "@/lib/Winston.lib"
import Env from "@/configs/Env.config"

const Login = async (req: Request, res: Response) => {
  const { email } = req.body as UserLogin;
  try {
    const user = await UserModel.findOne({email}).select('username email password role').lean().exec()
    if(!user){
      return res.status(404).json({
        code: 'NotFound',
        messge: "User not found"
      })
    }

    // Generate Token
    const accessToken = await GenerateAccessToken(user._id)
    const refreshToken = await GenerateRefreshToken(user._id)

    // Store RefreshToken in DB
    await TokenModel.create({token: refreshToken, userId: user._id})
    Logger.info("Login Refresh token created for user",{
      userId: user._id,
      token: refreshToken
    })
    
    res.cookie('refreshToken', refreshToken,{
      httpOnly: true,
      secure: Env.NODE_ENV == 'production',
      sameSite: 'strict'
    })

    return res.status(200).json({
      success: true,
      message: "Login success",
      data: user,
      accessToken: accessToken,
      refreshToken: refreshToken
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in login Controller',
      error: error,
    });
  }
};
export default Login;
