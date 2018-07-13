const axios = require("axios");

module.exports = {
  getInventory: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance.get_inventory().then(result => {
      res.status(200).send(result);
    });
  },
  createProduct: (req, res) => {
    const dbInstance = req.app.get("db");
    let { name, price, img } = req.body;
    dbInstance.create_product([name, price, img]).then(result => {
      res.status(200).send(result[0]);
    });
  },
  deleteInventory: (req, res) => {
    const dbInstance = req.app.get("db");
    let { id } = req.params;
    dbInstance.delete_inventory([id]).then(result => {
      res.status(200).send(result);
    });
  },
  editProduct: (req, res) => {
    const dbInstance = req.app.get("db");
    let { name, price, img, id } = req.params;
    dbInstance.update_product([name, price, img, id]).then(result => {
      res.status(200).send(result);
    });
  }
};
