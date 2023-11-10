import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    gigId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    star: {
        type: Number,
        require: true,
        enum: [1, 2, 3, 4, 5]
    },
    desc: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

export default mongoose.model("review", reviewSchema)