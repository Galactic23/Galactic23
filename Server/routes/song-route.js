import Router from 'express';

const myMiddleware = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);

    // Perform some authentication logic
    if (!req.headers.authorization) {
        // If authorization header is missing, send an error response
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Modify the request object by adding a custom property
    req.customProperty = 'Custom value';
    next();
};

const router = Router();

router.use(myMiddleware);

router.get('/songs', async (req, res) => {
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

export default { router }