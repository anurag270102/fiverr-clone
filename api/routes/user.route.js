import express from "express";
import {deleteUser,getUser} from '../../api/controller/user.controller.js'
import { verifyToken } from "../middelware/jwt.js";

const router =express.Router();
router.delete('/:id',verifyToken,deleteUser);
router.get('/:id',verifyToken,getUser);
export default router;