import axios from "axios";

const speciesFunctions = {
    getSpecies: async (req, res) => {
       const speciesUrl = req.query.s;
       await axios({
           method: "GET",
           url: speciesUrl
       }).then((result) => {
           return res.status(200).json({speciesName: result.data.name});
       }).catch(() => {
           return res.status(200).json({speciesName: "unknown"});
       })
    }
}

export default speciesFunctions