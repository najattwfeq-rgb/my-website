const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        // 1. اطبع البيانات اللي جاية من الفورم عشان نتأكد إنها وصلت
        console.log("📦 البيانات المستلمة:", req.body);

        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await newMessage.save();
        console.log("✅ تم الحفظ بنجاح!");
        
        res.redirect('/contact.html?success=true'); 
    } catch (error) {
        // 2. اطبع سبب الخطأ بالتفصيل في التيرمينال
        console.error("❌ تفاصيل الخطأ:", error);
        res.status(500).send("حدث خطأ في السيرفر: " + error.message);
    }
};
exports.getMessages = async (req, res) => {
    try {
        // هات كل الرسايل ورتبهم من الأحدث للأقدم
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages); // ابعتهم في شكل JSON للصفحة
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ في جلب الرسائل" });
    }
};
exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: "تم حذف الرسالة بنجاح" });
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء الحذف" });
    }
};