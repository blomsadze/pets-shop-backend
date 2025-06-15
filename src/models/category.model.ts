import mongoose from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const { Schema } = mongoose;

const categorySchema = new Schema<ICategory>({
  name_ka: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

export default mongoose.model('Category', categorySchema);
