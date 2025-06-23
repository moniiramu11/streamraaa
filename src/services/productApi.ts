import axios from 'axios';
import { Product } from '../types/product';

const BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  const products = response.data;
  
  // Add mock shop links
  return products.map(product => ({
    ...product,
    shopLinks: {
      amazon: `https://www.amazon.in/s?k=${encodeURIComponent(product.title)}`,
      flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(product.title)}`,
      ...(product.category.includes('clothing') && {
        myntra: `https://www.myntra.com/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`
      })
    }
  }));
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  const products = response.data;
  
  // Add mock shop links
  return products.map(product => ({
    ...product,
    shopLinks: {
      amazon: `https://www.amazon.in/s?k=${encodeURIComponent(product.title)}`,
      flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(product.title)}`,
      ...(category.includes('clothing') && {
        myntra: `https://www.myntra.com/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`
      })
    }
  }));
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  const product = response.data;
  
  // Add mock shop links
  return {
    ...product,
    shopLinks: {
      amazon: `https://www.amazon.in/s?k=${encodeURIComponent(product.title)}`,
      flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(product.title)}`,
      ...(product.category.includes('clothing') && {
        myntra: `https://www.myntra.com/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`
      })
    }
  };
};

// Map movie genres/categories to product categories
export const getProductsForMovie = async (movieId: number): Promise<Product[]> => {
  // This is a mock function that would normally use real data mapping
  // For demo purposes, we'll return different product categories based on movie ID
  const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
  const categoryIndex = movieId % categories.length;
  const selectedCategory = categories[categoryIndex];
  
  try {
    return await getProductsByCategory(selectedCategory);
  } catch (error) {
    console.error('Error fetching products for movie:', error);
    return [];
  }
};