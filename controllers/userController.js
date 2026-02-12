// لاحظ: ما زلنا نستخدم نفس الملف ولكن غيرنا المنطق بداخله
const Product = require('../models/User'); // استدعينا موديل المنتجات

// 1. عرض المنتجات
exports.getUsers = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // الأحدث أولاً
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. إضافة منتج
exports.createUser = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 3. حذف منتج
exports.deleteUser = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. تعديل منتج
exports.updateUser = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};