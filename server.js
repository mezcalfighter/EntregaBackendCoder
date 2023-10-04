import express from "express"
import productsRouter from "./src/routes/products.router.js"
import cartRouter from "./src/routes/cart.router.js"

const app = express()

app.use(express.json())

app.use("/api/products",productsRouter)
app.use("api/carts",cartRouter)

app.listen(3000,()=>{
    console.log("Server is running @ http://localhost:3000")
})