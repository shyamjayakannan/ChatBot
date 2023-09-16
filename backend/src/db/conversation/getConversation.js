const getDb = require("../db").getDb;
const ObjectId = require("mongodb").ObjectId;

module.exports = getConversation = async (conversationId) => {
  try {
    const connection = await getDb();
    const conversation = await connection
      .collection("conversations")
      .findOne({ _id: new ObjectId(conversationId) });
    console.log(conversation);
    const populatedConversation = conversation.messages;
    for (const conversation of populatedConversation) {
      if (conversation.postedById === process.env.CHATBOT_ID) {
        conversation.isUser = "false";
      } else {
        conversation.isUser = "true";
      }
    }
    return populatedConversation;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
