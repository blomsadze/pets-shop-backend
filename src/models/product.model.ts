import mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const { Schema } = mongoose;

const productSchema = new Schema<IProduct>({
  name_ka: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    required: true,
    type: Schema.Types.Mixed
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

export default mongoose.model('Product', productSchema);
