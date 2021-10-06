/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItemImg } from '../utils/types';
import CartLine from './components/CartLine';
import Nav from './components/Nav';

export default function Cart() {
	const [localCart, setLocalCart] = useState<CartItemImg[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [checkoutURL, setcheckoutURL] = useState<string>('');
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const storage = window.localStorage;
		let cart = JSON.parse(storage.getItem('cart')!);
		if (cart) {
			setLocalCart(cart.lineItems.map((item: any) => {
				return {
					id: item.id,
					title: item.title,
					variant: item.variant.title,
					quantity: item.quantity,
					price: item.variant.price,
					img: item.variant.image.src
				}
			}))
		}
		setTotalPrice(cart.totalPrice);
		setcheckoutURL(cart.webUrl);
	}, []);

	if (!localCart || Object.entries(localCart).length === 0) {
		return (
			<div css={{
			}}>
				<Nav setIsVisible={setIsVisible} />
				<div>
					<h1 css={{
						textAlign: 'center',
						margin: 0
					}}>SHOPPING CART</h1>

					<div css={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						margin: '200px'
					}}>
						EMPTY CART
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div css={{
				fontFamily: 'Josefin Sans, sans-serif',
				backgroundColor: '#e8e8e8',
				minHeight: '100vh'
			}}>
				<Nav setIsVisible={setIsVisible} />
				<div css={{
					paddingTop: '70px',
				}} >
					<div css={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						height: '80px',
						width: '95vw',
						backgroundColor: 'white',
						margin: 'auto',
						marginBottom: '10px',
					}}>
						<h1 css={{
							textAlign: 'center',
							fontWeight: 700,
							margin: 0,
							padding: 0,
							fontSize: '20px'
						}}>MY CART</h1>
						<div css={{
							textAlign: 'center'
						}}>
							<div css={{
								marginBottom: '10px'
							}}><span>Cart Total</span> ${totalPrice}</div>
							<Link href={`${checkoutURL}`} passHref={true}>
								<button css={{
									height: '20px',
									width: 'auto',
									cursor: 'pointer',
									border: 'none',
									backgroundColor: 'black',
									color: 'white',
									fontWeight: 500,
									transition: 'all 150ms ease',
									'&:hover': {
										backgroundColor: 'white',
										color: 'black',
										border: '1px solid black'
									}
                            }}>CHECKOUT</button>
							</Link>
						</div>
					</div>
					<div css={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column'
					}}>
						{localCart.map((item: CartItemImg, index: number) => {
							return (
								<CartLine item={item} index={index} key={index}/>
							);
						})}
					</div>
					<div css={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						height: '80px',
						width: '95vw',
						backgroundColor: 'white',
						margin: '15px auto',
					}}>
						<div>
							<span>Cart Total</span> ${totalPrice}
						</div>
						<Link href={`${checkoutURL}`} passHref={true}>
							<button css={{
								height: '20px',
								width: 'auto',
								cursor: 'pointer',
								border: 'none',
								backgroundColor: 'black',
								color: 'white',
								fontWeight: 500,
								transition: 'all 150ms ease',
								'&:hover': {
									backgroundColor: 'white',
									color: 'black',
									border: '1px solid black'
								}
							}}>Checkout</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
