require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

/* Create a variable called app and set it equal to express invoked.*/
const app = express();

/* Destructure SERVER_PORT and SESSION_SECRET from process.env. */
const { SERVER_PORT, SESSION_SECRET } = process.env;

/* add middleware to the app. Let's add express.json so we can read JSON from the request body and add session so we can create sessions.  */
app.use(express.json());

/* Remember that session needs a configuration object as the first argument. The object should have a secret, resave, and saveUninitialized property.  */
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

/* Use app.use to add checkForSession.
NOTE: When we use our own simple middleware, we don't invoke the function inside of app.use. Pre-built middlewares like express.json are invoked because that is the way the author of the middleware designed it. */
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

/* create endpoints to hit every method on the controller. */
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

app.get('/api/swag', swagController.read);

app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);

app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
