const getDb = require("../db").getDb;

module.exports = createConversation = async (
  name,
  memberIds,
  newData,
  conversationId
) => {
  try {
    const connection = await getDb();
    const { insertedId } = await connection
      .collection("conversations")
      .insertOne({
        name: name,
        memberIds: memberIds,
        messages: newData,
        conversationId: conversationId,
      });
    return insertedId;
  } catch (err) {
    console.log("createConversation " + err.message);
    throw err;
  }
};
