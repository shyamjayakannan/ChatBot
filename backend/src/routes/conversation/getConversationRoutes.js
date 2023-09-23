const getConversation = require("../../db/conversation/getConversation");
const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");
const getToken = require("../../db/conversation/getUserToken");

module.exports = getConversationRoutes = {
  method: "get",
  path: "/getconversations/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { conversationId, userId } = req.params;
      const token = await getToken(userId);

      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );

      if (userIsAuthorized == "Data not Found") {
        return res.status(404).json({
          conversation: [
            {
              text: userIsAuthorized,
              isimage: "false",
              postedById: process.env.CHATBOT_ID,
              isUser: "false",
            },
          ],
        });
      }
      if (!userIsAuthorized || req.headers.authorization !== token) {
        return res.status(403).json({
          conversation: [
            {
              text: "You are not Authorized!",
              isimage: "false",
              postedById: process.env.CHATBOT_ID,
              isUser: "false",
            },
          ],
        });
      }

      const response = await getConversation(conversationId);

      res.status(200).json({
        conversation: response.populatedConversation,
        messageHistroy: response.messageHistroy,
      });
    } catch (err) {
      console.log("getConversationRoutes " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        conversation: [],
      });
    }
  },
};
