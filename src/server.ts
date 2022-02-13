import express from 'express';
import cors from 'cors';
import routes from './routes/api/index/index.router';


const app = express();
const port = 3000;

// const cors_options = {
//     origin: 'localhost',
//     optionsSuccessStatus: 200
// };
// app.use(cors(cors_options));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is working on post ${port}`);
});

export default app;
