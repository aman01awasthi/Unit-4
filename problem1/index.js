const express = require("express");
const app = express();

app.get("/home", (req, res) => {
    res.send("hello");
})

app.listen(4000, () => {
    console.log("listing on port no 4000");
})