const axios = require("axios");

module.exports = {
  getInventory: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_inventory()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => res.status(404).send(err));
  },
  createProduct: (req, res) => {
    const dbInstance = req.app.get("db");
    let { name, price, img } = req.body;
    dbInstance
      .create_product([name, price, img])
      .then(result => {
        res.status(200).send(result[0]);
      })
      .catch(err => res.status(404).send(err));
  },
  deleteInventory: (req, res) => {
    const dbInstance = req.app.get("db");
    let { id } = req.params;
    dbInstance
      .delete_inventory([id])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => res.status(404).send(err));
  },
  editProduct: (req, res) => {
    const dbInstance = req.app.get("db");
    let { id } = req.params;
    let { name, price, img } = req.body;
    console.log(req.params.id);
    dbInstance
      .update_product([name, price, img, id])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => res.status(404).send(err));
  }
};
