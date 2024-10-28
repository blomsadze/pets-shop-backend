import { IUser } from '../interfaces/user.interface';
import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true
        },
        model: {
          type: String,
          required: true,
          enum: ['toy', 'accessory']
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

userSchema.methods.addToCart = async function (
  productId: string,
  model: string
) {
  try {
    const cartProductIndex = this?.cart?.items?.findIndex(
      (cp: { productId: ObjectId }) => {
        return cp.productId.toString() === productId.toString();
      }
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId,
        quantity: newQuantity,
        model
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };

    this.cart = updatedCart;
    await this.save();
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.removeFromCart = async function (productId: string) {
  try {
    const updatedCartItems = this.cart.items.filter(
      (item: { productId: ObjectId }) =>
        item.productId.toString() !== productId.toString()
    );
    this.cart.items = updatedCartItems;
    await this.save();
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.clearCart = async function () {
  this.cart = { items: [] };
  return this.save();
};

export default mongoose.model('User', userSchema);
