/** @format */

const app = require("./index");

const connect = require("./configs/db");

app.listen(8000, async () => {
  try {
    await connect();
  } catch (error) {
    console.log("error: ", error);
  }

  console.log("Listening to port 8000");
});
