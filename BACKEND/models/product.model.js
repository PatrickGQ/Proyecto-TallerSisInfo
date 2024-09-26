import mongoose, { Schema } from 'mongoose';

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'El precio debe ser mayor que 0']
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Product', productModel);
