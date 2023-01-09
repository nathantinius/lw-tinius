import axios from "axios";
import Redis from "ioredis";

const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

const filmFunctions = {
    getCharactersByFilm: async (req, res) => {

        let cacheEntry = await redis.get(`film:${req.params.id}`);

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry);
            return res.status(200).json({characters: cacheEntry, source: 'cache'})
        }

        const characters = [];

        const filmCharacters = await axios({
            method: "GET",
            url: `https://swapi.dev/api/films/${req.params.id}/`
        }).then((result) => {
            return result.data.characters
        }).catch(() => {
            return [];
        })

        for (let c of filmCharacters) {
            await axios({
                method: 'GET',
                url: c,
            }).then((result) => {
                return characters.push(result.data)
            }).catch(() => {
                return null;
            })
        }

        redis.set(`film:${req.params.id}`, JSON.stringify(characters));
        return res.status(200).json({characters, source: 'API'});
    }
}

export default filmFunctions