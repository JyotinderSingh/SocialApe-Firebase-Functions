const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

var serviceAccount = require("./serviceAccountKey.json");

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  unlikeScream,
  likeScream
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require("./handlers/users");

// Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
// TODO: delete scream
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);

// users route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

// https://baseurl.com/api/
// exports functionality below provided by express
exports.api = functions.region("asia-east2").https.onRequest(app);
