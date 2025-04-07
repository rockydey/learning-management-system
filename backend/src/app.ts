import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Academix server is running!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Error
app.use(notFound);

export default app;
