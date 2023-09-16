const getUserConversations = require("../../db/conversation/getUserConversations");

module.exports = getUserConversationsRoute = {
  method: "get",
  path: "/users/:id/conversations",
  handler: async (req, res) => {
    try {
      const { id: userId } = req.params;
      if (req.body.user !== userId) {
        return res.status(403).json({
          message: "Users are only allowed to access their own conversations",
        });
      }
      const conversations = await getUserConversations(userId);
      res.status(200).json(conversations);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: "Server Error!",
        message: [],
      });
    }
  },
};
