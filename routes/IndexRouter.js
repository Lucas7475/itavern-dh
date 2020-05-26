var express = require("express");
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);
router.get("/home", IndexController.home);
router.get("/perfil", IndexController.perfil);

module.exports = router;