import { PictureApi } from "./picture_api.dto";
import { SellerApi } from "./seller_api.dto";
import { ShippingApi } from "./shipping_api.dto";

export class ItemApi {

  public id!: string;
  public title!: string;
  public seller!: SellerApi;
  public category_id!: string;
  public price!: number;
  public currency_id!: string;
  public shipping!: ShippingApi;
  public thumbnail!: string;
  public pictures!: PictureApi[];
  public condition!: string;
  public sold_quantity!: number;

}
