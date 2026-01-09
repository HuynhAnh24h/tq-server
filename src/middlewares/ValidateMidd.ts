/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import Logger from "@/lib/Winston.lib"

type ValidateTarget = "body" | "query" | "params"

const Validate = (schema: ZodSchema<any>, target: ValidateTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target])
      next()
    } catch (error: any) {
      Logger.error("Invalid data type error:", error)
      return res.status(400).json({
        success: false,
        message: "Invalid data: wrong data types",
        errors: error.errors || error,
      })
    }
  }

export default Validate
