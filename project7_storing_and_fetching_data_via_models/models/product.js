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
                if (data.length > 0) {
                    products = JSON.parse(data);
                }
                products.push(this);
                // it will write data in json file
                fs.writeFile(dataPath, JSON.stringify(products), (error) => {
                    console.log(error);
                });
            } else {
                console.log("Error Reading File: " + err);
            }
        });
    }

    static fetchAll(cb) {
        // fetch all data from json file
        fs.readFile(dataPath, (err, content) => {
            if (err) {
                return cb([]);
            }
            if (content.length === 0) {
                return cb([]);
            }
            cb(JSON.parse(content));
        });
    }
};
