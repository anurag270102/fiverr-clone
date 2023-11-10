import express from "express";
import {verifyToken} from '../middelware/jwt.js';
import { createMessage,getMessages } from "../controller/message.controller.js";
const router =express.Router();
router.post('/',verifyToken,createMessage);
router.get('/:id',verifyToken,getMessages);

export default router;