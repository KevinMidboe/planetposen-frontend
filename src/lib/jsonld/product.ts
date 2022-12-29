import type { IProduct } from '../interfaces/IProduct';

function structureProduct(product: IProduct) {
  const output = product?.variations?.map((variation) => {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: `${product.name} - ${variation.size}`,
      image: product.images?.map((image) => image.url),
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
    };
  });

  return JSON.stringify(output);
}

export default function generateProductJsonLd(product: IProduct): string {
  return `<script type="application/ld+json">
${structureProduct(product)}
</script>
`;
}
