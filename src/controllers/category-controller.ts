import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Category from '../models/category-model';

async function getCategories(req: Request, res: Response) {
  const categories = await Category.find();
  res.json(categories);
}

async function createCategory(req: Request, res: Response) {
  // Find validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  // Try to find a category with the provided name
  let category = await Category.findOne({ name });

  // Throw error if category with provided name already exists
  if (category) {
    res.status(400);
    throw new Error(`Category with name ${name} already exists`);
  }

  // Category doesn't exist, create it
  category = await Category.create({ name });
  res.json(category);
}

async function getCategory(req: Request, res: Response) {
  // Find validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  // Find category with provided id
  const category = await Category.findById(id);

  // Send 404 response if category with provided id doesn't exist
  if (!category) {
    return res
      .status(404)
      .json({ message: `Could not find category with id ${id}` });
  }

  res.json(category);
}

export { getCategories, createCategory, getCategory };
