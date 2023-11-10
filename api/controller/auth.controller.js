import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
export async function register(req, res, next) {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("user created");
    } catch (err) {
        next(err);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, 'User not found'));

        const iscorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!iscorrect) return next(createError(400, 'wrong password'));

        const token = Jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        }, process.env.JWT_KEY);
        const { password, ...info } = user._doc;
        res.cookie("accessToken", token,
            { httpOnly: true }
        ).status(200).send(info);
    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true
    }).status(200).send("User has been logout");
}