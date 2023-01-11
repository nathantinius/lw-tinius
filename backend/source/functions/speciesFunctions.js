import axios from "axios";
import Redis from "ioredis";
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

const speciesFunctions = {
    getSpeciesById: async (req, res) => {
        let cacheEntry = await redis.get(`species:${req.params.id}`);

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry)
            return res.status(200).json({speciesName: cacheEntry, source: 'cache'});
        }

       await axios({
           method: "GET",
           url: `https://swapi.dev/api/species/${req.params.id}`
       }).then((result) => {
           redis.set(`species:${req.params.id}`, JSON.stringify(result.data.name));
           return res.status(200).json({speciesName: result.data.name});
       }).catch(() => {
           return res.status(200).json({speciesName: "unknown"});
       })
    }
}

export default speciesFunctions