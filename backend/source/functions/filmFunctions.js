import axios from "axios";

const filmFunctions = {
    getCharactersByFilm: async (req, res) => {
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

        return res.status(200).json(characters);
    }
}

export default filmFunctions