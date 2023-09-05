class ProductManager{
    constructor(){
        this.products = [];
    }

    addProduct(title,description,product,price,thumbnail,code,stock){

        const item = {
            id: this.products.length + 1,
            title: title,
            description: description,
            product: product,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        const found = this.products.find(product => product.code === code)
        if(!found){
            this.products.push(item);
        }else{
            console.log('El producto ya existe')
        }
    }

    getProductById(id){
        const found = this.products.find(product => product.id === id)
        if(found){
            return found
        }else{
            console.log('Not found')
        }
    }
}

const newProduct = new ProductManager();
newProduct.addProduct("Arroz","Arroz de 1kg","Arroz","$100","https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cronista.com%2Fclase%2Fmercados%2FArroz-precios-estables-y-buenas-expectativas-para-la-cosecha-20210225-0001.html&psig=AOvVaw0Q4Z3X0Z3Z2Q4QX6Q4QX6Q&ust=1634178975213000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqH0_MCFQAAAAAdAAAAABAD","1234","10")

console.log(newProduct.getProductById(1))
console.log(newProduct.getProductById(2))