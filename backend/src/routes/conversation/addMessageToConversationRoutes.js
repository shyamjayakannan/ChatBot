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
      const text = req.body;
      if (userIsAuthorized) {
        await addMessageToConversation(text, userId, conversationId);
        const updatedConversation = await getConversation(conversationId);
        res.status(200).json({ messages: updatedConversation.messages });
      } else {
        res.status(400).json({ error: "You are Authorized!" });
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
