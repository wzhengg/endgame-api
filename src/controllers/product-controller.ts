import { Request, Response } from 'express';
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

export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
