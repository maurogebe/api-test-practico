import { Author } from "../models/author.model";
import { Item } from "../models/item.model";

export class ResultSingular {

  private author: Author;
  private item: Item;

  constructor(author: Author, item: Item) {
    this.author = author;
    this.item = item;
  }

}
