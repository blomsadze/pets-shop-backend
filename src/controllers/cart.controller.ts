import { Request, Response } from 'express';
import Order from '../models/order.model.js';
import Toy from '../models/toy.model.js';
import Accessory from '../models/accessory.model.js';

import { asyncHandler } from '../utils/asyncHandler.util';
import { errorHandler } from '../utils/errorHandler.util';
import { successHandler } from '../utils/successHadler.util';

type ProductModelName = keyof typeof productModels;

const productModels = {
  toy: Toy,
  accessory: Accessory
};

const getProductModel = (modelName: ProductModelName) => {
  return productModels[modelName] || null;
};

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  // Retrieve products details based on the model type
  const cartItemsWithDetails = await Promise.all(
    req.user.cart.items.map(async (item: any) => {
      const ProductModel = getProductModel(item.model); // Get the correct product model
      const product = await ProductModel.findById(item.productId); // Fetch product details

      // Return a new object that includes product details
      return {
        ...item.toObject(), // Convert to plain object
        product: product || null // Add the product details, or null if not found
      };
    })
  );

  return successHandler(
    res,
    {
      userId: req.user._id,
      cart: { items: cartItemsWithDetails }
    },
    '',
    200
  );
});

export const postCart = asyncHandler(async (req: Request, res: Response) => {
  const { id, model } = req.body;
  if (!id) return errorHandler(res, 'Product id is required!', 400);
  if (!model) return errorHandler(res, 'Product model is required!', 400);

  const Product = getProductModel(model);
  if (!Product) return errorHandler(res, 'Invalid product model!', 400);

  const product = await Product.findById(id);
  if (!product) {
    return errorHandler(res, 'Product with given id not found', 404);
  }

  const response = await req.user.addToCart(product._id, model);

  return successHandler(res, response, '', 200);
});

export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req?.body;

  if (!productId) {
    return;
  }

  await req.user.removeFromCart(productId);
  return successHandler(res, null, 'product deleted from cart', 200);
});

export const postOrder = asyncHandler(async (req: Request, res: Response) => {
  const cartProducts = await req.user.populate('cart.items.productId');

  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user._id
    },
    products: cartProducts.cart.items.map((product: any) => {
      return {
        quantity: product.quantity,
        productId: product.productId,
        model: product.model
      };
    })
  });

  await order.save();
  await req.user.clearCart();

  return successHandler(res, order, 'product added to order', 200);
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ 'user.userId': req.user._id });

  return successHandler(res, orders, '', 200);
});
