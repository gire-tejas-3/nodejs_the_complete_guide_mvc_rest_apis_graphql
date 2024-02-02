const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const productRoutes = require("./routes/product");
const homeRoutes = require("./routes/home");

// imported controller function for 404
const error = require('./controllers/error');

dotenv.config();
const app = express();

app.engine("handlebars", engine({ defaultLayout: false }));
app.set("view engine", ["pug", "ejs", "handlebars"]);
app.set("views", __dirname + "/views");

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/product", productRoutes.router);
app.use(homeRoutes);

// middleware for 404 or Page not found
app.use(error.get404);

app.listen(port, hostname, () => {
    console.log(`App is running on port ${port}`);
});
