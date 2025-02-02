const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const authRoute = require("./Routes/auth.routes");
const bookRoute = require("./Routes/book.routes");
const adminRoute = require('./Routes/admin.routes')
const authorRoute = require('./Routes/author.routes')
const genreRoute = require('./Routes/genre.routes')
const cookieParser = require("cookie-parser");
const connectDB = require("./Model/db");
const clienturl = process.env.CLIENT_URL;

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/book", bookRoute);
app.use('/api/admin',adminRoute)
app.use('/api/author',authorRoute)
app.use('/api/genre',genreRoute)

app.listen(8800, () => {
  console.log("server started on port 8800");
});

connectDB();

app.use(bodyParser.json({ type: "application/*+json" }));

app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

app.use(bodyParser.text({ type: "text/html" }));

module.exports = app;
