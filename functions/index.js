const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require('./util/fbAuth');

var serviceAccount = require("./serviceAccountKey.json");

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
// users route
app.post('/signup', signup);
app.post('/login', login);


// https://baseurl.com/api/
// exports functionality below provided by express
exports.api = functions.region("asia-east2").https.onRequest(app);
