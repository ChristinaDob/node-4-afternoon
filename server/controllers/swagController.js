/* This controller will be responsible for sending the complete array of swag. Let's require the swag model from server/models/swag.js. swag.js is just a JavaScript file that exports an array of swag objects. */

const swag = require('../models/swag');

/* Now that we have access to the swag array, let's use module.exports to export an object with a read method. This method should capture req and res as parameters. We'll then use res to send a status of 200 and the entire swag array. */

module.exports = {
  read: (req, res, next) => {
    res.status(200).send(swag);
  }
};
