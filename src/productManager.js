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
            return err
        }
    }

    async addProduct(title,description,price,thumbnail,code,stock){   
        try{
            let products = await this.readProducts(this.path,{})
            const item = {
                id: products.lenght + 1,
                title: title,
                description: description,
                status: true,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            const found = products.find(product => product.code === code)
            if(!found){
                products.push(item);
                await this.writeProducts(JSON.stringify(products))
                return item
            }else{
                return false
            }
        }catch(err){
            return err
        }
    }

    async getProducts(){
        try{

            let db = await this.readProducts(this.path,{})
            return db
        }catch(err){
            return err
        }
    }

    async deleteProduct(id){
        try{
            const products = await this.readProducts(this.path,{})
            const productDeleted = products.find(product=>product.id === id)
            if(productDeleted){
                const newProducts = products.filter(product=>product.id !== id)
                await this.writeProducts(newProducts)
                return productDeleted
            }else{
                return false
            }
        }catch(err){
            return err
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
                return newProduct
            }
        }catch(err){
            return err
        }
    }

    async getProductById(id){
        const products = await this.getProducts()
        const found_obj = products.find(product => product.id === id)
        if(found_obj){
            return found_obj
        }else{
            return false
        }
    }
}

const newProduct = new ProductManager("../db.json");

export default newProduct

//newProduct.addProduct("Arroz","Arroz de 1kg","Arroz","$100","https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cronista.com%2Fclase%2Fmercados%2FArroz-precios-estables-y-buenas-expectativas-para-la-cosecha-20210225-0001.html&psig=AOvVaw0Q4Z3X0Z3Z2Q4QX6Q4QX6Q&ust=1634178975213000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqH0_MCFQAAAAAdAAAAABAD","1234","10")
//newProduct.getProducts()
//newProduct.getProductById(1)
//console.log(newProduct.getProductById(1))
//console.log(newProduct.getProductById(2))