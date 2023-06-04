import express from 'express';
import { getData1, songs } from './songs.js';
import { album } from './albums.js';

const app = express();
const PORT = 8080;

let url = "https://kgasa.com/album/page/";
let songs_arr = [];
let album_arr = [];

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
}) 

getData1(url);
album_arr = album;
songs_arr = songs;

app.get('/album', (req, res) => 
{
    res.json(album);
});

app.get('/songs', (req, res) => 
{
    res.json(songs)
})

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
);
export { album_arr, songs_arr };