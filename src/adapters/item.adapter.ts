import { CategoryApi } from "../domain/dtos/category_api.dto";
import { DescriptionApi } from "../domain/dtos/description_api.dto";
import { ItemApi } from "../domain/dtos/item_api.dto";
import { Result } from "../domain/dtos/result.dto";
import { ResultSingular } from "../domain/dtos/resultSingular.dto";
import { Author } from "../domain/models/author.model";
import { Item } from "../domain/models/item.model";
import { Price } from "../domain/models/price.model";
import { ApiMercadoLibreClient } from "../infrastructure/clients/api_mercadolibre.client";

export class ResultAdapter {

  private apiMercadoLibre: ApiMercadoLibreClient;

  constructor() {
    this.apiMercadoLibre = new ApiMercadoLibreClient();;
  }

  private async getCategoriesFromApiMercadoLibre(items: ItemApi[]): Promise<string[]> {
    const categoriesId = Array.from(new Set<string>(items.map((item) => item.category_id)));
    const categories = await Promise.all(categoriesId.map(async(id) => await this.apiMercadoLibre.getCategoryById(id)));
    return categories.map((category: CategoryApi) => category.name);
  }

  public async getItemsFromApiMercadoLibre(query: string): Promise<Result> {
    const itemsApi: ItemApi[] = await this.apiMercadoLibre.getItems(query);
    const categories = await this.getCategoriesFromApiMercadoLibre(itemsApi);
    const items = await Promise.all(itemsApi.map(async(item) => {
      const currency = await this.apiMercadoLibre.getCurrencyById(item.currency_id)
      return new Item(
        item.id,
        item.title,
        new Price(
          currency.id,
          item.price,
          currency.decimal_places
        ),
        item.condition,
        item.thumbnail,
        item.shipping.free_shipping,
        item.seller.nickname,
      )
    }))

    return new Result(
      new Author('Mauricio', 'Guerra'),
      categories,
      items,
      []
    )
  }

  public async getItemByIdFromApiMercadoLibre(id: string): Promise<ResultSingular> {
    const itemApi: ItemApi = await this.apiMercadoLibre.getItemById(id);
    const descriptionItemApi: DescriptionApi = await this.apiMercadoLibre.getDescriptionItemById(id);
    const category = await this.apiMercadoLibre.getCategoryById(itemApi.category_id)
    const currency = await this.apiMercadoLibre.getCurrencyById(itemApi.currency_id)
    const item = new Item(
      itemApi.id,
      itemApi.title,
      new Price(
        currency.id,
        itemApi.price,
        currency.decimal_places
      ),
      itemApi.condition,
      itemApi.pictures[0].url,
      itemApi.shipping.free_shipping,
      itemApi.seller?.nickname,
      itemApi.sold_quantity,
      descriptionItemApi.plain_text,
      category.path_from_root.map((path) => path.name)
    );
    return new ResultSingular(
      new Author('Mauricio', 'Guerra'),
      item
    )
  }
}
