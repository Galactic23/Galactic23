import Router from 'express';
import supabase from '../config/supabaseClient.js';

const albumRouter = Router();
const newAlbums = Router();
const newAlbumsOST = Router();

albumRouter.get('/albums', async (req, res) => {
    try {
        const {data: albums, error: albumsError } = await supabase.from('albums').select('*').order('id', { ascending: true });
        if (albumsError) {
            throw albumsError;
        }
        res.json(albums);
    } catch (error) {
        console.error('Error retrieving albums from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

newAlbums.get('/recent_albums', async (req, res) => {
    try {
        const {data: recentAlbums, error: recentAlbumsError} = await supabase.from('albums').select('*').order('release', { ascending: false }).limit(15);
        if (recentAlbumsError) {
            throw recentAlbumsError;
        }
        res.json(recentAlbums);
    } catch (error) {
        console.error('Error retrieving recent albums from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

newAlbumsOST.get('/recent_ost_albums', async (req, res) => {
    try {
        const {data: recentAlbumsOST, error: recentAlbumsOSTError} = await supabase.from('albums').select('*').order('genre', { ascending: false }).order('release', { ascending: false }).limit(15);
        if (recentAlbumsOSTError) {
            throw recentAlbumsOSTError;
        }
        res.json(recentAlbumsOST);
    } catch (error) {
        console.error('Error retrieving recent OST albums from supabase:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

export { albumRouter, newAlbums, newAlbumsOST };