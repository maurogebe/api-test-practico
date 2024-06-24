import { Author } from "../models/author.model";
import { Item } from "../models/item.model";

export class Result {

  private author: Author;
  private categories: string[];
  private items: Item[];
  private path_from_root: string[];

  constructor(author: Author, categories: string[], items: Item[], path_from_root: string[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
    this.path_from_root = path_from_root;
  }

}
