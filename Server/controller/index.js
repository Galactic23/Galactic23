import express from 'express';
import { getData1, songs } from './songs.js';
import { album } from './albums.js';
import albumRouter from '../routes/album-route.js';
import songRouter from '../routes/song-route.js';

const app = express();
const PORT = 8080;

let url = "https://kgasa.com/album/page/";
let songs_arr = [];
let album_arr = [];

getData1(url);
album_arr = album;
songs_arr = songs;

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
});

app.use('/api', albumRouter);

app.use('/api', songRouter);

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
);

//app.get('/album', (req, res) => 
//{
//    res.json(album);
//});

//app.get('/songs', (req, res) => 
//{
//   res.json(songs)
//})

export { album_arr, songs_arr };