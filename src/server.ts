import express from 'express';
import cors from 'cors';
import routes from './routes/api/index/index.router';

const app = express();
const port = 3000;

app.use(
    cors(),
    express.json(),
    express.urlencoded({
      extended: true
    }),
);

app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server is working on post ${port}`);
});

export default app;
