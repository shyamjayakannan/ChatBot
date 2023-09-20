const getUserConversations = require("../../db/conversation/getUserConversations");
const getToken = require("../../db/conversation/getUserToken");

module.exports = getUserConversationsRoute = {
  method: "get",
  path: "/users/:id/conversations",
  handler: async (req, res) => {
    try {
      const { id: userId } = req.params;
      const token = await getToken(userId);

      if (req.headers.authorization !== token) {
        return res.status(403).json([
          {
            id: "null",
            name: "Users are only allowed to access conversations",
          },
        ]);
      }
      const conversations = await getUserConversations(userId);
      res.status(200).json(conversations);
    } catch (err) {
      console.log("getUserConversationsRoute " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        message: [],
      });
    }
  },
};
