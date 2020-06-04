var express = require("express");
var verificaUsuarioLogado = require('../middlewares/VerificaUsuarioLogado');
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);
router.get("/home", verificaUsuarioLogado, IndexController.home);
router.get("/perfil", verificaUsuarioLogado, IndexController.perfil);
router.get("/grupos", verificaUsuarioLogado, IndexController.chat);

module.exports = router;