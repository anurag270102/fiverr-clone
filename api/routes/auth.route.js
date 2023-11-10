import express from "express";
import {register,login,logout} from '../controller/auth.controller.js'
const router =express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);

export default router;