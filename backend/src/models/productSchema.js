import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        artisan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema)