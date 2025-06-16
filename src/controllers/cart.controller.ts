import { Request, Response } from 'express';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

import { asyncHandler } from '../utils/asyncHandler.util';
import { errorHandler } from '../utils/errorHandler.util';
import { successHandler } from '../utils/successHadler.util';

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  // const cart = await req.user.populate('cart.items.productId');

  const userWithCart = await req.user.populate({
    path: 'cart.items.productId',
    populate: {
      path: 'category_id',
      select: 'name_en name_ka'
    },
    select: 'name_ka name_en price description image category_id'
  });
  return successHandler(res, userWithCart, '', 200);
});

export const postCart = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return errorHandler(res, 'Product id is required!', 400);

  const product = await Product.findById(id);

  if (!product) {
    return errorHandler(res, 'Product with given id not found', 404);
  }

  const response = await req.user.addToCart(product._id);

  return successHandler(res, response, '', 200);
});

export const postMultipleCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { products } = req.body;

    if (!products) return errorHandler(res, 'Products are required!', 400);

    for (const item of products) {
      const { productId, quantity } = item;

      const id = productId._id;

      const productFromDb = await Product.findById(id);

      if (!productFromDb) {
        return errorHandler(res, `Product with ID ${id} not found!`, 404);
      }
      await req.user.addToCart(productId, quantity);
    }
    return successHandler(res, null, 'Items added to cart!', 200);
  }
);

export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req?.body;

  if (!productId) {
    return errorHandler(res, `Product with ID ${productId} not found!`, 404);
  }

  await req.user.removeFromCart(productId);
  return successHandler(res, null, 'product deleted from cart', 200);
});

export const reduceQuantityInCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req?.body;

    if (!productId) {
      return errorHandler(res, `Product ID is required`, 400);
    }

    await req.user.reduceQuantityOfCart(productId);
    return successHandler(res, null, 'product quantity reduced in cart', 200);
  }
);

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
        product: product.productId
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
