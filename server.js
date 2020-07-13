const express  = require("express");
// const path     = require("path");

const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const PORT     = process.env.PORT || 3002;
const app      = express();

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Routes
require("./routes/htmlRoutes")(app)

const userRouter = require('./routes/User');
app.use('/user', userRouter);
app.use(cookieParser());
// Connect to the Mongo DB
mongoose.connect('mongodb://localhost:27017/mernauth', {userNewUrlParser : true, useUnifiedTopology : true }, ()=>{
console.log("connected successfuly to database")
});

// mongoose.connect(process.env.MONGODB_URI || "mongodb://alphateam:password123@ds029496.mlab.com:29496/heroku_mnws26x7", {
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/togather", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });
const idConnection = mongoose.connection;
idConnection.on('error', () => console.log("ERROR"));
idConnection.on('open', () => console.log("SUCCESS"));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on: http://localhost:${PORT}/`);
});
