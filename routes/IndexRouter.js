var express = require("express");
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);
router.get("/home", IndexController.home);

module.exports = router;