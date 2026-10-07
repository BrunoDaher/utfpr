import api from './api';
import {
  Product,
  productSchema,
  ProductsResponse,
  productsResponseSchema,
  CreateProductInput,
} from '../schemas/product.schema';

export interface ProductQueryParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}

export interface CategoryItem {
  slug: string;
  name: string;
  url: string;
}

//CRUD

export const productService = {

  /**
   * Cria um novo produto (DummyJSON)
   */
  async addProduct(data: CreateProductInput): Promise<Product> {
    const response = await api.post('/products/add', data);
    return response.data as Product;
  },

  /**
   * Atualiza um produto existente (DummyJSON)
   */
  async updateProduct(id: number, data: Partial<CreateProductInput>): Promise<Product> {
    const response = await api.put(`/products/${id}`, data);
    return response.data as Product;
  },

  /**
   * Remove um produto (DummyJSON)
   */
  async deleteProduct(id: number): Promise<{ id: number; isDeleted: boolean }> {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  /**
   * Retorna os produtos, pode receber paramentos de paginação, busca e categoria
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const limit = params?.limit ?? 12;
    const skip = params?.skip ?? 0;
    const search = params?.search?.trim();
    const category = params?.category?.trim();

    let endpoint = '/products';
    const queryParams: Record<string, string | number> = { limit, skip };

    if (search) {
      endpoint = '/products/search';
      queryParams.q = search;
    } else if (category && category !== 'all') {
      endpoint = `/products/category/${encodeURIComponent(category)}`;
    }

    const response = await api.get(endpoint, { params: queryParams });
    const parsed = productsResponseSchema.safeParse(response.data);

    if (!parsed.success) {
      console.warn('Products response mismatch:', parsed.error);
      return response.data as ProductsResponse;
    }

    return parsed.data;
  },

  /**
   * Retorna produto por ID
   */
  async getProductById(id: number | string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    const parsed = productSchema.safeParse(response.data);

    if (!parsed.success) {
      console.warn(`Product ${id} schema mismatch:`, parsed.error);
      return response.data as Product;
    }

    return parsed.data;
  },

  /**
   * Retorna os produtos por Categoria 
   */
  async getCategories(): Promise<CategoryItem[]> {
    const response = await api.get('/products/categories');
    if (Array.isArray(response.data)) {
      // In newer DummyJSON, categories is an array of objects { slug, name, url }
      // Or in older DummyJSON, an array of strings
      return response.data.map((item) => {
        if (typeof item === 'string') {
          return { slug: item, name: item.charAt(0).toUpperCase() + item.slice(1), url: '' };
        }
        return item as CategoryItem;
      });
    }
    return [];
  },




};

export default productService;
