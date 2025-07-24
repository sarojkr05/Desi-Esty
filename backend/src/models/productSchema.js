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
      required: true,
      trim: true
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
    quantity :{
      type:Number,
      required: true,
      default:10,
    },
    inStock:{
      type:Boolean,
      default:true,
    
    },


  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
