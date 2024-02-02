const fs = require("fs");
const path = require("path");

const dataPath = path.join(
    path.dirname(require.main.filename), //process.mainModule is depricated , instead use require.main
    "data",
    "products.json"
);
module.exports = class Product {
    constructor(product) {
        this.product = product;
    }

    save() {
        let products = [];
        fs.readFile(dataPath, (err, data) => {
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            // it will write data in json file
            fs.writeFile(dataPath, JSON.stringify(products), (error) => {
                console.log(error);
            });
        });
    }

    static fetchAll(cb) {
        // fetch all data from json file
        fs.readFile(dataPath, (err, content) => {
            if (err) {
                return cb([]);
            }
            cb(JSON.parse(content));
        });
    }
};
