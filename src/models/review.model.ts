import mongoose from 'mongoose';
import { IReview } from '../interfaces/review.interface';

const Schema = mongoose.Schema;

const reviewSchema = new Schema<IReview>({
  productId: {
    type: String,
    required: true,
    ref: 'Product'
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  }
});

export default mongoose.model('Review', reviewSchema);
