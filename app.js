const express = require("express");
const path = require("path");
const app = express();
const favicon = require("serve-favicon");
const port = process.env.PORT || 5000;
const mountRoutes = require("./routes");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "public/images", "favicon.ico")));

//Routes
mountRoutes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
