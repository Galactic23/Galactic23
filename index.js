const app = require('express')();
const PORT = 8080;
const a = require('./albums');
const s = require('./songs');

url = "https://kgasa.com/album/page/";
songs = [];
album = [];

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
}) 

//a.getData(url).then(data => album = data.array1); //album extraction
//a.getData(url).then(data => album = data.array1);
s.getData1();
album = a.album;
songs = s.songs;
//songs = s.getData1();

//console.log(songs)

   
app.get('/album', (req, res) => 
{
    res.json(album)
})

app.get('/songs', (req, res) => 
{
    res.json(songs)
})

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
)