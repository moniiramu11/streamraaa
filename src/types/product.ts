export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  shopLinks?: {
    amazon?: string;
    flipkart?: string;
    myntra?: string;
  };
}

export interface ProductResponse {
  products: Product[];
}