const getDb = require("../db").getDb;
const ObjectId = require("mongodb").ObjectId;

module.exports = getCanUserAccessConversation = async (
  userId,
  conversationId
) => {
  try {
    const connection = await getDb();
    const conversation = await connection
      .collection("conversations")
      .findOne({ _id: new ObjectId(conversationId) });

    if (conversation == null) return "Data not Found";
    return conversation.memberIds.includes(userId);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
