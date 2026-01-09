/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node modules
import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

// Custonm modules
import Env from '@/configs/Env.config';
import Limiter from '@/lib/ExpressRateLimit'
import Logger from '@/lib/Winston.lib';

// Router
import v1Router from '@/routes/index';
import { Database, DisconnectDB} from '@/configs/DB.config';

// Express Init App

const app = express();

// Setting Cors Middleware
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      Env.NODE_ENV === 'development' ||
      !origin || Env.WHITELISTED_DOMAINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
    Logger.warn(`CORS error: ${origin} is not allowed by CORS`)
  },
  credentials: Env.CORS_CREDENTIALS === 'true',
  methods: Env.CORS_METHODS?.split(',') || ['GET', 'POST'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024, // Compress responses only if they are larger than 1KB
  }),
);
app.use(helmet());

// Rate Limit
app.use(Limiter);

// Sample Route
(async () => {
  try {
    await Database();
    app.use('/api/v1', v1Router);

    // Start Server
    app.listen(Env.PORT, () => {
      Logger.info(`Server is running on port http://localhost:${Env.PORT}`);
    });

  } catch (error) {

    Logger.error('Error during server initialization:', error);

    if(Env.NODE_ENV === 'production') {
      Logger.error('Server failed to start in production mode.');
      process.exit(1);
    }   
  }
})();


/**
 * Handle Server shutdown gracefully
 */
const HandleShutdown = async() => {
    try{
        await DisconnectDB();
        
        Logger.warn("Server SHUTDOWN")
        process.exit(0);
    }catch(err){
        Logger.error('Error during server shutdown:', err);
    }
}

process.on('SIGINT', HandleShutdown);
process.on('SIGTERM', HandleShutdown);