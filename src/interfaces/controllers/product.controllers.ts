import { Request, Response } from "express";
import { Result } from "../../domain/dtos/result.dto";
import { ErrorException } from "../../domain/exceptions/error.exception";
import { ProductUsecase } from "../../app/usecases/product.usecase";
import { ProductAbstract } from "../../app/usecases/product.abstract";
import { ResultSingular } from "../../domain/dtos/resultSingular.dto";
import logger from "../../app/config/logger";

/**
 * Get products
 *
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const query = req.query.q;
    const productUsecase: ProductAbstract = new ProductUsecase();
    const result: Result = await productUsecase.getProducts(query as string);
    return res.status(200).json(result);
  } catch (e: any) {
    logger.error(e);
    if(e instanceof ErrorException) return res.status(e.statusCode).json({ message: e.message })
    return res.status(500).json({ message: "Internal Server Error" })
  }
};

/**
 * Get products
 *
 * @param {*} req
 * @param {*} res
 */
const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const productUsecase: ProductAbstract = new ProductUsecase();
    const result: ResultSingular = await productUsecase.getProductById(id as string);
    return res.status(200).json(result);
  } catch (e: any) {
    console.log(e)
    logger.error(e);
    if(e instanceof ErrorException) return res.status(e.statusCode).json({ message: e.message })
    return res.status(500).json({ message: "Internal Server Error" })
  }
};

export {
  getProducts,
  getProductById
};