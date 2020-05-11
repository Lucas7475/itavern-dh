var express = require("express");
var router = express.Router();

const CadastroController = require('../controllers/CadastroController');

//recebe os dados via post do modal de cadastro
router.post("/submit", CadastroController.storage);

module.exports = router;
