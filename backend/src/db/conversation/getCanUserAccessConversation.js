const getConversation = require("./getConversation");

module.exports = getCanUserAccessConversation = async (
  userId,
  conversationId
) => {
  try {
    const conversation = await getConversation(conversationId);
    return conversation.memberIds.includes(userId);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
