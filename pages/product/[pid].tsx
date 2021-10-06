/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { client } from '../../utils/shopify';
import { initialiseLocal, updateCart } from '../../utils/cartUtils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import PreviewCart from '../components/PreviewCart';
import { CartItem } from '../../utils/types'

const Product = ({ product }: any) => {
	const [localCart, setLocalCart] = useState<CartItem[]>([]);
	const [variant, setVariant] = useState<string>('raw')
	const [quantity, setQuantity] = useState<number>(1);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const checkCart: CartItem[] = initialiseLocal();
		setLocalCart(checkCart);
	}, []);

	const addToCart = async () => {
		setIsVisible(true)
		setLocalCart(await updateCart(product, localCart, variant, quantity));
	};

	return (
		<div >
			<Nav setIsVisible={setIsVisible}/>
			<PreviewCart localCart={localCart} isVisible={isVisible} setIsVisible={setIsVisible}/>
			<div css={{
				paddingTop: '70px',
			}}>
				<div>
					<Link href="/" passHref={true}>
						<button>BACK TO HOME</button>
					</Link>
				</div>
				<div css={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						padding: '0 50px'
					}}>
					<div css={{
						margin: '50px 0',
					}}>
						<Image src={product.images[0].src} width={200} height={200} alt="product-pic" />
					</div>
					<div css={{
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center'
					}}>
						<h2 css={{
							marginBottom: '10px',

						}}>{product.title}</h2>
						<span  css={{
							marginBottom: '10px'
						}}>{'$' + product.variants[0].price}</span>
						<span  css={{
							marginBottom: '20px',
							fontStyle: 'italic'
						}}>Always made with Human-Quality Ingredients</span>
						<span>{product.description}</span>
						<div>
							<label htmlFor="quantity">Qty:</label>
							<input type="number" name="quantity" min="1" max="10" value={quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} css={{
								width: '100px',
								margin: '40px 15px'
							}}/> 
						</div>
						<div>
							<select name="variant" onChange={(e) => {setVariant(e.target.value)}} css={{
								width: '100px'
							}}>
								<option value="raw">Raw</option>
								<option value="cooked">Cooked</option>
							</select>
							<button onClick={addToCart} css={{
								width: '100px',
								marginLeft: '50px'
							}}>Add to cart</button>
						</div>
					</div>
				</div>				
			</div>
		</div>
	);
};

export async function getStaticPaths() {
	const products = await client.product.fetchAll();

	// Get the paths we want to pre-render based on posts
	const paths = products.map((product) => ({
		params: { pid: product.id.toString() },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
	// Fetch a single product by ID
	const product = await client.product.fetch(params.pid);
	return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default Product;
