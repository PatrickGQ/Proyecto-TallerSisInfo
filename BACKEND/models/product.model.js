import mongoose, { Schema } from 'mongoose';

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('Product', productModel);
