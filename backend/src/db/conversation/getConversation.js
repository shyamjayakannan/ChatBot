const getDb = require("../db").getDb;

module.exports = getConversation = async (conversationId) => {
  try {
    const connection = await getDb();
    const conversation = await connection
      .collection("conversations")
      .findOne({ conversationId: conversationId });

    const populatedConversation = conversation.messages;
    const messageHistroy = conversation.messageHistroy;

    for (const conversation of populatedConversation) {
      if (conversation.postedById === process.env.CHATBOT_ID) {
        conversation.isUser = "false";
      } else {
        conversation.isUser = "true";
      }
    }
    return { populatedConversation, messageHistroy };
  } catch (err) {
    console.log("getConversation " + err.message);
    throw err;
  }
};
