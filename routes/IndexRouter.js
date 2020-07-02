var express = require("express");
var verificaUsuarioLogado = require('../middlewares/VerificaUsuarioLogado');
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);
router.get("/home", verificaUsuarioLogado, IndexController.home);
router.get("/perfil", verificaUsuarioLogado, IndexController.perfil);
router.get("/grupos", verificaUsuarioLogado, IndexController.chat);
router.get("/sair", verificaUsuarioLogado, IndexController.sair);
router.get("/info/:id", verificaUsuarioLogado, IndexController.info)
router.get("/notificacoes/:id", verificaUsuarioLogado, IndexController.pedidos);
router.post('/mudaStatus', verificaUsuarioLogado, IndexController.mudaStatus);

module.exports = router;