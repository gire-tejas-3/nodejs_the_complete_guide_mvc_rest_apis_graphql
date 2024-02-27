exports.getDashboard = (req, res, next) => {
	const user = req.user || req.locals.user;
	res.render('admin', { title: 'Home', user });
}