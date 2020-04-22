var express = require("express");
var router = express.Router();

const GruposController = require("../controllers/GruposController");

/* GET home page. */
router.get("/", GruposController.index);
router.get("/search/", GruposController.search);
// router.get('/busca', GruposController.search);
// router.get('/grupos/create', PizzasController.create);
// router.post('/pizzas', PizzasController.store);
// router.get('/grupos/:id', PizzasController.show);

// router.post('/pedidos/add', PedidosController.add);

module.exports = router;