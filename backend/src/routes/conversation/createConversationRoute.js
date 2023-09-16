const createConversation = require("../../db/conversation/createConversation");

module.exports = createConversationRoute = {
  method: "post",
  path: "/conversations",
  handler: async (req, res) => {
    try {
      const { name, memberIds, userId } = req.body;
      const insertedId = await createConversation(name, [...memberIds, userId]);
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
