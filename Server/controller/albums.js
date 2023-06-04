import { load } from 'cheerio';
import axios from 'axios';
import config from './https-cfg.js';
import { insertAlbumsIntoTable } from '../supabase.js';

const total_pages = [];
const album = [];
const song_links = [];
const song_album = [];
const album_id = [];
let a_names = [];
let a_links = [];
let a_genre = [];
let a_cover = [];
let a_artists = [];
let a_release = [];
const a_id = [];
let songs = [];

export async function getData(url)
{
    let page = true;
    let counter = 1;
    while(page)
    {     
        let temp = url + String(counter); //https://kgasa.com/album/page/1
        try 
        {
            const response = await axios.get(temp, config);
            const data = response.data;
            const $ = load(data);

            if ($('.entry-title-link').length != 0)    //if title album data is not 0 extract data (albums exist in page)
            {
                total_pages.push(temp); //finding total pages of albums
                console.log(total_pages);
                counter++;

                let temp_names = ($('.entry-title-link').get().map(x => $(x).text())); //array of albums in page
                a_names = a_names.concat(temp_names); //pushing albums into final array

                let temp_links = $('.entry-image-link').get().map(x => $(x).attr('href')); //array of a_links in page
                a_links = a_links.concat(temp_links); //pushing a_links into final array
            }
            else //title album data is = 0 (therefore no albums in page)
            {
                page = false; //break while loop with false condition
            }
        }
        catch (error) 
        {
            page = false;
        }
    }

    for (let i = 0; i < a_links.length; i++)
    {
        try
        {
            const response = await axios.get(a_links[i], config);
            const data = response.data;
            const $ = load(data);
            let count = [];

            a_id.push(a_links.length - i); //1273

            let temp = $('.entry-title').first().text();
            let table_info = $('.wp-block-table').first().find('td:nth-child(2)').get().map(x => $(x).text());
            let total_tables = $('.wp-block-table table').length;
    
            if (temp.includes('OST') || temp.includes('Soundtrack'))
            {
                a_genre.push('OST');
                a_artists.push('Various Artists');
                a_release.push('N/A');

                //gets all songs from the table
                let song_table = $('.wp-block-table').last().find('td:nth-child(1) a').get().map(x => $(x).attr('href'));
                
                for (let x = 0; x < song_table.length; x++)
                {
                    songs.push(song_table[x])
                    song_album.push(a_links[i]);
                    album_id.push(a_id[i]);
                }
            }
            else if (total_tables == 2)
            {
                a_genre.push(table_info[3]);
                a_artists.push(table_info[0]);
                a_release.push(table_info[4]);

                let song_table = $('.wp-block-table').last().find('a:nth-child(1)').get().map(x => $(x).attr('href'));

                for (let x = 0; x < song_table.length; x++)
                {
                    if (song_table[x].includes('album'))
                    {
                        console.log('Ignored: ', song_table[x]);
                    }
                    else
                    {
                        songs.push(song_table[x]);
                        song_album.push(a_links[i]);
                        album_id.push(a_id[i]);
                    }
                    
                }
            }
            else //only 1 table exists, songs are in ul
            {
                a_genre.push(table_info[3]);
                a_artists.push(table_info[0]);
                a_release.push(table_info[4]);

                let song_list = $('.entry-content ol li a:nth-child(1)').get().map(x => $(x).attr('href'));

                for (let x = 0; x < song_list.length; x++)
                {
                    songs.push(song_list[x]);
                    song_album.push(a_links[i]);
                    album_id.push(a_id[i]);
                }
            }

            let img = ($('.singular-image').attr('data-src'));
            a_cover.push(img);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    console.log(songs.length);
    console.log(a_names.length);

    for (let i = 0; i < songs.length; i++)
    {
        song_links.push(songs[i]);
    }

    for (let i = 0; i < a_names.length; i++)
    {
        album.push({ID: a_id[i], Name: a_names[i], Album: a_links[i], Cover: a_cover[i], Genre: a_genre[i], Artist: a_artists[i], Release: a_release[i] });
    }
    console.log('Albums Complete');
    insertAlbumsIntoTable();
}
export { album };
export { song_links, song_album };
export { album_id };

