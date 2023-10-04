import express from "express"
import productsRouter from "./src/routes/products.router.js"

const app = express()

app.use(express.json())

app.use("/api/products",productsRouter)

// CARRITO
// api/carts
// POST - Crear un carrito: idNumber, array productos
// GET /:cid - Productos que pertenezcan al carrito
// POST /:cid/product/:pid - solo debe contener el id del producto, es crucial no agregar el producto completo. Cantidad. El producto se agrega de uno en uno. Si el producto ya existe entonces es incremental el numero


app.listen(3000,()=>{
    console.log("Server is running @ http://localhost:3000")
})