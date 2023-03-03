const app = require('express')();
const PORT = 8080;
const a = require('./albums');
const s = require('./songs')

url = "https://kgasa.com/album/page/";
//const album = [];

app.get('/', (req, res) => {
    res.json('Welcome to Korean Lyric API')
}) 

a.getData(url).then(data => album = data); //album extraction
s.getData1();
   
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