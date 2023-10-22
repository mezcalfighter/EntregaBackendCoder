import { Router } from "express"

const router = Router()

// POST - Crear un carrito: idNumber, array productos
router.post("/",(req,res)=>{

})

// GET /:cid - Productos que pertenezcan al carrito
router.get("/:id",(req,res)=>{
})

// POST /:cid/product/:pid - solo debe contener el id del producto, es crucial no agregar el producto completo. Cantidad. El producto se agrega de uno en uno. Si el producto ya existe entonces es incremental el numero
router.post("/:id",(req,res)=>{
    
})
export default router