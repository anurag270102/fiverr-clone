import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
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
    if (!user) return next(createError(404, "User not found"));

    const iscorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!iscorrect) return next(createError(400, "wrong password"));

    const token = Jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // add refresh token logic here
    const refreshToken = Jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .clearCookie("refreshToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logout");
};

export const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return next(createError(401, "You are not authenticated!"));

  Jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) return next(createError(403, "Refresh token is not valid!"));

    const newAccessToken = Jwt.sign(
      {
        id: user.id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true });
    res.status(200).send({ message: "Access token refreshed successfully" });
  });
};
