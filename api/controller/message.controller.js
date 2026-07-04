import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { io, getUser } from "../utils/socket.js";
import SOCKET_EVENTS from "../utils/socketEvent.js";
export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    const receiverId = req.isSeller
      ? updatedConversation.buyerId
      : updatedConversation.sellerId;

    const receiverSocketId = getUser(receiverId);

    if (receiverSocketId) {
      const unreadCount = await Conversation.countDocuments(
        req.isSeller
          ? {
              buyerId: receiverId,
              readByBuyer: false,
            }
          : {
              sellerId: receiverId,
              readBySeller: false,
            }
      );

      io.to(receiverSocketId).emit(SOCKET_EVENTS.NEW_NOTIFICATION_COUNT, {
        unreadCount,
      });
    }

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const total = await Message.countDocuments({
      conversationId: req.params.id,
    });

    const messages = await Message.find({
      conversationId: req.params.id,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      messages: messages.reverse(),
      hasMore: page * limit < total,
    });
  } catch (err) {
    next(err);
  }
};
