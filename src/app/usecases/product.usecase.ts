import { ProductAbstract } from './product.abstract';
import { ApiMercadoLibreClient } from '../../infrastructure/clients/api_mercadolibre.client';
import { ResultAdapter } from '../../adapters/item.adapter';
import { Result } from '../../domain/dtos/result.dto';
import { ItemApi } from '../../domain/dtos/item_api.dto';
import { Item } from '../../domain/models/item.model';
import { Author } from '../../domain/models/author.model';
import { ResultSingular } from '../../domain/dtos/resultSingular.dto';

export class ProductUsecase extends ProductAbstract {

  private resultAdapter: ResultAdapter;

  constructor() {
    super();
    this.resultAdapter = new ResultAdapter();
  }

  public async getProducts(query: string): Promise<Result> {
    const result: Result = await this.resultAdapter.getItemsFromApiMercadoLibre(query);
    return result;
  }

  public async getProductById(query: string): Promise<ResultSingular> {
    const resultSingular: ResultSingular = await this.resultAdapter.getItemByIdFromApiMercadoLibre(query);
    return resultSingular;
  }
}
