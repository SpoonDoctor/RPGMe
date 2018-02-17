"use strict";
/*Setup the server and initialize the main handler for group me*/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const groupMeHandler = require("./routes/groupMeHandler");
/*Use json to parse the body*/
app.use(bodyParser.json());
/*Use your groupme handler for the server route*/
app.use("/", groupMeHandler);
/*Start listening on server*/
app.listen(3000, "0.0.0.0", function() {
    console.log("Example app listening on port 3000!");
});