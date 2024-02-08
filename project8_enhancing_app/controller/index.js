exports.getHome = (req, res, next) => {
    const isAuthenticated =  req.session.isAuthenticated || false;
    if(isAuthenticated){
        res.render('index', {title: 'Home'});
        return;
    }
    res.redirect('/login');
};

