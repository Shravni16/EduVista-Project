
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB999sNdzeNU_nBAlyUjxkgFzTY8-jygSc"); // replace with actual API key

exports.chatWithBot = async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("usermesg",userMessage);

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const chat = model.startChat(); // or you can keep a session-based chat

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botReply = response.text();

    res.json({ success: true, reply: botReply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ success: false, message: "Chatbot failed" });
  }
};
// controllers/chatbotController.js


// exports.chatWithBot = async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const history = req.body.history || []; // Expect array of previous messages

//     // Add the new user message to history
//     const updatedHistory = [...history, { role: "user", content: userMessage }];

//     const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
//     // Start chat with history context
//     const chat = model.startChat();

//     // Send full conversation history to the model
//     // (depends on your library API, but ideally it supports passing message arrays)
//     // For example, if the API supports sending history:
//     const result = await chat.sendMessage(userMessage, { context: updatedHistory });

//     const response = await result.response;
//     const botReply = response.text();

//     // Add bot reply to history to maintain full conversation on client side as well
//     updatedHistory.push({ role: "bot", content: botReply });

//     res.json({ success: true, reply: botReply, history: updatedHistory });
//   } catch (error) {
//     console.error("Chatbot error:", error);
//     res.status(500).json({ success: false, message: "Chatbot failed" });
//   }
// };
