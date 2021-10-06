import { SerializedStyles } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

export interface ShopifyProducts {
	products: ShopifyBuy.Product[];
}

export interface CartItem {
	id: string,
	title: string,
	variant: string,
	quantity: number,
	price: number
}

export interface CartItemImg extends CartItem {
	img: string
}

export interface PropCart {
    localCart: CartItem[]
}

export interface PropNav {
    setIsVisible: (val: boolean) => void
}

export interface PropCartLine {
    item: CartItemImg,
	index: number
}

export interface PropLanding {
    product: ShopifyBuy.Product,
    localCart: CartItem[],
    setLocalCart: Dispatch<SetStateAction<CartItem[]>>,
	setIsVisible: (val: boolean) => void,
	button: SerializedStyles
}

export interface PropPreviewCart {
    localCart: CartItem[],
	isVisible: boolean,
	setIsVisible: (val: boolean) => void
}