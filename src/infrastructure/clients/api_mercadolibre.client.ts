import axios from 'axios';
import { ItemApi } from '../../domain/dtos/item_api.dto';
import { ErrorException } from '../../domain/exceptions/error.exception';
import { CategoryApi } from '../../domain/dtos/category_api.dto';
import { CurrencyApi } from '../../domain/dtos/currency_api.dto';
import { DescriptionApi } from '../../domain/dtos/description_api.dto';

export class ApiMercadoLibreClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.mercadolibre.com/';
  }

  async getItems(query: string): Promise<ItemApi[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/sites/MLA/search?q=${query}&limit=4`);
      return response.data.results;
    } catch (error: any) {
      throw new ErrorException(`Failed to fetch data: ${error.message}`, 500);
    }
  }

  async getItemById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/items/${id}`);
      return response.data;
    } catch (error: any) {
      throw new ErrorException(`Failed to fetch data: ${error.message}`, 500);
    }
  }

  async getCategoryById(id: string): Promise<CategoryApi> {
    try {
      const response = await axios.get(`${this.baseUrl}/categories/${id}`);
      return response.data;
    } catch (error: any) {
      throw new ErrorException(`Failed to fetch data: ${error.message}`, 500);
    }
  }

  async getCurrencyById(id: string): Promise<CurrencyApi> {
    try {
      const response = await axios.get(`${this.baseUrl}/currencies/${id}`);
      return response.data;
    } catch (error: any) {
      throw new ErrorException(`Failed to fetch data: ${error.message}`, 500);
    }
  }

  async getDescriptionItemById(id: string): Promise<DescriptionApi> {
    try {
      const response = await axios.get(`${this.baseUrl}/items/${id}/description`);
      return response.data;
    } catch (error: any) {
      throw new ErrorException(`Failed to fetch data: ${error.message}`, 500);
    }
  }
}
