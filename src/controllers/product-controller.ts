import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import Product from '../models/product-model';
import Category from '../models/category-model';

async function getProducts(req: Request, res: Response) {
  const products = await Product.find();
  res.json(products);
}

async function createProduct(req: Request, res: Response) {
  // Find category with provided id
  const category = await Category.findById(req.body.category);

  // Send 404 response if category with provided id doesn't exist
  if (!category) {
    res.status(404);
    throw new Error(`Could not find category with id '${req.body.category}'`);
  }

  // Create product
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    images: [req.body.images],
  });

  res.json(product);
}

async function getProduct(req: Request, res: Response) {
  const { id } = req.params;

  // Find product with provided id
  const product = await Product.findById(id);

  // Send 404 response if product with provided id doesn't exist
  if (!product) {
    res.status(404);
    throw new Error(`Could not find product with id '${id}'`);
  }

  res.json(product);
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;

  // Find product with provided id
  const product = await Product.findById(id);

  // Send 404 response if product with provided id doesn't exist
  if (!product) {
    res.status(404);
    throw new Error(`Could not find product with id '${id}'`);
  }

  // Find category with provided id
  const category = await Category.findById(req.body.category);

  // Send 404 response if category with provided id doesn't exist
  if (!category) {
    res.status(404);
    throw new Error(`Could not find category with id '${req.body.category}'`);
  }

  // Update product
  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  product.images = [req.body.images];
  await product.save();

  res.json(product);
}

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  // Find product with provided id
  const product = await Product.findById(id);

  // Send 404 response if product with provided id doesn't exist
  if (!product) {
    res.status(404);
    throw new Error(`Could not find product with id '${id}'`);
  }

  // Delete product
  await Product.deleteOne({ _id: id });

  res.json({ id });
}

function paramValidation() {
  return param('id').exists().isMongoId();
}

function bodyValidation() {
  return [
    body('name', 'Product name is required').trim().notEmpty().escape(),
    body('price')
      .trim()
      .notEmpty()
      .withMessage('Product price is required')
      .isCurrency()
      .withMessage('Product price must be valid')
      .escape(),
    body('category').notEmpty().isMongoId(),
    body('images').trim().notEmpty().isURL().escape(),
  ];
}

export {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  paramValidation,
  bodyValidation,
};
