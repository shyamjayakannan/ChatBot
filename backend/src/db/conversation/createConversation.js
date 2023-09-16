const getDb = require("../db").getDb;

module.exports = createConversation = async (name, memberIds) => {
  try {
    const connection = await getDb();
    const { insertedId } = await connection
      .collection("conversations")
      .insertOne({ name, memberIds, messages: [] });
    return insertedId;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
