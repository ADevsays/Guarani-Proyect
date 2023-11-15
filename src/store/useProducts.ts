import {defineStore} from 'pinia';

export const useAllProducts = defineStore('products', {
    state: ()=> ({
        products: [] as Product[]
    }),
    actions:{
        setproducts(products: Product[]){
            this.products = products;
        },
        getProducts(){
            return this.products;
        },
        addProducts(ProductsUser: Product){
            this.products.unshift(ProductsUser);
        },
        deleteProducts(id:string){
            this.products = this.products.filter(ProductsUser=> String(ProductsUser.id) != id);
        },
        updateProducts(ProductsUser: Product){
            const productsUpdate = this?.products?.map((ProductsProducts)=>{
                if(ProductsProducts.id == ProductsUser.id) {
                    return ProductsUser;
                };
                return ProductsProducts;
            })
            this.products = productsUpdate  as Product[];
        },
        getOneProduct(id:string):Product{
            return this.products.find(Products=> Products.id == id) as Product;
        }
    }
});