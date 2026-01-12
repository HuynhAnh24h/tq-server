/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import {Schema, model} from "mongoose"

// Types
import type { IToken } from "@/@types/auth/TokenType"

const TokenSchema = new Schema<IToken>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        required: true
    }
})


const TokenModel = model("Token", TokenSchema)
export default TokenModel