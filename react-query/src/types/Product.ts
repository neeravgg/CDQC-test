export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  discountPercentage?: number;
  rating?: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}
export interface FetchProduct {
  total: number,
  skip: number,
  limit: number,
  products: Product[]
}

