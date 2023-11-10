import Jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
export const verifyToken=async(req,res,next)=>{
    
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401,'you are not authcaticated'));
    
    Jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (!token) return next(createError(403,'token is not valid'));
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        next()//go to deleteUser
    })
}