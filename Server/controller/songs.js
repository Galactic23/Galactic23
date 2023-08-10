import { load } from 'cheerio';
import axios from 'axios';
import { song_links, song_album_name, song_album_link, getData, recentAlbumData } from './albums.js';
import config from './https-cfg.js';
import { insertSongImports } from '../supabase.js';
import { album_id } from './albums.js';

const songs = [];
let s_id = [];
let s_links = [];
let s_name = [];
let s_cover = [];
let s_album_name = [];
let s_album_link = [];
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

    s_links = song_links;
    s_album_name = song_album_name;
    s_album_link = song_album_link;
    
    for (let i = 0; i < s_links.length; i++)
    {
        try
        {
            const response = await axios.get(s_links[i], config);
            const data = response.data;
            const $ = load(data);

            s_id.push(s_links.length - i);

            let temp = ($('.entry-header h1').first().html()); //.text()
            temp = temp.replace(/&nbsp;/g, " ");

            $('.entry-header h1').first().html(temp); //replace old html that contained "&nbsp;"
            
            let t = ($('.entry-header h1').first().text());
            t = t.split(' – ');
            let temp2 = t[1]; 
            temp2 = temp2.replace(" Lyrics", '');

            s_name.push(temp2);
            s_artist.push(t[0]); 

            console.log('Song #' + s_id[i] + ':', s_artist[i], ' - ', s_name[i]);

            if (temp2.includes('Wishes') || temp2.includes('Anymore')) //using this to debug
            {
                $('.entry-content h2').last().each((i, item) => (item.tagName = 'h3'))
                //console.log('Song found'); //json index 14566 song Merry Go Round Jap Ver. Izone (Oneiri Diary)
            }
            
            let condition = $('.wp-block-table table').first().find('td:nth-child(2)').get().map(x => $(x).text());

            if (condition.length == 6) //if table has 6 elements (Single, Album, Genre, Label, Release Date, Language)
            {
                if (s_album_link[i] == 'https://kgasa.com/album/bts-map-of-the-soul-7-the-journey/')
                {
                    s_genre.push('J-Pop');  //temp_info[2]
                    s_label.push('HYBE');  //temp_info[3]
                    s_release.push(condition[4]);//temp_info[4]
                    s_language.push(condition[5]);//temp_info[5]
                }
                else
                {
                    s_genre.push(condition[2]);  //temp_info[2]
                    s_label.push(condition[3]);  //temp_info[3]
                    s_release.push(condition[4]);//temp_info[4]
                    s_language.push(condition[5]);//temp_info[5]
                }
            }
            else if (condition.length == 5) //table with 5 elements (Album, Genre, Label, Release Date, Language)
            {
                if (s_links[i] == 'https://kgasa.com/yongzoo-maze/')
                {
                    s_genre.push(condition[1]);
                    s_label.push(condition[3]);
                    s_release.push(condition[2]);
                    s_language.push(condition[4]);
                }
                else
                {
                    s_genre.push(condition[1]);
                    s_label.push(condition[2]);
                    s_release.push(condition[3]);
                    s_language.push(condition[4]);
                }
            }
            else if (condition.length == 7) //table with 7 elements (Artist, Single, Album, Genre, Label, Release, Language)
            {
                s_genre.push(condition[3]);
                s_label.push(condition[4]);
                s_release.push(condition[5]);
                s_language.push(condition[6]);
            }

            //$('.entry-content p:not([class])').after('<br>');
            $('.entry-content p:not([class])').find('br').replaceWith('\n');  //add new line when <br> exists
            let total_lyrics = $('.entry-content h3').get().map(x => $(x).text());
            let h2_size = $('.entry-content h2').get().map(x => $(x).text());
            

            if (total_lyrics.length == 4) //if h3 size == 4
            {
                let head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji') || head_indentity.includes('Pinyin'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized 
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for english

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
                else if (head_indentity.includes('歌詞'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_han = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_rom = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_eng = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for eng

                    s_hangul.push(temp_han);
                    s_romanized.push(temp_rom);
                    s_english.push(temp_eng);
                }
            }
            else if (total_lyrics.length == 5)
            {
                let head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji') || head_indentity.includes('Pinyin'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized 
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.4').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for english

                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                    s_english.push(temp_eng);
                }
                else if (head_indentity.includes('ENGLISH'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_eng = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for english
                    let temp_rom = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_han = $('.3').nextUntil('.4').addBack().next('p:not([class])').text(); //lyrics for hangul

                    s_english.push(temp_eng);
                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                }
            }
            else if (h2_size.length > 2) //if h2 > 2
            {
                let head_indentity = $('.entry-content h2').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji'))
                {
                    let count = 0;
                    $('.entry-content h2').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h2 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_han = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.2').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for englsih

                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                    s_english.push(temp_eng);
                }
                else if (head_indentity.includes('English') || head_indentity.includes('ENGLISH'))
                {
                    let count = 0;
                    $('.entry-content h2').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h2 tags a unique class name

                    let temp_eng = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for english
                    let temp_han = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_rom = $('.2').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for romanized

                    s_english.push(temp_eng);
                    s_hangul.push(temp_han);
                    s_romanized.push(temp_rom);
                }
                else if (head_indentity == 'Maze Lyrics')
                {
                    let temp_eng = $('h3').nextUntil('figure').addBack().next('p:not([class])').text(); //lyrics for english

                    s_english.push(temp_eng);
                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
            }
            else if (total_lyrics.length == 2 || total_lyrics.length == 3) //if h3 size == 2 
            {
                let count = 0;
                $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++);

                let head_indentity = $('.0').text();

                if (head_indentity.includes('ENGLISH') || head_indentity.includes('English') || head_indentity.includes('Lyrics') || head_indentity.includes('LYRICS') || head_indentity.includes('2016'))
                {
                    let temp_eng = $('.0').nextUntil('.wp-block-table').addBack().next('p:not([class])').text();

                    s_english.push(temp_eng);

                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
                else if (head_indentity.includes('HANGUL') || head_indentity.includes('歌詞') || head_indentity.includes('歌詞'))
                {
                    let temp_han = $('.0').nextUntil('.wp-block-table').addBack().next('p:not([class])').text();
                    
                    s_hangul.push(temp_han);

                    s_english.push('Unavailable');
                    s_romanized.push('Unavailable');
                }

            }
            total_lyrics = [];

            let img = ($('.singular-image').attr('data-src'));
            s_cover.push(img);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    for (let i = 0; i < s_links.length; i++)
    {
        songs.push({ id: s_id[i], name: s_name[i], link: s_links[i], cover: s_cover[i], album_name: s_album_name[i], album_link: s_album_link[i], genre: s_genre[i], artist: s_artist[i], label: s_label[i], release: s_release[i], language: s_language[i], english_lyric: s_english[i], hangul_lyric: s_hangul[i], romanized_lyric: s_romanized[i]})
        //songs.push({ id: i + 1, Album_ID: album_id[i], Name: s_name[i], Links: s_links[i], Album: s_album[i], Genre: s_genre[i], Artist: s_artist[i], Label: s_label[i], Release: s_release[i], Language: s_language[i], English_Lyrics: s_english[i], Hangul_Lyrics: s_hangul[i], Romanized_Lyrics: s_romanized[i]})
    }
    console.log('Songs Complete');
    await insertSongImports();
    process.exit();
}
export async function recentData(url)
{
    await recentAlbumData(url);

    s_links = song_links;
    s_album_name = song_album_name;
    s_album_link = song_album_link;
    
    for (let i = 0; i < s_links.length; i++)
    {
        try
        {
            const response = await axios.get(s_links[i], config);
            const data = response.data;
            const $ = load(data);

            s_id.push(s_links.length - i);

            let temp = ($('.entry-header h1').first().html()); //.text()
            temp = temp.replace(/&nbsp;/g, " ");

            $('.entry-header h1').first().html(temp); //replace old html that contained "&nbsp;"
            
            let t = ($('.entry-header h1').first().text());
            t = t.split(' – ');
            let temp2 = t[1]; 
            temp2 = temp2.replace(" Lyrics", '');

            s_name.push(temp2);
            s_artist.push(t[0]); 

            console.log('Song #' + s_id[i] + ':', s_artist[i], ' - ', s_name[i]); //for debugging

            if (temp2.includes('Wishes') || temp2.includes('Anymore')) //using this to debug
            {
                $('.entry-content h2').last().each((i, item) => (item.tagName = 'h3'))
                //console.log('Song found'); //json index 14566 song Merry Go Round Jap Ver. Izone (Oneiri Diary)
            }
            
            let condition = $('.wp-block-table table').first().find('td:nth-child(2)').get().map(x => $(x).text());

            if (condition.length == 6) //if table has 6 elements (Single, Album, Genre, Label, Release Date, Language)
            {
                if (s_album_link[i] == 'https://kgasa.com/album/bts-map-of-the-soul-7-the-journey/')
                {
                    s_genre.push('J-Pop');  //temp_info[2]
                    s_label.push('HYBE');  //temp_info[3]
                    s_release.push(condition[4]);//temp_info[4]
                    s_language.push(condition[5]);//temp_info[5]
                }
                else
                {
                    s_genre.push(condition[2]);  //temp_info[2]
                    s_label.push(condition[3]);  //temp_info[3]
                    s_release.push(condition[4]);//temp_info[4]
                    s_language.push(condition[5]);//temp_info[5]
                }
            }
            else if (condition.length == 5) //table with 5 elements (Album, Genre, Label, Release Date, Language)
            {
                if (s_links[i] == 'https://kgasa.com/yongzoo-maze/')
                {
                    s_genre.push(condition[1]);
                    s_label.push(condition[3]);
                    s_release.push(condition[2]);
                    s_language.push(condition[4]);
                }
                else
                {
                    s_genre.push(condition[1]);
                    s_label.push(condition[2]);
                    s_release.push(condition[3]);
                    s_language.push(condition[4]);
                }
            }
            else if (condition.length == 7) //table with 7 elements (Artist, Single, Album, Genre, Label, Release, Language)
            {
                s_genre.push(condition[3]);
                s_label.push(condition[4]);
                s_release.push(condition[5]);
                s_language.push(condition[6]);
            }

            //$('.entry-content p:not([class])').after('<br>');
            $('.entry-content p:not([class])').find('br').replaceWith('\n');  //add new line when <br> exists
            let total_lyrics = $('.entry-content h3').get().map(x => $(x).text());
            let h2_size = $('.entry-content h2').get().map(x => $(x).text());
            

            if (total_lyrics.length == 4) //if h3 size == 4
            {
                let head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji') || head_indentity.includes('Pinyin'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized 
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for english

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
                else if (head_indentity.includes('歌詞'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_han = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_rom = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_eng = $('.3').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for eng

                    s_hangul.push(temp_han);
                    s_romanized.push(temp_rom);
                    s_english.push(temp_eng);
                }
            }
            else if (total_lyrics.length == 5)
            {
                let head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji') || head_indentity.includes('Pinyin'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized 
                    let temp_han = $('.2').nextUntil('.3').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.4').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for english

                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                    s_english.push(temp_eng);
                }
                else if (head_indentity.includes('ENGLISH'))
                {
                    let count = 0;
                    $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h3 tags a unique class name

                    let temp_eng = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for english
                    let temp_rom = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_han = $('.3').nextUntil('.4').addBack().next('p:not([class])').text(); //lyrics for hangul

                    s_english.push(temp_eng);
                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                }
            }
            else if (h2_size.length > 2) //if h2 > 2
            {
                let head_indentity = $('.entry-content h2').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI') || head_indentity.includes('Romanized') || head_indentity.includes('Romaji'))
                {
                    let count = 0;
                    $('.entry-content h2').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h2 tags a unique class name

                    let temp_rom = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for romanized
                    let temp_han = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_eng = $('.2').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for englsih

                    s_romanized.push(temp_rom);
                    s_hangul.push(temp_han);
                    s_english.push(temp_eng);
                }
                else if (head_indentity.includes('English') || head_indentity.includes('ENGLISH'))
                {
                    let count = 0;
                    $('.entry-content h2').get().map((e, count = 0) => $(e).addClass(count.toString()), count++); //give all h2 tags a unique class name

                    let temp_eng = $('.0').nextUntil('.1').addBack().next('p:not([class])').text(); //lyrics for english
                    let temp_han = $('.1').nextUntil('.2').addBack().next('p:not([class])').text(); //lyrics for hangul
                    let temp_rom = $('.2').nextUntil('div').addBack().next('p:not([class])').text(); //lyrics for romanized

                    s_english.push(temp_eng);
                    s_hangul.push(temp_han);
                    s_romanized.push(temp_rom);
                }
                else if (head_indentity == 'Maze Lyrics')
                {
                    let temp_eng = $('h3').nextUntil('figure').addBack().next('p:not([class])').text(); //lyrics for english

                    s_english.push(temp_eng);
                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
            }
            else if (total_lyrics.length == 2 || total_lyrics.length == 3) //if h3 size == 2 
            {
                let count = 0;
                $('.entry-content h3').get().map((e, count = 0) => $(e).addClass(count.toString()), count++);

                let head_indentity = $('.0').text();

                if (head_indentity.includes('ENGLISH') || head_indentity.includes('English') || head_indentity.includes('Lyrics') || head_indentity.includes('LYRICS') || head_indentity.includes('2016'))
                {
                    let temp_eng = $('.0').nextUntil('.wp-block-table').addBack().next('p:not([class])').text();

                    s_english.push(temp_eng);

                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
                else if (head_indentity.includes('HANGUL') || head_indentity.includes('歌詞') || head_indentity.includes('歌詞'))
                {
                    let temp_han = $('.0').nextUntil('.wp-block-table').addBack().next('p:not([class])').text();
                    
                    s_hangul.push(temp_han);

                    s_english.push('Unavailable');
                    s_romanized.push('Unavailable');
                }

            }
            total_lyrics = [];

            let img = ($('.singular-image').attr('data-src'));
            s_cover.push(img);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    for (let i = 0; i < s_links.length; i++) 
    {
        songs.push({ id: s_id[i], name: s_name[i], link: s_links[i], cover: s_cover[i], album_name: s_album_name[i], album_link: s_album_link[i], genre: s_genre[i], artist: s_artist[i], label: s_label[i], release: s_release[i], language: s_language[i], english_lyric: s_english[i], hangul_lyric: s_hangul[i], romanized_lyric: s_romanized[i]})
        //songs.push({ id: i + 1, Album_ID: album_id[i], Name: s_name[i], Links: s_links[i], Album: s_album[i], Genre: s_genre[i], Artist: s_artist[i], Label: s_label[i], Release: s_release[i], Language: s_language[i], English_Lyrics: s_english[i], Hangul_Lyrics: s_hangul[i], Romanized_Lyrics: s_romanized[i]})
    }
    console.log('Songs Complete');
    await insertSongImports();
    process.exit();
}

export { songs };