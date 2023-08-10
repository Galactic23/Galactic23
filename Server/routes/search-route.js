import Router from 'express';
import supabase from '../config/supabaseClient.js';

const searchRouter = Router();

searchRouter.get('/search', async (req, res) => {
    const { query } = req.query;
  
    try {
        const { data: albumData, error: albumError } = await supabase
            .from('albums')
            .select('id, name, cover, artist, genre, release')
            .textSearch('name', query);
  
        const { data: songData, error: songError } = await supabase
            .from('songs')
            .select('id, name, cover, artist, genre, release')
            .textSearch('name', query);
  
        if (albumError) {
            throw albumError;
        }
  
        if (songError) {
            throw songError;
        }
  
        const results = {
            albums: albumData,
            songs: songData,
        };
  
        res.json({ results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
export { searchRouter };