import mongoose from 'mongoose';
import { IAccessory } from '../interfaces/accessory.interface';

const { Schema } = mongoose;

const accessorySchema = new Schema<IAccessory>({
  name: {
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Accessory', accessorySchema);
