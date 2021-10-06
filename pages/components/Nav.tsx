/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { PropNav } from '../../utils/types';
import { css } from '@emotion/react';
import Image from 'next/image';
import bag from '../../assets/bag.svg'
import { useEffect, useState } from 'react';

export default function Nav({setIsVisible}: PropNav) {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
	
	return (
		<div 
			css={css([`
				height: 60px;
				width: 100vw;
				background-color: white;
				position: fixed;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20px;
				margin: 0;
				z-index: 1;
				transition: all 200ms ease;
			`,
			(scrollPosition > 50) && {
				boxShadow: '0px 1px 10px #999',
			}
		])}
		>
			<Link href="/" passHref={true}>
				<div css={{
					cursor: 'pointer'
				}}>NONAME</div>
			</Link>	
			<Link href={`/cart`} passHref={true}>
				<div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} css={css`
					cursor: pointer;
					margin-right: 10px;
					&:hover {
						stroke: white
					}
				`}>
					<Image
						src={bag}
						alt="Bag Logo"
						width={25}
						height={25}
					/>
				</div>
			</Link>
		</div>
	);
}
