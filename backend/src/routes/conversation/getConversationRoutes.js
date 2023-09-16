const getConversation = require("../../db/conversation/getConversation");

module.exports = getConversationRoutes = {
  method: "get",
  path: "/conversations/:conversationId",
  handler: async (req, res) => {
    try {
      const { conversationId } = req.params;
      const conversation = await getConversation(conversationId);
      res.status(200).json({
        conversation,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: "Server Error!",
        conversation: [],
      });
    }
  },
};
