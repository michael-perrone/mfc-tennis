const express = require("express");
const app = express();
const cors = require("cors");
const connectedDatabase = require("./config/db");
const path = require("path");

app.use(cors());
connectedDatabase();

app.use(express.json({ extended: false }));


app.use("/api/getBookings", require("./routes/api/getBookings"));
app.use("/api/thingBooked", require("./routes/api/thingBooked"));
app.use("/api/usersSignup", require("./routes/api/usersSignup"));
app.use("/api/auth", require("./routes/api/auth"));



app.use(express.static("./client/build"));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;




app.listen(PORT, "0.0.0.0", () => {
  console.log("we here");
});
