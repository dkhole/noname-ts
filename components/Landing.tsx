/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Landing() {
	return (
		<div
			css={{
				height: "75vh",
				width: "100vw",
				backgroundColor: "beige",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<h1
				css={{
					margin: "0",
				}}
			>
				Noname
			</h1>
			<h3
				css={{
					margin: "0",
					marginBottom: "30px",
				}}
			>
				Dog Food
			</h3>
			<button
				css={{
					margin: "0",
					height: "30px",
					width: "90px",
				}}
			>
				Shop Now
			</button>
		</div>
	);
}
