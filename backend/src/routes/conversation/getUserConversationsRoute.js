const getUserConversations = require("../../db/conversation/getUserConversations");
const getDb = require("../../db/db").getDb;

module.exports = getUserConversationsRoute = {
  method: "get",
  path: "/users/:id/conversations",
  handler: async (req, res) => {
    try {
      const { id: userId } = req.params;
      const connection = await getDb();
      const user = await connection.collection("users").findOne({ id: userId });

      if (req.headers.authorization !== user.token) {
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
