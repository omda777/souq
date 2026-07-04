import express , {Request , Response , NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';

import appError from './utils/appError.js';
import httpStatus from './types/httpStatus.js';

// routes
import authRoutes from './modules/auth/auth.routes.js';
import categoriesRoutes from './modules/Categories/Categories.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories' , categoriesRoutes)

// 404 Not Found 
app.use('/{*splat}', (req: Request, res: Response, next: NextFunction) => {
  const error = new appError(404 ,`Not Found - ${req.originalUrl}` ,httpStatus.NOT_FOUND);
  next(error);
});

// Error Handling 
app.use((err: appError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({ status: err.statusText || httpStatus.ERROR, message: err.message , data : null});
});

export default app;
