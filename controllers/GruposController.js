const grupos = require("../database/grupos.json");

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
      grupos
    });
  },
};