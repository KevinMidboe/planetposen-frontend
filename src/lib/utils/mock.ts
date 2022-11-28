import generateUUID from './uuid';
import type IProduct from '../interfaces/IProduct';
import type { IOrder, ICustomer } from '../interfaces/IOrders';
import BadgeType from '../interfaces/BadgeType';

const productNames = ["Who's Who", 'Lullaby', 'The Buried Life', 'The Illegitimate'];

const images = [
  'https://cdn-fsly.yottaa.net/551561a7312e580499000a44/www.joann.com/v~4b.100/dw/image/v2/AAMM_PRD/on/demandware.static/-/Sites-joann-product-catalog/default/dw4a83425c/images/hi-res/18/18163006.jpg?sw=556&sh=680&sm=fit&yocs=7x_7C_7D_',
  'https://cdn-fsly.yottaa.net/55d09df20b53443653002f02/www.joann.com/v~4b.ed/dw/image/v2/AAMM_PRD/on/demandware.static/-/Sites-joann-product-catalog/default/dwc10a651e/images/hi-res/alt/17767534Alt1.jpg?sw=350&sh=350&sm=fit&yocs=f_',
  'https://cdn-fsly.yottaa.net/55d09df20b53443653002f02/www.joann.com/v~4b.ed/dw/image/v2/AAMM_PRD/on/demandware.static/-/Sites-joann-product-catalog/default/dw3f43e4d8/images/hi-res/alt/18995779ALT1.jpg?sw=350&sh=350&sm=fit&yocs=f_',
  'https://cdn-fsly.yottaa.net/551561a7312e580499000a44/www.joann.com/v~4b.100/dw/image/v2/AAMM_PRD/on/demandware.static/-/Sites-joann-product-catalog/default/dw029904bd/images/hi-res/alt/18162834alt1.jpg?sw=350&sh=350&sm=fit&yocs=7x_7C_7D_',
  'https://adrianbrinkerhoff.imgix.net/AdrianBrinkerhoff-MatthewThompson-103.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=431&q=90&w=310&s=018ae410aa6b64e6c9c5ca6bb18a1137',
  'https://adrianbrinkerhoff.imgix.net/AdrianBrinkerhoff-MatthewThompson-166.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=431&q=90&w=310&s=50a1f0fb259452fb84453ee4216dd4f1',
  'https://adrianbrinkerhoff.imgix.net/AdrianBrinkerhoff-MatthewThompson-108.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=431&q=90&w=310&s=b4a75bdea66974a4f766ded52bfe9ba0',
  'https://adrianbrinkerhoff.imgix.net/AdrianBrinkerhoff-MatthewThompson-32.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=431&q=90&w=310&s=9199c53ea58a923373f7bcce1145193e'
];

const statusText = {
  [BadgeType.INFO]: 'Pending',
  [BadgeType.SUCCESS]: 'Succeeded',
  [BadgeType.WARNING]: 'Warning',
  [BadgeType.PENDING]: 'In transit',
  [BadgeType.ERROR]: 'Error'
};

const statusTypes = [
  BadgeType.INFO,
  BadgeType.SUCCESS,
  BadgeType.WARNING,
  BadgeType.PENDING,
  BadgeType.ERROR
];

function mockCustomer(): ICustomer {
  const customer: ICustomer = {
    email: 'kevin.midboe@gmail.com',
    firstName: 'kevin',
    lastName: 'midbøe',
    streetAddress: 'Schleppegrells gate 18',
    zipCode: '0556',
    city: 'Oslo'
  };

  customer.fullName = `${customer.firstName} ${customer.lastName}`;
  return customer;
}

export function mockOrder(id: string | null = null): IOrder {
  const products = mockProducts(4);
  const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];

  return {
    uuid: id || generateUUID(),
    products,
    customer: mockCustomer(),
    payment: {
      amount: Math.round(Math.random() * 800),
      currency: 'NOK'
    },
    createdDate: new Date(),
    updatedDate: new Date(),
    status: {
      type: status,
      text: statusText[status]
    }
  };
}

export function mockOrders(count: number): Array<IOrder> {
  return Array.from(Array(count)).map(() => mockOrder());
}

export function mockProduct(): IProduct {
  return {
    uuid: generateUUID(),
    name: productNames[Math.floor(Math.random() * productNames.length)],
    price: Math.floor(Math.random() * 999),
    quantity: Math.floor(Math.random() * 4) + 1,
    currency: 'NOK',
    image: images[Math.floor(Math.random() * images.length)]
  };
}

export function mockProducts(count: number): Array<IProduct> {
  return Array.from(Array(count)).map(() => mockProduct());
}
