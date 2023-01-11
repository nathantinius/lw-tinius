import express from "express";
import filmFunctions from "../functions/filmFunctions.js";

const router = express.Router();

router.get('/:id', filmFunctions.getFilmById);

export default router;