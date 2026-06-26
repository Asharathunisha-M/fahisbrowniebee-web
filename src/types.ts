export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'fudgy' | 'tubs' | 'loaves';
  image: string;
  tag?: string;
  features: string[];
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  address: string;
}

export interface MockOrder {
  id: string;
  customerName: string;
  mobile: string;
  pincode: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}
