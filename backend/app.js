const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./routes");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//routes
app.use(routes);


//Global Error Handler
app.use((err, req, res, next) =>{
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred"
  const status = err.status ? err.status : 500
  
  res.status(status).json({
    message
  })
})


module.exports = app;
