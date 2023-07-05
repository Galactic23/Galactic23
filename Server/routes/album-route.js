import Router from 'express';
import supabase from '../config/supabaseClient.js';

const albumRouter = Router();

albumRouter.get('/albums', async (req, res) => {
    try {
        const {data: albums, error } = await supabase.from('albums').select('*').order('id', { ascending: true });
        if (error) {
            throw error;
        }
        res.json(albums);
    } catch (error) {
        console.error('Error retrieving data from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

export default albumRouter;