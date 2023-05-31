import { load } from 'cheerio';
import axios from 'axios';

//const cheerio = require('cheerio');
//const axios = require('axios');

const total_pages = [];
const album = []; //or no const
const song_links = [];
const song_album = [];
let names = [];
let links = [];
let genre = [];
let cover = [];
let artist = [];
let release = [];
let song_name = [];
let id = [];

//const getData = async url => 
export async function getData(url)
{
    console.log('this is the url:',url);
    let page = true;
    let counter = 1;
    while(page)
    {     
        let temp = url + String(counter); //https://kgasa.com/album/page/1
        try 
        {
            const response = await axios.get(temp);
            const data = response.data;
            const $ = load(data);

            if ($('.entry-title-link').length != 0)    //if title album data is not 0 extract data (albums exist in page)
            {
                total_pages.push(temp); //finding total pages of albums
                console.log(total_pages);
                counter++;

                let temp_names = ($('.entry-title-link').get().map(x => $(x).text())); //array of albums in page
                names = names.concat(temp_names); //pushing albums into final array

                let temp_links = $('.entry-image-link').get().map(x => $(x).attr('href')); //array of links in page
                links = links.concat(temp_links); //pushing links into final array
            }
            else //title album data is = 0 (therefore no albums in page)
            {
                page = false; //break while loop with false condition
            }
        }
        catch (error) 
        {
            //console.log(error);
            page = false;
        }
    }

    for (let i = 0; i < links.length; i++)
    {
        try
        {
            const response = await axios.get(links[i]);
            const data = response.data;
            const $ = load(data);
            let count = [];

            id.push(links.length - i);

            let temp = ($('.wp-block-table.is-style-stripes td').first().text()); //locating table with album info

            if (temp == 'Drama:' || temp == 'Webtoon:')
            {
                temp = "OST";
                genre.push(temp);
                
                release.push('N/A');
                artist.push('Various Artists');

                let temp_song_name = $('#genesis-content > article > div > figure:nth-child(11) > table > tbody > tr > td:nth-child(1) a:nth-child(1)').get().map(x => $(x).attr('href')); //REVISED//
                //song_name.push(temp_song_name);
                song_name = song_name.concat(temp_song_name);

                for (let x = 0; x < temp_song_name.length; x++)
                {
                    song_album.push(links[i]);
                }
            }
           
            else
            {
                let temp = "K-Pop";
                genre.push(temp);

                count.push(i); //saving location of albums to match their release date
                let temp_release = ($('.wp-block-table.is-style-stripes td').last().text());
                release.push(temp_release);

                //temp_artist = ($('.wp-block-table.is-style-stripes a').text());
                let temp_artist = ($('.wp-block-table.is-style-stripes tr:nth-child(1) td:nth-child(2)').text()); //add a after nth-child(2) if some artists are missing
                artist.push(temp_artist);

                //temp_song_name = ($('#genesis-content > article > div > figure:nth-child(8) a').get().map(x => $(x).text()));
                //temp_song_name = ($('.wp-block-table td:nth-child(2) a').get().map(x => $(x).text()));
                let html_table = ($('.wp-block-table').last().html());
                let e = load(html_table);

                //console.log($('.wp-block-table table').length);

                //write code here concept: if table 2 does not exist, run needed code; else do code from below
                if ($('.wp-block-table table').length == 1)
                {
                    let temp_song_name = $('.entry-content ol li a:nth-child(1)').get().map(x => $(x).attr('href')); //REVISED//
                    //song_name.push(temp_song_name);
                    song_name = song_name.concat(temp_song_name);

                    for (let x = 0; x < temp_song_name.length; x++)
                    {
                        song_album.push(links[i]);
                    }
                }
                else
                {
                    let temp_song_name = (e('td:nth-child(2) a:nth-child(1)').get().map(x => e(x).attr('href'))); //REVISED//
                    //song_name.push(temp_song_name);
                    song_name = song_name.concat(temp_song_name);

                    for (let x = 0; x < temp_song_name.length; x++)
                    {
                        song_album.push(links[i]);
                    }
                }
                //song_name.push(temp_song_name);
                //song_name = song_name.concat(temp_song_name);
            }

            let img = ($('.singular-image').attr('data-src'));
            cover.push(img);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    console.log(song_name.length);
    console.log(names.length);

    for (let i = 0; i < song_name.length; i++)
    {
        song_links.push(song_name[i]);
    }

    for (let i = 0; i < names.length; i++)
    {
        //tmp = tmp.concat(song_name[i]);
        //s.push(tmp);

        album.push({ID: id[i], Name: names[i], Album: links[i], Cover: cover[i], Genre: genre[i], Artist: artist[i], Release: release[i] });
        
        //album.push({Album: names[i], Link: links[i], Cover: cover[i], Genre: genre[i], Artist: artist[i], Release: release[i], Songs: [{Name: s }] });
        //album.push({Album: names[i], Link: links[i], Cover: cover[i], Genre: genre[i], Artist: artist[i], Release: release[i], Songs: { Name: song_name[i]}});
    }
    console.log('Albums Complete');
    //return album;
    //return { array1: album, array2: song_links, array3: song_album }
}
export { album }
export { song_links, song_album };
//module.exports = { getData };
//module.exports = { getData, song_links, album, song_album };

