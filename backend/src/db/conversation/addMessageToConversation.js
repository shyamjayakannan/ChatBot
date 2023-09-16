const getDb = require("../db").getDb;
const ObjectId = require("mongodb").ObjectId;

module.exports = addMessageToConversation = async (
  messageText,
  userId,
  conversationId,
  isimage
) => {
  try {
    const newId = new ObjectId();
    const newMessage = {
      _id: newId,
      text: messageText,
      postedById: userId,
      isimage: isimage,
    };
    const connection = await getDb();
    await connection.collection("conversations").updateOne(
      { _id: new ObjectId(conversationId) },
      {
        $push: { messages: newMessage },
      }
    );
    return "ok";
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
