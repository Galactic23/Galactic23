import Router from 'express';
import supabase from '../config/supabaseClient.js';

const songRouter = Router();
const newSongs = Router();

//songRouter.use(logger);

songRouter.get('/songs', async (req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    try {
        const {data: songs, error } = await supabase.from('songs').select('*').order('id', { ascending: true }).range(offset, offset + limit - 1);
        if (error) {
            throw error;
        }
        res.json(songs);
    } catch (error) {
        console.error('Error retrieving data from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

newSongs.get('/recent_songs', async (req, res) => {
    try {
        const {data: recentSongs, error: recentSongsError} = await supabase.from('songs').select('id, albums_id, import_song_id, name, link, cover, album_name, album_link, genre, artist, label, release, language').order('release', { ascending: false }).limit(15);
        if (recentSongsError) {
            throw recentSongsError;
        }
        res.json(recentSongs);
    } catch (error) {
        console.error('Error retrieving data from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

export { songRouter, newSongs };