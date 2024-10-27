import mongoose from 'mongoose';
import { IToy } from '../interfaces/toy.interface';

const { Schema } = mongoose;

const toySchema = new Schema<IToy>({
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
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Toy', toySchema);
