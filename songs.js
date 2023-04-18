const cheerio = require('cheerio');
const axios = require('axios');
const a = require('./albums');

const songs = [];
info = [];
s_links = [];
s_name = [];
s_album = [];
s_genre = [];
s_label = [];
s_release = [];
s_language = [];
s_artist = [];
s_english = [];
s_hangul = [];
s_romanized = [];

async function getData1()
{
    await a.getData(url);
    s_links = a.song_links;
    s_album = a.song_album;

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

            condition = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());

            if (condition == 6) //if table has 6 elements (Single, Album, Genre, Label, Release Date, Language)
            {
                temp_info = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());
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
                 temp_info = $('.wp-block-table table:nth-child(1) td:nth-child(2)').get().map(x => $(x).text());
                //info = info.concat(temp_info);
                //a_link = $('.wp-block-table.is-style-stripes td:nth-child(2)').first().attr('href');
            
                //s_album.push(a_link);
                s_genre.push(temp_info[1]);
                s_label.push(temp_info[2]);
                s_release.push(temp_info[3]);
                s_language.push(temp_info[4]);
            }

            temp_artists = ($('.entry-content h2').last().text());
            s_artist.push(temp_artists);

            total_lyrics = $('.entry-content h3').get().map(x => $(x).text());

            if (total_lyrics.length == 4)
            {
                head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI'))
                {
                    lyr_all = $('.entry-content p:not([class])').find('br').replaceWith(' ').end().get().map((e) => $(e).text());
                    lyr_size = lyr_all.length;

                    if (lyr_all[lyr_size - 1].includes('Translation'))
                    {
                        lyr_all.pop();
                        lyr_size = lyr_all.length;
                    }

                    split_lyric = lyr_size / 3;

                    for (let i = 0; i < split_lyric; i += split_lyric)
                    {
                        temp_rom = lyr_all.slice(i, split_lyric);
                        next = split_lyric*2;
                        temp_han = lyr_all.slice(split_lyric, next);
                        last = (split_lyric*3);
                        temp_eng = lyr_all.slice(next, last)
                    }
                    rom_str = temp_rom.join(' ');
                    han_str = temp_han.join(' ');
                    eng_str = temp_eng.join(' ');
                    
                    s_romanized.push(rom_str);
                    s_hangul.push(han_str);
                    s_english.push(eng_str);
                }
            }
            //else if (total_lyrics.length == 2)
            //{
            //    head_indentity = $('.entry-content h3').first().text();

                
            //}
            else
            {
                head_indentity = $('.entry-content h3').first().text();

                if (head_indentity.includes('ENGLISH') || head_indentity.includes('English'))
                {
                    lyr_all = $('.entry-content p:not([class])').find('br').replaceWith(' ').end().get().map((e) => $(e).text());
                    eng_str = lyr_all.join(' ');

                    s_english.push(eng_str);

                    s_hangul.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
                else if (head_indentity.includes('HANGUL') || head_indentity.includes('歌詞'))
                {
                    lyr_all = $('.entry-content p:not([class])').find('br').replaceWith(' ').end().get().map((e) => $(e).text());
                    han_str = lyr_all.join(' ');

                    s_hangul.push(han_str);

                    s_english.push('Unavailable');
                    s_romanized.push('Unavailable');
                }
                else if (head_indentity.includes('ROMANIZED') || head_indentity.includes('ROMAJI'))
                {
                    lyr_all = $('.entry-content p:not([class])').find('br').replaceWith(' ').end().get().map((e) => $(e).text());
                    rom_str = lyr_all.join(' ');

                    s_romanized.push(rom_str);

                    s_english.push('Unavailable');
                    s_hangul.push('Unavailable');
                }

            }

            //temp_lyrics = $('.entry-content p').text()
            //s_lyrics.push(temp_lyrics);
        }
        catch (error)
        {
            console.log(error);
        }
    }



    for (let i = 0; i < a.song_links.length; i++)
    {
        songs.push({ Name: s_name[i], Links: s_links[i], Album: s_album[i], Genre: s_genre[i], Artist: s_artist[i], Label: s_label[i], Release: s_release[i], Language: s_language[i], English_Lyrics: s_english[i], Hangul_Lyrics: s_hangul[i], Romanized_Lyrics: s_romanized[i]})
    }
    console.log('Songs Complete')
}

module.exports = { getData1, songs};