import express , {Request , Response , NextFunction} from 'express';

const app = express();

app.use(express.json());



export default app;
