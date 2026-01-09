/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import winston from "winston"
import chalk from "chalk"

// Custom module
import Env from "@/configs/Env.config"

const { combine, timestamp, errors, printf } = winston.format

// Format console với Chalk
const consoleFormat = printf(({ timestamp, level, message, ...meta }) => {
  let levelColor: (msg: string) => string

  switch (level) {
    case "error":
      levelColor = chalk.red.bold
      break
    case "warn":
      levelColor = chalk.yellow.bold
      break
    case "info":
      levelColor = chalk.cyan.bold
      break
    case "debug":
      levelColor = chalk.magenta.bold
      break
    default:
      levelColor = chalk.white
  }

  const metaStr = Object.keys(meta).length
    ? "\n" + chalk.gray(JSON.stringify(meta, null, 2))
    : ""

  return `${chalk.gray(timestamp)} ${levelColor(level.toUpperCase())} ${chalk.white(message)}${metaStr}`
})

// Transport cho console (dev)
const consoleTransport = new winston.transports.Console({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    consoleFormat
  ),
})

// Transport cho file (prod)
const fileTransport = new winston.transports.File({
  filename: "logs/app.log",
  maxsize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5,
  format: combine(timestamp(), errors({ stack: true }), winston.format.json()),
})

// Tạo logger chính
const Logger = winston.createLogger({
  level: Env.LOG_LEVEL || "info",
  transports: Env.NODE_ENV === "production" ? [fileTransport] : [consoleTransport],
  silent: Env.NODE_ENV === "test",
})

export default Logger
