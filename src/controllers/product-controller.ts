import { Request, Response } from 'express';
import Product from '../models/product-model';

async function getProducts(req: Request, res: Response) {
  const products = await Product.find();
  res.json(products);
}

export { getProducts };
