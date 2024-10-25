import mongoose, { Schema } from 'mongoose';

const branchModel = new Schema({
  nameBranch: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Empleados que trabajan en esta sucursal
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Productos disponibles en esta sucursal
  }],
  sales: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sale', // Ventas registradas en esta sucursal
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware para actualizar el campo updatedAt antes de guardar
branchModel.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Branch', branchModel);


