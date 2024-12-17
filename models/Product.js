import mongoose from 'mongoose';
import validator from 'validator';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) {
        throw new Error('Price must be a positive number');
      }
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'fashion', 'food']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: 150
  }
});

productSchema.pre('save', function(next) {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;