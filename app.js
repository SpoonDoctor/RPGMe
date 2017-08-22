"use strict";
const express = require("express");
const app = express();
// const ip = require("ip");
const bodyParser = require("body-parser");
const groupMeHandler = require("./routes/groupMeHandler");

app.use(bodyParser.json());
app.use("/", groupMeHandler);
// app.get("/", (req, res) =>
// {
//   res.send("Hello World!");
// });

// app.post("/", function(req, res)
//     {
//       res.status(200).send();
//       console.log(req.body);
// });
app.listen(3000, "0.0.0.0", function()
{
  console.log("Example app listening on port 3000!");
});