import mongoose from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const Schema = mongoose.Schema;

const orderSchema = new Schema<IOrder>({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

export default mongoose.model('Order', orderSchema);
