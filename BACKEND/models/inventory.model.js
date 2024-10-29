import mongoose, { Schema } from 'mongoose';

const dailyInventoryModel = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  employees: [{
    employeeCi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }],
  inventoryItems: [{
    category: {
      type: String,
      enum: ['Pollo(kg)', 'Papas(kg)'],
      required: true
    },
    details: {
      initialStock: {
        type: Number,
        required: true,
        min: 0
      },
      sales: {
        type: Number,
        default: 0,
        min: 0
      },
      finalStock: {
        type: Number,
        required: true,
        min: 0
      }
    }
  }],
  observations: {
    type: String
  }
});

export default mongoose.model('DailyInventory', dailyInventoryModel);