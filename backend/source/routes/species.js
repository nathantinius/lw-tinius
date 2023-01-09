import express from "express";
import speciesFunctions from "../functions/speciesFunctions.js";

const router = express.Router();

router.get('', speciesFunctions.getSpecies);

export default router;