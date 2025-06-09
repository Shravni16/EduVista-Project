// routes/chatbot.js
const express = require("express");
const router = express.Router();
const { chatWithBot } = require("../controllers/Chatbot");

router.post("/chat", chatWithBot);

module.exports = router;
