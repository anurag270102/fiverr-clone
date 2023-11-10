import express from "express";
import {verifyToken} from '../middelware/jwt.js'
import {createReview,getReviews,deleteReview} from '../controller/review.controller.js';
const router =express.Router();
router.post("/",verifyToken,createReview)
router.get("/:gigId",getReviews)
router.delete("/:id",deleteReview)
export default router;