import fs from "fs"
import util from "util"
//const fs = require("fs")
//const util = require("util")

class ProductManager{
    constructor(path){
        this.path = path
    }

    async readProducts(path,queryObj){
        const {limit} = queryObj
        if(fs.existsSync(path)){
            const db_file = await fs.promises.readFile(path,"utf-8")
            const db_json = JSON.parse(db_file)
            return limit ? db_json.slice(0, limit) : db_json
        }else{
            return []
        }
    }

    async writeProducts(products){
        try{
            await fs.promises.writeFile(this.path,products)
        }catch(err){
            console.log("items couldn't be written. Please try again later")
            console.log(err)
        }
    }

    async addProduct(title,description,product,price,thumbnail,code,stock){   
        try{
            let products = await this.readProducts(this.path,{})
            const item = {
                id: products.lenght + 1,
                title: title,
                description: description,
                product: product,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            const found = products.find(product => product.code === code)
            console.log(found)
            if(!found){
                products.push(item);
                await this.writeProducts(JSON.stringify(products))
            }else{
                console.log('El producto ya existe')
            }
        }catch(err){
            console.log("Error en la BD. Contacta admin")
        }
    }

    async getProducts(){
        try{

            let db = await this.readProducts(this.path,{})
            return db
        }catch(err){
            console.log(err)
        }
    }

    async deleteProduct(id){
        try{
            const products = await this.readProducts(this.path,{})
            const newProducts = products.filter(product=>product.id !== id)
        }catch(err){
            console.log(err)
        }
    }

    async updateProduct(id,newProduct){
        try{
            const products = await this.getProducts(this.path)
            const found = await this.getProductById(id)
            if(found){
                await this.deleteProduct(id)
                let newArray = products.filter(product=>product.id !== id)
                newProduct.id = id
                newArray.push(newProduct)
                await this.writeProducts(newArray)
            }
        }catch(err){
            console.log(err)
        }
    }

    async getProductById(id){
        const products = await this.getProducts()
        const found_obj = products.find(product => product.id === id)
        if(found_obj){
            return found_obj
        }else{
            console.log("User doesn't exist")
            return false
        }
    }
}

const newProduct = new ProductManager("db.json");

export default newProduct

//newProduct.addProduct("Arroz","Arroz de 1kg","Arroz","$100","https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cronista.com%2Fclase%2Fmercados%2FArroz-precios-estables-y-buenas-expectativas-para-la-cosecha-20210225-0001.html&psig=AOvVaw0Q4Z3X0Z3Z2Q4QX6Q4QX6Q&ust=1634178975213000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqH0_MCFQAAAAAdAAAAABAD","1234","10")
//newProduct.getProducts()
//newProduct.getProductById(1)
//console.log(newProduct.getProductById(1))
//console.log(newProduct.getProductById(2))