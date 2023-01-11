import axios from "axios";
import Redis from "ioredis";
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

const starshipFunctions = {
    getStarshipById: async (req, res) => {
        let cacheEntry = await redis.get(`starship:${req.params.id}`);

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry)
            return res.status(200).json({starship: cacheEntry, source: 'cache'});
        }

        axios({
            method: "GET",
            url: `https://swapi.dev/api/starships/${req.params.id}`
        }).then((result) => {
            redis.set(`starship:${req.params.id}`, JSON.stringify(result.data));
            return res.status(200).json({starship: result.data, source: 'API'})
        }).catch(() => {
            return null
        })
    }
}

export default starshipFunctions