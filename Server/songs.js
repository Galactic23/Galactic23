import { load } from 'cheerio';
import axios from 'axios';
import { getData } from './albums.js';
import { song_links } from './albums.js';
import { song_album } from './albums.js';

//const cheerio = require('cheerio');
//const axios = require('axios');
//const a = require('./albums');

const songs = [];
const hangul_kanji = /(?:[\u3131-\uD79D]+)|(?:[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+)/;
let info = [];
let s_links = [];
let s_name = [];
let s_album = [];
let s_genre = [];
let s_label = [];
let s_release = [];
let s_language = [];
let s_artist = [];
let s_english = [];
let s_hangul = [];
let s_romanized = [];

export async function getData1(url)
{
    await getData(url);
    //await a.getData(url);
    s_links = song_links;
    s_album = song_album;
    //s_links = a.song_links;
    //s_album = a.song_album;
    for (let i = 0; i < s_links.length; i++)
    {
        try
        {
            const response = await axios.get(s_links[i]);
            const data = response.data;
            const $ = load(data);

            //let temp = ($('.entry-content h2').first().text()); //locating table with album info
            //temp = temp.replace(" Lyrics", "");
            let temp = ($('.entry-header h1').first().text());
            console.log(temp);
            
            temp = temp.split(' – ');


            let temp2 = temp[1];
            temp2 = temp2.replace(" Lyrics", '');

            s_name.push(temp2);
            s_artist.push(temp[0]);

            //s_name.push(temp); //need to rewrite... have to get name from the title

            let condition = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());

            if (condition == 6) //if table has 6 elements (Single, Album, Genre, Label, Release Date, Language)
            {
                let temp_info = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());
                //info = info.concat(temp_info);
                //a_link = $('.wp-block-table.is-style-stripes td:nth-child(2)').first().attr('href');
            
                //s_album.push(a_link);

                s_genre.push(temp_info[2]);
                s_label.push(temp_info[3]);
                s_release.push(temp_info[4]);
                s_language.push(temp_info[5]);
            }
            else //table with 5 elements (Album, Genre, Label, Release Date, Language)
            {
                 let temp_info = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());
                //info = info.concat(temp_info);
                //a_link = $('.wp-block-table.is-style-stripes td:nth-child(2)').first().attr('href');
            
                //s_album.push(a_link);
                s_genre.push(temp_info[1]);
                s_label.push(temp_info[2]);
                s_release.push(temp_info[3]);
                s_language.push(temp_info[4]);
            }

            //let temp_artists = ($('.entry-content h2').last().text()); //fix this get artist from title, and splice the string to only get artist name
            //s_artist.push(temp_artists);

            $('.entry-content p:not([class])').find('br').replaceWith('\n');  //add new line when <br> exists
            let total_lyrics = $('.entry-content h3').get().map(x => $(x).text());
            let h2_size = $('.entry-content h2').get().map(x => $(x).text());

            if (total_lyrics.length == 4) //total_lyrics.length == 4
            {
                let head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized 
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for english

                    //rom_str = temp_rom.join(' ');
                    //han_str = temp_han.join(' ');
                    //eng_str = temp_eng.join(' ');
                    
                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                    s_english.push(temp_eng);
                }
                else if (head_indentity.includes('English') || head_indentity.includes('ENGLISH'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_eng = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for english
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_rom = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for romanized

                    s_english.push(temp_eng);
                    s_hangul.push(temp_han);
                    s_romanized.push(temp_rom);
                }
            }
            else if (h2_size > 2)
            {
                let count = 0;
                $('.entry-content h2').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                let temp_eng = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for english
                let temp_han = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                let temp_rom = $('.2').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for romanized

                s_english.push(temp_eng);
                s_hangul.push(temp_han);
                s_romanized.push(temp_rom);    
            }
            else
            {
                let count = 0;
                $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++);

                let head_indentity = $('.0').text();

                if (head_indentity.includes('ENGLISH') || head_indentity.includes('English') || head_indentity.includes('Lyrics') || head_indentity.includes('LYRICS'))
                {
                    let temp_eng = $('.0').nextUntil('.code-block-2').addBack().next('p:not([class])').text();

                    s_english.push(temp_eng);

                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
                else if (head_indentity.includes('HANGUL') || head_indentity.includes('歌詞'))
                {
                    let temp_han = $('.0').nextUntil('.code-block-2').addBack().next('p:not([class])').text();

                    s_hangul.push(temp_han);

                    s_english.push('Unavailable');
                    s_romanized.push('Unavailable');
                }

            }

            total_lyrics = [];
        }
        catch (error)
        {
            console.log(error);
        }
    }

    //change name to h1
    //at index 5739 of json file, lyrics get scrambled (Monsta X - RUSH HOUR) 
    //error occurs since title heading for lyric order is from English, Hangul and Romanized instead of Romanized, Hangul and English
    //1255 songs extracted out of 1268
    //1235

    for (let i = 0; i < s_links.length; i++)
    {
        songs.push({ Name: s_name[i], Links: s_links[i], Album: s_album[i], Genre: s_genre[i], Artist: s_artist[i], Label: s_label[i], Release: s_release[i], Language: s_language[i], English_Lyrics: s_english[i], Hangul_Lyrics: s_hangul[i], Romanized_Lyrics: s_romanized[i]})
    }
    console.log('Songs Complete');

    //insertData();
}
export { songs };
//module.exports = { getData1 };
//module.exports = { getData1, songs};