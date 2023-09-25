import express from "express"
import newProduct from "./productManager.js"

const app = express()

app.get("/api/get_products", async(req,res)=>{
    const products = await newProduct.getProducts()
    if(!products){
        return res.status(404).json({message:"Couldn't find it, try again"})
    }
    res.status(200).json({message:"Products Found",data:products})
})

app.listen(3000,()=>{
    console.log("Server is running @ http://localhost:3000")
})