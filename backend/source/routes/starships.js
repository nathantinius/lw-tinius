import express from "express";
import starshipFunctions from "../functions/starshipFunctions.js";

const router = express.Router();

router.get('/:id', starshipFunctions.getStarshipById);

export default router;