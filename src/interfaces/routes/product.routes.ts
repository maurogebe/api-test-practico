import express from 'express';
import { getProductById, getProducts } from "../controllers/product.controllers";

const router = express.Router();

router.get('/items', getProducts);
router.get('/items/:id', getProductById);

export default router;