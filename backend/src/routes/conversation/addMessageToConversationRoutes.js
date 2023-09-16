const addMessageToConversation = require("../../db/conversation/addMessageToConversation");
const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");
const getConversation = require("../../db/conversation/getConversation");

module.exports = addMessageToConversationRoutes = {
  method: "post",
  path: "/conversations/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { userId, conversationId } = req.params;
      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );
      const { text } = req.body;

      var id = "";
      var message = text.text;
      if (text.isUser == "false") id = process.env.CHATBOT_ID;
      else id = userId;
      const isimage = text.isimage;

      if (userIsAuthorized) {
        await addMessageToConversation(message, id, conversationId, isimage);
        const updatedConversation = await getConversation(conversationId);
        res.status(200).json({ updatedConversation });
      } else {
        res
          .status(400)
          .json({ error: "You are Authorized!", conversation: [] });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: "Server Error!",
        messages: [],
      });
    }
  },
};
