import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

// Import DB
import "./db/configDB.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")

app.use("/api/products",productsRouter)
app.use("api/carts",cartRouter)

app.listen(3000,()=>{
    console.log("Server is running @ http://localhost:3000")
})