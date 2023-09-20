const createConversation = require("../../db/conversation/createConversation");
const { v4 } = require("uuid");

module.exports = createConversationRoute = {
  method: "post",
  path: "/conversations",
  handler: async (req, res) => {
    try {
      const { name, userId, chat, conversationId } = req.body;
      for (const conversation of chat) {
        const newId = v4();
        if (conversation.isUser === "false") {
          conversation.postedById = process.env.CHATBOT_ID;
        } else {
          conversation.postedById = userId;
        }
        conversation.id = newId;
      }
      const newData = chat.map(({ isUser, ...rest }) => rest);
      const insertedId = await createConversation(
        name,
        [process.env.CHATBOT_ID, userId],
        newData,
        conversationId
      );
      res.status(200).json(conversationId);
    } catch (err) {
      console.log("createConversationRoute " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        insertedId: "null",
      });
    }
  },
};
