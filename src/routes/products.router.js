import { Router } from "express"
import newProduct from "../productManager.js"

const router = Router()

//Get all of the products no filter
router.get("/", async(req,res)=>{
    try{
        const products = await newProduct.getProducts(req.query)
        if(!products){
            return res.status(404).json({message:"Couldn't find it, try again"})
        }
        res.status(200).json({message:"Products Found",data:products})
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.get("/:id", async(req,res)=>{
    try{
        const product = await newProduct.getProductById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product couldn't be found"})
        }
        res.status(200).json({message:"Product Found",data:product})
    }catch(err){
        res.status(500).json({message:err})
    }
})
// POST - Add new product
router.post("/", async (req,res)=>{
    try{
        const {title, description, price, thumbnail, code, stock} = req.body
        if(title,description,price,thumbnail,code,stock){
            const newProduct = await newProduct.addProduct(title,description,price,thumbnail,code,stock)
            return res.status(200).json({message:"Product added ", product:newProduct})
        }else{
            return res.status(404).json({message:"Some data is missing"})
        }
    }catch(err){

    }
})

// PUT /:pid - Actualizar producto (no se elimina ni actualiza el id)
router.put("/:id", async (req, res)=>{
    try{
        const product = await newProduct.updateProduct(req.params.id,req.body)
        if(!product){
            return res.status(404).json({message:"Product couldn't be found"})
        }
        res.status(200).json({message:"Product Found",data:product})
    }catch(err){
        res.status(500).json({message:err})
    }
})

// DELETE /:pid elimina el producto con el pid indicado
router.delete("/:id", async (req, res)=>{
    try{
        const productDeleted = await newProduct.getProductById(req.params.id)
        if(!productDeleted){
            return res.status(404).json({message:"Product couldn't be found"})
        }
        res.status(200).json({message:"Product Found",data:product})
    }catch(err){
        res.status(500).json({message:err})
    }
})

export default router