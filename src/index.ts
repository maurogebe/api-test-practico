import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './interfaces/routes/routes';
import logger from './app/config/logger';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());
app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const { method, url } = req;
    const { statusCode } = res;
    const headers = res.getHeaders();

    logger.info(`Outgoing Response - Method: ${method}, URL: ${url}, Status Code: ${statusCode}, Headers: ${JSON.stringify(headers)}`);
  });
  next();
});

routes(app);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
