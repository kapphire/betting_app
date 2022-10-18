const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/event/basic-data",
    controller.fetchAllBasicData
  );

  app.post(
    "/api/event/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createEvent
  );

  app.put(
    "/api/event/:eventId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.resolveEvent
  );

  app.get(
    "/api/event/resolve-all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.resolveAllEvents
  );
};