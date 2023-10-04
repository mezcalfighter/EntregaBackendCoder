import newProduct from "./productManager";
import fs from "fs"

class cartManager{
    constructor(path){
        this.path = path
    }

    async readItems(path,queryObj){
        const {limit} = queryObj
        if(fs.existsSync(path)){
            const db_file = await fs.promises.readFile(path,"utf-8")
            const db_json = JSON.parse(db_file)
            return limit ? db_json.slice(0, limit) : db_json
        }else{
            return []
        }
    }

    async writeItems(items){
        try{
            await fs.promises.writeFile(this.path,items)
        }catch(err){
            return err
        }
    }

    async getItems(){
        try{
            let db = await this.readItems(this.path,{})
            return db
        }catch(err){
            return err
        }
    }

    async deleteItem(id){
        try{
            const items = await this.readItems(this.path,{})
            const itemDeleted = items.find(item=>item.id === id)
            if(itemDeleted){
                const newItems = items.filter(item=>item.id !== id)
                await this.writeItems(newItems)
                return itemDeleted
            }else{
                return false
            }
        }catch(err){
            return err
        }
    }

    async addItem(cartId,itemId,amount){   
        try{
            let items = await this.readItems(this.path,{})
            const newItem = {
                cart_id: cartId + 1,
                id: itemId,
                amount: amount
            }
            const found = items.find(item => item.cart_id.id === item)
            if(found){
                await this.writeItems(JSON.stringify(items))
                return item
            }else{
                items.push(item);
                await this.writeItems(JSON.stringify(items))
            }
        }catch(err){
            return err
        }
    }

    async updateItem(cartId,itemId,amount){   
        try{
            const items = await this.getItems(this.path)
            const found = await this.getItemById(id)
            if(found){
                await this.deleteProduct(id)
                let newArray = items.filter(item=>item.id !== id)
                const item = {
                    cart_id : cartId,
                    items:[
                        {
                            id:itemId,
                            amount:found.id + 1
                        }
                    ]
                }
                newArray.push(item)
                await this.writeItems(newArray)
                return newArray
            }
        }catch(err){
            return err
        }
    }

    async getItemById(id){
        const items = await this.getItems()
        const found_item = items.find(item => item.id === id)
        if(found_item){
            return found_item
        }else{
            return false
        }
    }
}

const newCart = new cartManager("../cart.json")

export default newCart