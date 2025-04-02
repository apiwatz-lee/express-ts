import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRoute from './routes/user.route';

const app: Express = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Aphiwat leelasawatsuk',
  });
});

export default app;

if (require.main === module) {
  app.listen(port, () => console.log(`Application is running on port ${port}`));
}
