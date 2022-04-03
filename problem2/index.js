const express = require("express");
const app = express();

app.get("/books", (req, res) => {
    res.send({ commics :"commics", horror :"horror", detective :"detective", literature: "literature"});
})

app.listen(4001, () => {
    console.log("listing on port 4001");
})