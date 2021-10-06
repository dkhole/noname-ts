/** @jsxImportSource @emotion/react */
import Image from 'next/image';
import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { client } from '../../utils/shopify';
import { PropCartLine } from '../../utils/types'

export default function CartLine({ item, index }: PropCartLine) {
	const [quantity, setQuantity] = useState<number>(item.quantity);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [isGrey, setIsGrey] = useState<boolean>((index % 2 === 0) ? false : true)

    const removeItem = async (item: any) => {
		const storage = window.localStorage;
		const checkoutId: string = storage.getItem('checkout_id')!;
		const lineItemIdsToRemove = [item.id];
		// Remove a line from the checkout
		const cart = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove);
		storage.setItem('cart', JSON.stringify(cart));
		window.location.reload()
	};

    const changedQuant = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(item);
        if(parseInt(e.target.value) !== item.quantity){
            //update quantity
            setQuantity(parseInt(e.target.value));
            //activate update cart button
            setIsHidden(false);
        } else {
            setQuantity(item.quantity);
            setIsHidden(true);
        }
    }

    const updateCart = async() => {
        const storage = window.localStorage;
		const checkoutId: string = storage.getItem('checkout_id')!;
		const lineItemsToUpdate = [
            {id: item.id, quantity: quantity}
        ];

		const cart = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
		storage.setItem('cart', JSON.stringify(cart));
		window.location.reload()
    }

	return (
        <div css={css([
            {
                height: 'auto',
                width: '95vw',
                padding: '20px 20px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'white',
                margin: '5px 0'
            }
            ])}>
            <button onClick={() => removeItem(item)} css={{
                position: 'absolute',
                top: '5px',
                right: '10px',
                width: '20px',
                height: '20px',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                color: 'red',
                cursor: 'pointer',
                '&:hover': {
                    color: 'black'
                }
            }}>x</button>
            <div>
                <Image src={item.img} width={150} height={150} alt="product-pic" />
            </div>
            <div>
                <div>
                    <h4 css={{
                        margin: '0'
                    }}>{`${item.title}`}</h4>
                    <span>{item.variant}</span>
                </div>
                <div>
                        <button onClick={updateCart} css={css([
                            {
                                height: '20px',
                                width: '70px',
                                visibility: 'hidden',
                                cursor: 'pointer',
                                marginRight: '30px',
                                border: 'none',
                                backgroundColor: 'black',
                                color: 'white',
                                opacity: 0,
                                transition: 'all 150ms ease',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: '1px solid black'
                                }
                            },
                            !isHidden && {
                                visibility: 'visible',
                                opacity: 1,
                            }
                        ])}>UPDATE</button>
                        <label htmlFor="quantity">Qty</label>
                        <input onClick={(e) => {e.stopPropagation()}} onChange={(e) => {changedQuant(e)}} type="number" value={quantity} name="quantity" min="1" max="50" css={{
                            width: '40px',
                            margin: '25px 0',
                            border: 'none'
                        }}/>
                </div>
                <div css={{
                        fontSize: '12px'
                    }}>
                    <div css={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>{` unit price:`}</span> <span>{`${item.quantity} x $${item.price}`}</span> 
                    </div>
                    <div css={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '9px'
                    }}>
                        <span>line price:</span> <span css={{
                            fontSize: '19px',
                            fontWeight: 400
                        }}>${item.quantity * item.price}</span>    
                    </div>
                    
                </div>

            </div>    
        </div>
	);
}