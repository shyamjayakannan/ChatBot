const getDb = require("../db").getDb;

module.exports = createConversation = async (name, memberIds, newData) => {
  try {
    const connection = await getDb();
    const { insertedId } = await connection
      .collection("conversations")
      .insertOne({ name: name, memberIds: memberIds, messages: newData });
    return insertedId;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
