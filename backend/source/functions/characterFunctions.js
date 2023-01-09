import axios from "axios";

const characterFunctions = {
    getAll: async (req, res) => {
        const searchFilter = req.query.sid

        if (searchFilter && searchFilter !== "") {
            return await axios({
                method: "GET",
                url: `https://swapi.dev/api/people?search=${searchFilter}`
            }).then((result) => {
                return res.status(200).json(result.data.results)
            }).catch(() => {
                return res.status(200).json([]);
            })
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

        return res.status(200).json(characterList)
    }
}

export default characterFunctions