/** @jsxImportSource @emotion/react */
import Link from "next/link";
import Image from "next/image";
import { updateCart } from "../utils/cartUtils";
import { useState } from "react";
import { PropLanding } from "../utils/types";
import { css } from "@emotion/react";

export default function LandingProd({ product, localCart, setLocalCart, setIsVisible, button }: PropLanding) {
	const [quantity, setQuantity] = useState<number>(1);

	const addRawToCart = async (product: ShopifyBuy.Product) => {
		setLocalCart(await updateCart(product, localCart, "raw", quantity));
		setIsVisible(true);
	};

	const addCookedToCart = async (product: ShopifyBuy.Product) => {
		setLocalCart(await updateCart(product, localCart, "cooked", quantity));
		setIsVisible(true);
	};

	return (
		<Link href={`/product/${product.id}`} passHref={true}>
			<div
				css={{
					height: "470px",
					width: "90vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					marginBottom: "25px",
					padding: "15px",
					cursor: "pointer",
					backgroundColor: "white",
					"&:hover": {
						backgroundColor: "#f9f9f9",
						borderColor: "yellow",
					},
				}}
			>
				<h4
					css={{
						marginBottom: "7px",
					}}
				>
					{product.title}
				</h4>
				<span
					css={{
						marginBottom: "7px",
					}}
				>
					{"$" + product.variants[0].price}
				</span>
				<div
					css={{
						margin: "20px 0",
					}}
				>
					{product.images[0] && <Image src={product.images[0].src} width={150} height={150} alt="product-pic" />}
				</div>
				<span
					css={{
						fontSize: "15px",
						lineHeight: "22.5px",
						textAlign: "center",
					}}
				>
					{product.description}
				</span>
				<div>
					<label htmlFor="quantity">Qty:</label>
					<input
						onClick={(e) => {
							e.stopPropagation();
						}}
						onChange={(e) => {
							setQuantity(parseInt(e.target.value));
						}}
						type="number"
						value={quantity}
						name="quantity"
						min="1"
						max="10"
						css={{
							width: "40px",
							margin: "20px 10px",
							border: "none",
						}}
					/>
				</div>
				<div>
					<button
						onClick={(e) => {
							e.stopPropagation();
							addRawToCart(product);
						}}
						css={css`
							${button}
							margin-right: 20px;
						`}
					>
						Add raw to cart
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							addCookedToCart(product);
						}}
						css={css`
							${button}
							margin-left: 20px;
						`}
					>
						Add cooked to cart
					</button>
				</div>
			</div>
		</Link>
	);
}
