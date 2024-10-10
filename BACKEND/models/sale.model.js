import mongoose, { Schema } from "mongoose";

const saleModel = new Schema({
    ticket: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            // Generar número de ticket basado en timestamp y número aleatorio
            return `TK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
    },    
    clientName: {
        type: String,
        required: true
    },
    clientCI: {
        type: String,
        required: true
    },
    products: [{
        productId: {
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
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['efectivo', 'qr', 'tarjeta']
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Sale', saleModel);