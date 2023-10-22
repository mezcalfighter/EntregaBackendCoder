import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    id:{
        type:Number,
        required: true
    },
    productId:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

export const cartModel = model("Cart",cartSchema)