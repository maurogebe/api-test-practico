import { Price } from "./price.model";


export class Item {

  private id: string;
  private title: string;
  private price: Price;
  private condition: string;
  private picture: string;
  private free_shipping: boolean;
  private sold_quantity: number;
  private seller?: string;
  private description?: string;
  private path_from_root?: string[];

  constructor(id: string, title: string, price: Price, condition: string, picture: string, free_shipping: boolean, seller?: string, sold_quantity?: number, description?: string, path_from_root?: string[]) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.condition = condition;
    this.picture = picture;
    this.free_shipping = free_shipping;
    if(seller) this.seller = seller;
    this.sold_quantity = sold_quantity || 0;
    if(description) this.description = description;
    if(path_from_root) this.path_from_root = path_from_root;
  }

}
