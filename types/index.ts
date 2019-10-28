export * from './state';

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  contact: Contact;
  gender: string;
  ip_address: string;
  avatar: string;
  address: Address;
}

export interface Product {
  cmps?: Array<any>;
  imgUrl: string;
  labels: Array<any>;
  miniPriceText: string;
  monthAmt: string;
  platId: string;
  productId: string;
  productName: string;
  productPrice: string;
  stageCount: string;
}
export interface Contact {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}
