import { model, Schema } from "mongoose";

const productsSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        default:0
    },
})

export const productsModel = model("Products",productsSchema)