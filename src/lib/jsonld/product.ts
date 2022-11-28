import type { IProduct } from '../interfaces/IProduct'

function structureProduct(product: IProduct) {
  const output = product?.variations?.map(variation => {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: `${product.name} - ${variation.size}`,
      image: [product.image],
      description: product.description,
      sku: `${product.product_no}-${variation.sku_id}`,
      productID: product.product_no,
      mpn: product.product_no,
      brand: {
        '@type': 'Brand',
        name: 'Planetposen'
      },
      offers: {
        '@type': 'Offer',
        url: `https://planet.schleppe.cloud/shop/${product.product_no}`,
        priceCurrency: 'NOK',
        price: variation.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock'
      }
    }
  })

  return JSON.stringify(output);
}

export default function generateProductJsonLd(product: IProduct): HTMLElement {
  const jsonldScript = document.createElement('script');
  jsonldScript.setAttribute('type', 'application/ld+json');
  jsonldScript.textContent = structureProduct(product);

  return jsonldScript;
}
