import mongoose from 'mongoose';
import { ISubCategory } from '../interfaces/subCategory.interface';

const { Schema } = mongoose;

const subCategorySchema = new Schema<ISubCategory>({
  name_ka: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

export default mongoose.model('SubCategory', subCategorySchema);
