const getDb = require("../db").getDb;
const ObjectId = require("mongodb").ObjectId;
const getUser = require("./getUser");

module.exports = getConversation = async (conversationId) => {
  try {
    const connection = await getDb();

    // All data of conversation in the database
    const conversation = await connection
      .collection("conversations")
      .findOne({ _id: new ObjectId(conversationId) });

    // Data of the member who is present in this gropup
    const members = await Promise.all(
      conversation.memberIds.map((id) => getUser(id))
    );

    // Data of the users who had sent message in this group
    const usersForMessages = await Promise.all(
      conversation.messages.map((message) => getUser(message.postedById))
    );

    // combine the data of members and usersForMessages one by one in the form of object
    const populatedMessages = conversation.messages.map((message, i) => ({
      ...message,
      postedBy: usersForMessages[i],
    }));

    // combining the data of conversation complete , members present in this group and populatedMessages
    const populatedConversation = {
      ...conversation,
      members,
      messages: populatedMessages,
    };

    return populatedConversation;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
