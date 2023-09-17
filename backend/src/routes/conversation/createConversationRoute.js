const createConversation = require("../../db/conversation/createConversation");
const ObjectId = require("mongodb").ObjectId;

module.exports = createConversationRoute = {
  method: "post",
  path: "/conversations",
  handler: async (req, res) => {
    try {
      const { name, userId, chat } = req.body;
      for (const conversation of chat) {
        const newId = new ObjectId();
        if (conversation.isUser === "false") {
          conversation.postedById = process.env.CHATBOT_ID;
        } else {
          conversation.postedById = userId;
        }
        conversation._id = newId;
      }
      const newData = chat.map(({ isUser, ...rest }) => rest);
      const insertedId = await createConversation(
        name,
        [process.env.CHATBOT_ID, userId],
        newData
      );
      res.status(200).json(insertedId);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: "Server Error!",
        insertedId: "null",
      });
    }
  },
};
