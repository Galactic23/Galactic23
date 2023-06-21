import Router from 'express';
import { logger } from './middleware.js'
import supabase from '../config/supabaseClient.js';

const songRouter = Router();

songRouter.use(logger);

songRouter.get('/songs', async (req, res) => {
    try {
        const {data: songs, error } = await supabase.from('songs').select('*');
        if (error) {
            throw error;
        }
        res.json(songs);
    } catch (error) {
        console.error('Error retrieving data from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

export default songRouter;