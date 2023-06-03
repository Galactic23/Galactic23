import express from 'express';
import { getData1 } from './songs.js';
import { album } from './albums.js';
import { songs } from './songs.js';
//import supabase from '../Client/APIs/supabaseClient.js'

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