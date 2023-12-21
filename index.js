require("dotenv").config();
const app = require("./server");
const mongoose = require("mongoose");
//connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
