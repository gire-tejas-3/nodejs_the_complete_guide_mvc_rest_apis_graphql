exports.get404 = (req, res, next) => {
    res.render("404.ejs", { title: "Page Not Found" });
};
