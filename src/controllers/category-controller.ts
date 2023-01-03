import { Request, Response } from 'express';
import Category from '../models/category-model';

async function getCategories(req: Request, res: Response) {
  const categories = await Category.find();
  res.json(categories);
}

export { getCategories };
