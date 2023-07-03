import express from 'express';
import albumRouter from './routes/album-route.js';
import songRouter from './routes/song-route.js';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
});

app.use(cors());
app.use(express.json());

app.use('/api', albumRouter);

app.use('/api', songRouter);

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
);