const getDb = require("../db").getDb;
const { v4 } = require("uuid");

module.exports = addMessageToConversation = async (
  messageText,
  userId,
  conversationId,
  isimage
) => {
  try {
    const newId = v4();
    const newMessage = {
      id: newId,
      text: messageText,
      postedById: userId,
      isimage: isimage,
    };
    const connection = await getDb();
    await connection.collection("conversations").updateOne(
      { conversationId: conversationId },
      {
        $push: { messages: newMessage },
      }
    );
    return "ok";
  } catch (err) {
    console.log("addMessageToConversation " + err.message);
    throw err;
  }
};
