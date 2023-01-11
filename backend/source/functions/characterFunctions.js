import axios from "axios";
import Redis from "ioredis";
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

const characterFunctions = {
    getAll: async (req, res) => {
        const searchFilter = req.query.sid

        if (searchFilter && searchFilter !== "") {
            let cacheEntry = await redis.get(`character:${searchFilter.toLowerCase()}`);

            if (cacheEntry) {
                cacheEntry = JSON.parse(cacheEntry)
                return res.status(200).json({character: cacheEntry, source: 'cache'});
            }

            return await axios({
                method: "GET",
                url: `https://swapi.dev/api/people?search=${searchFilter.toLowerCase()}`
            }).then((result) => {
                redis.set(`character:${searchFilter.toLowerCase()}`, JSON.stringify(result.data.results));
                return res.status(200).json({character: result.data.results})
            }).catch(() => {
                return res.status(200).json([]);
            })
        }

        //check cache
        let cacheEntry = await redis.get('characters:all')

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry);
            return res.status(200).json({characterList: cacheEntry, source: 'cache'})
        }

        let characterList = [];
        let page = 1;

        const getPageOfCharacters = async (page) => {
            const pageOfCharacters = await axios({
                method: 'GET',
                url: `https://swapi.dev/api/people?page=${page}`
            }).then((result) => {
                return result.data
            }).catch((error) => {
                return [];
            })

            characterList = characterList.concat(pageOfCharacters.results)

            if (pageOfCharacters.next !== null) {
                page++
                await getPageOfCharacters(page);
            }
        }

        await getPageOfCharacters(page);

        redis.set('characters:all', JSON.stringify(characterList));
        return res.status(200).json({characterList, source: 'SWAPI'});
    }
}

export default characterFunctions