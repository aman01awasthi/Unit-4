const express = require("express");
const app = express();

app.use(allBooks);

app.get("/books", (req, res) => {
    return res.send ("Fetching all books");
    // console.log("Fetching all books");
})

function allBooks(req, res, next) {
    // console.log("before");
    next();
}
app.listen(5000, () => {
    console.log("listening on 5000");
})