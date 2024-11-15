import { IUser } from '../interfaces/user.interface';
import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  first_name_ka: {
    type: String,
    required: true
  },
  first_name_en: {
    type: String,
    required: true
  },
  last_name_ka: {
    type: String,
    required: true
  },
  last_name_en: {
    type: String,
    required: true
  },
  gender: {
    enum: ['male', 'female']
  },
  birthday_year: {
    type: Number,
    required: true
  },
  address_ka: {
    type: String,
    required: true
  },
  address_en: {
    type: String,
    required: true
  },
  phone: {
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
          required: true,
          ref: 'Product'
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
  quantity?: number
) {
  try {
    const cartProductIndex = this?.cart?.items?.findIndex(
      (cp: { productId: ObjectId }) => {
        return cp.productId.toString() === productId.toString();
      }
    );
    let newQuantity = quantity || 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId,
        quantity: newQuantity
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

userSchema.methods.reduceQuantityOfCart = async function (productId: string) {
  try {
    const cartItem = this.cart.items.find(
      (item: { productId: ObjectId }) =>
        item.productId.toString() === productId.toString()
    );

    if (cartItem) {
      // Decrease the quantity
      cartItem.quantity -= 1;

      // If the quantity is less than or equal to zero, remove the item
      if (cartItem.quantity <= 0) {
        this.cart.items = this.cart.items.filter(
          (item: { productId: ObjectId }) =>
            item.productId.toString() !== productId.toString()
        );
      }
      await this.save();
    }
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.clearCart = async function () {
  this.cart = { items: [] };
  return this.save();
};

export default mongoose.model('User', userSchema);
