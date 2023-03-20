const cheerio = require('cheerio');
const axios = require('axios');
const a = require('./albums');

const songs = [];
s_links = [];
s_name = [];

async function getData1()
{
    await a.getData(url);
    s_links = a.song_links;

    for (let i = 0; i < a.song_links.length; i++)
    {
        try
        {
            const response = await axios.get(s_links[i]);
            const data = response.data;
            const $ = cheerio.load(data);

            temp = ($('.entry-content h2').first().text()); //locating table with album info
            temp = temp.replace(" Lyrics", "");

            s_name.push(temp);
        }
        catch (error)
        {
            console.log(error);
        }
    }



    for (let i = 0; i < a.song_links.length; i++)
    {
        songs.push({ Name: s_name[i], Links: s_links[i] })
    }
    console.log('Songs Complete')
}

module.exports = { getData1, songs};