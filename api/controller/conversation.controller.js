import Conversation from "../models/conversation.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";
import { io, getUser } from "../utils/socket.js";
import SOCKET_EVENTS from "../utils/socketEvent.js";
export const createConversation = async (req, res, next) => {
  const newconversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newconversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readBySeller: false,
          readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    const unreadCount = await Conversation.countDocuments(
      req.isSeller
        ? {
            sellerId: req.userId,
            readBySeller: false,
          }
        : {
            buyerId: req.userId,
            readByBuyer: false,
          }
    );

    const socketId = getUser(req.userId);
    if (socketId) {
      io.to(socketId).emit(SOCKET_EVENTS.NEW_NOTIFICATION_COUNT, {
        unreadCount,
      });
    }

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) {
      return next(createError(404, "not found"));
    }
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });

    const result = await Promise.all(
      conversations.map(async (conversation) => {
        const otherUserId = req.isSeller
          ? conversation.buyerId
          : conversation.sellerId;

        const otherUser = await User.findById(otherUserId).select("username");

        return {
          ...conversation.toObject(),
          username: otherUser?.username,
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
