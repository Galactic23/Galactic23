const cheerio = require('cheerio');
const axios = require('axios');
const a = require('./albums');

const songs = [];
//info = [];
s_links = [];
s_name = [];
s_album = [];
s_genre = [];
s_label = [];
s_release = [];
s_language = [];

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

            temp_info = $('.wp-block-table td:nth-child(2)').get().map(x => $(x).text());
            info = info.concat(temp_info);
            
            s_album.push(info[0]);
            s_genre.push(info[1]);
            s_label.push(info[2]);
            s_release.push(info[3]);
            s_language.push(nfo[4]);
            
            info = [];
        }
        catch (error)
        {
            console.log(error);
        }
    }



    for (let i = 0; i < a.song_links.length; i++)
    {
        songs.push({ Name: s_name[i], Links: s_links[i], Album: s_album[i], Genre: s_genre[i], Label: s_label[i], Release: s_release[i], Language: s_language[i] })
    }
    console.log('Songs Complete')
}

module.exports = { getData1, songs};