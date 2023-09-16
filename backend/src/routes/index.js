const insertSignInRoute = require("../routes/authentication/insertSignInRoute");
const insertVerifyRoute = require("../routes/authentication/insertVerifyRoute");
const insertSignUpRoute = require("../routes/authentication/insertSignUpRoute");
const getUserConversationsRoute = require("./conversation/getUserConversationsRoute");
const getAllUsersRoute = require("./conversation/getAllUsersRoute");
const createConversationRoute = require("./conversation/createConversationRoute");
const addMessageToConversationRoutes = require("./conversation/addMessageToConversationRoutes");
const getConversationRoutes = require("./conversation/getConversationRoutes");

module.exports = routes = [
  insertSignInRoute,
  insertVerifyRoute,
  insertSignUpRoute,
  getUserConversationsRoute,
  getAllUsersRoute,
  createConversationRoute,
  addMessageToConversationRoutes,
  getConversationRoutes,
];
