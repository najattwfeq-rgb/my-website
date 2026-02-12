const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// لما حد يبعت فورم (POST Request)
router.post('/send', contactController.sendMessage);
router.get('/all', contactController.getMessages);
router.delete('/:id', contactController.deleteMessage)
module.exports = router;