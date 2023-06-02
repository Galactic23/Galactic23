import express from 'express';
import { getData1 } from './songs.js';
import { album } from './albums.js';
import { songs } from './songs.js';
//import supabase from '../Client/APIs/supabaseClient.js'

const app = express();
const PORT = 8080;
//const a = require('./albums');
//const s = require('./songs');



let url = "https://kgasa.com/album/page/";
let songs_arr = [];
let album_arr = [];

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
}) 

//a.getData(url).then(data => album = data.array1); //album extraction
//a.getData(url).then(data => album = data.array1);
//s.getData1();
getData1(url);
album_arr = album;
songs_arr = songs;

//album_arr = a.album;
//songs_arr = s.songs;
//songs = s.getData1();

//console.log(songs)
/* 
app.post('/album', async (req, res) => {
    const album_arr = req.body
    for (const data of album_arr){
        const {ID, Name, Album, Cover, Genre, Artist, Release} = data

        const { error } = await supabase
        .from('Albums')
        .insert({ID, Name, Album, Cover, Genre, Artist, Release})

        if (error) {
            console.error(error)
            res.status(500).send('Internal server error')
            return
        }
    }
    res.send('Data inserted successfully')
}) */


app.get('/album', (req, res) => 
{
    res.json(album_arr)
})

app.get('/songs', (req, res) => 
{
    res.json(songs_arr)
})

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
)