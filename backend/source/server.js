import http from 'http';
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import speciesRoutes from './routes/species.js';
import characterRoutes from './routes/characters.js';
import starshipRoutes from './routes/starships.js';
import filmRoutes from './routes/films.js'

const router = express();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    })
);

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH PUT POST DELETE');
        return res.status(200).json({});
    }

    next();
});

router.use('/api/species', speciesRoutes)
router.use('/api/characters', characterRoutes)
router.use('/api/starships', starshipRoutes)
router.use('/api/films', filmRoutes)

router.use((req, res) => {
    const error = new Error('Not Found');

    return res.status(404).json({
        message: error.message,
    });
});

const httpServer = http.createServer(router);
httpServer.listen(1003, () =>
    console.info(`Server running on localhost:1003`)
);