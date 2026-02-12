const mongoose = require('mongoose');

// تصميم شكل المنتج في قاعدة البيانات
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },     // اسم المنتج
    price: { type: Number, required: true },    // السعر
    category: { type: String, required: true }, // القسم (ملابس، إلكترونيات، إلخ)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);