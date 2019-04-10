/* create a search controller that will also filter swag by category. The current categories are: hats, shirts, jackets, sweaters, pants, and shorts. */
const swag = require('../models/swag');

/* export an object that has a method called search. The method should capture req and res as parameters. */
module.exports = {
  search: (req, res) => {
    const { category } = req.query;
    if (!category) {
      res.status(200).send(swag);
    } else {
      const filteredSwag = swag.filter(swag => swag.category === category);
      res.status(200).send(filteredSwag);
    }
  }
};
