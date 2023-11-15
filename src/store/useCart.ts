import {defineStore} from 'pinia';

export const useCart = defineStore('cart', {
    state: ()=> ({
        cart: {
            products: [],
            totalPrice: 0
        } as Cart
    }),
    actions:{
        setCart(cart: Cart){
            this.cart = cart;
        },
        getcart(){
            return this.cart;
        },
        addProduct(product:Product){
            this.cart.products.push(product);
        },
        plusToTotalPrice(newPrice:number){
            const prevPrice = this.cart.totalPrice;
            this.cart.totalPrice = prevPrice + newPrice;
        },
        deleteOneProduct(id:string){
            const prevProducts = this.cart.products;
            const newProducts = prevProducts.filter(product=> product.id != id);
            const newTotalPrice = newProducts.reduce((acc, item)=> acc + item.price, 0);
            this.cart.products = newProducts;
            this.cart.totalPrice = newTotalPrice;
        }
    }
});