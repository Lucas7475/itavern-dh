var express = require("express");
var router = express.Router();

const GruposController = require("../controllers/GruposController");
const uploadCover = require('../middlewares/uploadCover');

/* GET home page. */
router.get("/", GruposController.index);
router.get("/search/", GruposController.search);
router.post('/criargrupo', uploadCover.single('imgGrupo'), GruposController.store);
router.get("/editarGrupos", GruposController.showEdit);


module.exports = router;