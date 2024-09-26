import mongoose, { Schema } from "mongoose";

// Modelo de ventas
const saleModel = new Schema({
    ticket: {
        type: Number,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    ci: {
        type: String,
        required: true
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Sale', saleModel);
