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
    throw new Error(`Category with name '${name}' already exists`);
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
    res.status(404);
    throw new Error(`Could not find category with id '${id}'`);
  }

  res.json(category);
}

async function updateCategory(req: Request, res: Response) {
  // Find validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name } = req.body;

  // Find category with provided id
  const category = await Category.findById(id);

  // Throw error if category with provided id doesn't exist
  if (!category) {
    res.status(404);
    throw new Error(`Could not find category with id '${id}'`);
  }

  // Throw error if category with provided name already exists
  if (await Category.findOne({ name })) {
    res.status(400);
    throw new Error(`A category with name '${name}' already exists`);
  }

  // Category exists and name is unused, update it
  category.name = name;
  await category.save();

  res.json(category);
}

export { getCategories, createCategory, getCategory, updateCategory };
