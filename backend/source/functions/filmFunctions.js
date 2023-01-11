import axios from "axios";
import Redis from "ioredis";
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

const filmFunctions = {
    getFilmById: async (req, res) => {
        let cacheEntry = await redis.get(`film:${req.params.id}`);

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry)
            return res.status(200).json({film: cacheEntry, source: 'cache'});
        }

        axios({
            method: "GET",
            url: `https://swapi.dev/api/films/${req.params.id}`
        }).then((result) => {
            redis.set(`film:${req.params.id}`, JSON.stringify(result.data));
            return res.status(200).json({film: result.data, source: 'API'})
        }).catch(() => {
            return null
        })
    }
}

export default filmFunctions