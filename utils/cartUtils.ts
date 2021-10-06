import { client } from './shopify';
import { CartItem } from '../utils/types'

const initialiseLocal = () => {
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem('cart')!);

    if (cart) {
        const localCart = cart.lineItems.map((item: any) => {
            return {
                id: item.variant.id,
                title: item.title,
                variant: item.variant.title.toLowerCase(),
                quantity: item.quantity,
                price: parseInt(item.variant.price)
            }
        })
        return localCart
    } else {
        return []
    }
}

const updateCart = async(product: ShopifyBuy.Product, localCart: CartItem[], variant: string, quantity: number): Promise<CartItem[]> => {
    let variantIndex: number;
    (variant === 'cooked') ? variantIndex = 0 : variantIndex = 1;
    // want to check for cart id, if none get and assign one.
    //update shopify
    const storage = window.localStorage;
    let checkoutId: any = storage.getItem('checkout_id');
    if (!checkoutId) {
        const checkout = await client.checkout.create();
        checkoutId = checkout.id;
        storage.setItem('checkout_id', checkoutId);
    }
    //add item to shopping cart
    const lineItemsToAdd = [
        {
            variantId: product.variants[variantIndex].id,
            quantity: quantity,
        },
    ];
    // Add an item to the checkout
    const cart = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    storage.setItem('cart', JSON.stringify(cart));
    
    //update local cart
    let found: boolean = false;
    const newCart = localCart.map((item: CartItem) => {
        if(item.id === product.variants[variantIndex].id) {
            found = true
            return {
                id: item.id,
                title: item.title,
                variant: variant,
                quantity: item.quantity + quantity,
                price: item.price
            }
        } else {
            return item
        }
    })
    if(found) {
        return newCart;
    } else {
        const newCart: CartItem[]= [...localCart, {
            id: product.variants[variantIndex].id as string,
            title: product.title,
            variant: variant,
            quantity: quantity,
            price: parseInt(product.variants[variantIndex].price)
        }]
        return newCart;
    }
}

export {initialiseLocal, updateCart}