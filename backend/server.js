import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import { connectMongoose } from './util/connectMongoose.js';
import recipeRouter from './routes/recipeRoutes.js';
import userRouter from './routes/userRouter.js';


const app = express();
app.use(express.json());
app.use(cors({
  origin:['http://localhost:4000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(cookieParser(
));
const PORT = process.env.PORT || 3000;

app.use(recipeRouter)
app.use(userRouter)
app.use('/', express.static('./frontend'));
app.get('/*', (req, res) => res.sendFile('/frontend/index.html', { root: process.env.PWD }));

if (await connectMongoose()) {
  app.listen(PORT, () => {
    console.log(`Verbunden an Port ${PORT}`);
  });
} else {
  console.error('Verbindung zu mongodb nicht möglich.');
}