/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { CartItem, PropPreviewCart } from "../utils/types";

export default function PreviewCart({ localCart, isVisible, setIsVisible }: PropPreviewCart) {
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		let sum = 0;
		localCart.map((item) => {
			sum += item.price * item.quantity;
		});
		setTotal(sum);
	}, [localCart]);

	return (
		<div
			css={css([
				{
					position: "fixed",
					right: "0",
					marginTop: "60px",
					padding: "10px",
					height: "auto",
					width: "300px",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					fontSize: "13px",
					zIndex: 1,
					visibility: "hidden",
					opacity: 0,
					transition: "all 200ms ease 2s",
					backgroundColor: "lavender",
					"&:hover": {
						opacity: 1,
						visibility: "visible",
					},
				},
				isVisible && {
					opacity: 1,
					visibility: "visible",
					transition: "all 200ms ease",
				},
			])}
			onTransitionEnd={() => setIsVisible(false)}
		>
			<div
				css={{
					position: "absolute",
					top: "-10px",
					right: "20px",
					height: 0,
					width: 0,
					borderLeft: "10px solid transparent",
					borderRight: "10px solid transparent",
					borderBottom: "10px solid lavender",
				}}
			></div>
			<div>
				{localCart &&
					localCart.map((item: CartItem, index: number) => {
						return (
							<div key={index}>
								<span>{`${item.quantity} x `}</span> <span>{`${item.title} ${item.variant}`}</span>{" "}
								<span
									css={{
										position: "absolute",
										right: "10px",
									}}
								>{`$${item.quantity * item.price}`}</span>
							</div>
						);
					})}
			</div>
			<div
				css={{
					marginTop: "10px",
				}}
			>
				<span>{`Total`}</span>
				<span
					css={{
						position: "absolute",
						right: "10px",
					}}
				>{`$${total}`}</span>
			</div>
		</div>
	);
}
