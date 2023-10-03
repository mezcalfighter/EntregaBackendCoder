import express from "express"
import newProduct from "./src/productManager.js"
import productsRouter from "./src/routes/products.router.js"

const app = express()

app.use(express.json())

//Get all of the products no filter
app.get("/api/products", async(req,res)=>{
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

app.get("/api/products/:id", async(req,res)=>{
    try{
        const product = await newProduct.getProductById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product couldn't be find"})
        }
        res.status(200).json({message:"Product Found",data:product})
    }catch(err){
        res.status(500).json({message:err})
    }
})

// PRODUCTOS
// api/products
// POST - Add new product
// PUT /:pid - Actualizar producto (no se elimina ni actualiza el id)
// DELETE /:pid elimina el producto con el pid indicado

// CARRITO
// api/carts
// POST - Crear un carrito: idNumber, array productos
// GET /:cid - Productos que pertenezcan al carrito
// POST /:cid/product/:pid - solo debe contener el id del producto, es crucial no agregar el producto completo. Cantidad. El producto se agrega de uno en uno. Si el producto ya existe entonces es incremental el numero


app.listen(3000,()=>{
    console.log("Server is running @ http://localhost:3000")
})