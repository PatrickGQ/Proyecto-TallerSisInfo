import mongoose, { Schema } from 'mongoose';

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,  
    required: true,
  }
});

export default mongoose.model('Product', productModel);
