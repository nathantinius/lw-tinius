import express from "express";
import characterFunctions from "../functions/characterFunctions.js";

const router = express.Router();

router.get('', characterFunctions.getAll);

export default router;