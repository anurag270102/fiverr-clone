import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';
export const createGig = async (req, res, next) => {
  if (req.isSeller === false) { return next(createError(403, 'Only Seller Create a Gig')); }

  const newGig = new Gig({
    userId: req.userId,
    ...req.body
  })
  console.log(req.userId);
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) next(403, 'you can delete your gig');
  } catch (err) {
    next(err);
  }
  await Gig.findOneAndDelete(req.params.id);
  res.status(200).send('gig has been deleted');
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, 'Gig not found'));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
