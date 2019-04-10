/* At the top of the file require users from models/users.
This is where the users are kept after registering.
A user object looks like: { id: integer, username: string, password: string } */

/* This authController will be responsible for logging in users, registering users, signing out users, and also retrieving user information. */

/* Since we'll be working with users, we'll need to require the user.js file from server/models/users.js. This javascript file exports an array of all the users. */
const users = require('../models/users');
/* We'll also need to create a global id variable. We'll use this variable to assign ids to newly registered users and then increment it by one so no users have the same id. */
let id = 1;

/* Now, let's export an object with a login, register, signout, and getUser method. Each method should capture req and res as parameters. */
module.exports = {
  /* The register method should just push an object with an id, username, and password to the users array. */
  register: (req, res) => {
    const { session } = req;
    /* This method should look for a username and password on the request body and then create a user object. It should use the global id variable for the id */
    const { username, password } = req.body;

    /* After pushing the new user object to the users array it should increment the value of id by one so we can keep the value of id unique.  */
    users.push({ id, username, password });
    id++;

    /* then set the value of username on the request session's user object to the value of username from the request body */
    session.user.username = username;

    /* Finally the method should return the updated user object with a status of 200. */
    res.status(200).send(session.user);
  },

  /* This method should use username and password from the request body to find a user object in the users array with the same user/pass combination. If it finds a user with that combination, it should update the value of username on the request session's user object to value of username from the request body. It should then send a status of 200 with the updated user object. If it doesn't find a user it should send a status of 500. */

  /* Export an object with a login, register, signout, and getUser method.
  All methods should capture req and res as parameters. */
  login: (req, res) => {
    const { session } = req;

    /* Should look on the request body for a username and password */
    const { username, password } = req.body;

    /* Should check to see if a user from the users array matches that user/pass combination. */
    const user = users.find(
      user => user.username === username && user.password === password
    );

    /* If the method finds a user:
    Update the value of username to the user's username on the request session's user object.
    Return a status of 200 with the request session's user object. */
    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      /* If the method doesn't find a user:
      Return a status of 500. */
      res.status(500).send('Unauthorized.');
    }
  },

  /* This method is responsible for destroying the session and returning the session */
  /* signout should destroy the session using req.session.destroy() and then return the req.session object. */
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  /* Finally, let's focus on the getUser method. This method is responsible for reading the user object off of session and return it with a status of 200. */
  /* getUser should simply send a status of 200 along with the request session's user object. */
  getUser: (req, res) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
