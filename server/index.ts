/*********************************

    Global Configurations

 *********************************/

import path from "path";

require('dotenv').config();

/*********************************

    Server utilities

 *********************************/

const express = require("express");
const app = express();

// middleware for assets, ...
app.use(express.static(path.join(__dirname, "..", "build")));

/*********************************

    Routes

 *********************************/

require('./routes')(app);

/*********************************

    Run server

 *********************************/

app.listen("3000", () => {
    console.log(process.env.REACT_APP_FALLBACK_RPC_URL)
    console.log("Listening on port 3000");
})
