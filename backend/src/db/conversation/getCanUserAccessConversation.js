const getDb = require("../db").getDb;

module.exports = getCanUserAccessConversation = async (
  userId,
  conversationId
) => {
  try {
    const connection = await getDb();
    const conversation = await connection
      .collection("conversations")
      .findOne({ conversationId: conversationId });

    if (conversation == null) return "Data not Found";
    return conversation.memberIds.includes(userId);
  } catch (err) {
    console.log("getCanUserAccessConversation " + err.message);
    throw err;
  }
};
