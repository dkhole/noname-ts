/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { initialiseLocal } from "../utils/cartUtils";
import { client } from "../utils/shopify";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import LandingProd from "./components/LandingProd";
import { ShopifyProducts, CartItem } from "../utils/types";
import PreviewCart from "./components/PreviewCart";

export default function Home({ products }: ShopifyProducts) {
	const [localCart, setLocalCart] = useState<CartItem[]>([]);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const mainBackgroundColor = css`
		background-color: #e8e8e8;
	`;

	const button = css`
		height: 20px;
		width: auto;
		cursor: pointer;
		border: none;
		background-color: black;
		color: white;
		font-weight: 500;
		transition: all 150ms ease;
		&:hover {
			background-color: white;
			color: black;
			border: 1px solid black;
		}
	`;

	useEffect(() => {
		const checkCart: CartItem[] = initialiseLocal();
		setLocalCart(checkCart);
	}, []);

	return (
		<div>
			<Nav setIsVisible={setIsVisible} />
			<PreviewCart localCart={localCart} isVisible={isVisible} setIsVisible={setIsVisible} />
			<Landing />
			<div
				css={css`
					width: 100vw;
					display: flex;
					align-items: center;
					flex-direction: column;
					${mainBackgroundColor};
				`}
			>
				<h2
					css={css`
						marginbottom: 70px;
					`}
				>
					Our Range
				</h2>
				{products.map((product: ShopifyBuy.Product, index: number) => {
					return <LandingProd product={product} key={index} localCart={localCart} setLocalCart={setLocalCart} setIsVisible={setIsVisible} button={button} />;
				})}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const products = await client.product.fetchAll();
	return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
