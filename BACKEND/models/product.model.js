import mongoose, { Schema } from 'mongoose';

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Product', productModel);
