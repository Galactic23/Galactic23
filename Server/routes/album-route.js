import Router from 'express';
import { logger } from './middleware.js'
import supabase from '../config/supabaseClient.js';

const albumRouter = Router();

albumRouter.use(logger);

albumRouter.get('/albums', async (req, res) => {
    try {
        const {data: albums, error } = await supabase.from('albums').select('*');
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