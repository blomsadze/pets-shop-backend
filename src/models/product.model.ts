import mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const { Schema } = mongoose;

const productSchema = new Schema<IProduct>(
  {
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    //   required: true
    // },
    // discountPrice: {
    //   type: Number,
    //   default: 0
    // },
    // discountPercent: {
    //   type: Number,
    //   default: 0
    // },
    sales_count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.image.publicId;
    return ret;
  }
});

export default mongoose.model('Product', productSchema);
