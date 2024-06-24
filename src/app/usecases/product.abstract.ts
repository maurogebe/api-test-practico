import { Result } from "../../domain/dtos/result.dto";
import { ResultSingular } from "../../domain/dtos/resultSingular.dto";

export abstract class ProductAbstract {

  abstract getProducts(query: string): Promise<Result>
  abstract getProductById(id: string): Promise<ResultSingular>
}  
