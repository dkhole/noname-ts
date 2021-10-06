import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'nonamedogfood.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
});

export {client}