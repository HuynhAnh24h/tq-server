/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node module
import { Router } from 'express'

// Controller
import GetCurrentUser from '@/controllers/v1/user/GetCurrentUser'
import UpdateCurrentUser from '@/controllers/v1/user/UpdateCurrentUser'

// Middleware
import Authenticate from '@/middlewares/Auth/AuthenticateMiddleware'
import Authorize from '@/middlewares/Auth/AuthorizeMiddleware'
import ValidationError from '@/middlewares/ValidateMiddleware'

// Error Schema Validation
import { UpdateUserValidateSchema } from '@/validator/UserValidator'

const UserRouters = Router();

// User
UserRouters.get(
  '/current',
  Authenticate,
  Authorize(['admin', 'manager', 'content', 'user']),
  GetCurrentUser,
);

UserRouters.put(
  '/update',
  UpdateUserValidateSchema,
  ValidationError,
  Authenticate,
  Authorize(['admin', 'manager', 'content', 'user']),
  UpdateCurrentUser,
);

export default UserRouters;
