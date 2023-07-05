import Router from 'express';
import supabase from '../config/supabaseClient.js';

const songRouter = Router();

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

export default songRouter;