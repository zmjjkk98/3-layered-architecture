import express from 'express';
import { apiRouter } from './routers/index.js';
import 'dotenv/config';
import errorHandlerMiddleware from './middleware/error-handler.middleware.js';

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요 !');
});
