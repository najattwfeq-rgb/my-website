// 1. استدعاء المكتبات الضرورية
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// استدعاء ملفات الراوت (Routes Imports)
const contactRoutes = require('./routes/contactRoutes'); 
// const userRoutes = require('./routes/userRoutes'); // لو عندك ملف يوزر

// 2. تهيئة التطبيق
const app = express();

// 3. الاتصال بقاعدة البيانات (MongoDB Atlas) ☁️
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected (Cloud)'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==================================================
// 4. الـ Middlewares (إعدادات وسيطة) - 🚨 الترتيب هنا حياة أو موت 🚨
// ==================================================

// أ) لازم دول الأول عشان يفهم البيانات اللي جاية (من الفورم أو JSON)
app.use(express.urlencoded({ extended: true })); // ✅ تم النقل للأعلى (عشان يقرأ بيانات الفورم)
app.use(express.json()); // لقراءة بيانات JSON

// ب) باقي الإعدادات
app.use(cors()); // للسماح بالاتصال الخارجي
app.use(express.static('public')); // لعرض ملفات الموقع (HTML/CSS)


// ==================================================
// 5. تعريف المسارات (Routes) - 🚦 تيجي بعد الـ Middlewares 🚦
// ==================================================

// مسار التواصل (الجديد) ✅
app.use('/api/contact', contactRoutes);

// مسار الـ API الخاص بالمستخدمين (لو موجود)
app.use('/api/users', require('./routes/userRoutes')); 

// مسار تجريبي للتأكد أن السيرفر يعمل
app.get('/api', (req, res) => {
    res.send('API is running successfully... 🚀');
});

// --- توجيه الصفحات (Frontend Routing) ---

// الصفحة الرئيسية (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// صفحة لوحة التحكم (dashboard.html)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
// مسار صفحة تواصل معنا
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
// 6. تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// مهم جداً لـ Vercel
module.exports = app;