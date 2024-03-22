const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../model/user');

dotenv.config();

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ $or: [{ username: username }, { email: username }] })
			.then((result) => {
				if (!result) {
					return done(null, false);
				}

				bcrypt
					.compare(password, result.password)
					.then((isVerified) => {
						if (!isVerified) {
							return done(null, false);
						}

						return done(null, result);
					})
					.catch((errs) => {
						console.log(errs);
						return done(errs);
					});
			})
			.catch((error) => {
				console.log(error);
				return done(err);
			});
	}),
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3030/google/callback',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOne({ email: profile.email })
				.then((result) => {
					if (result) {
						result.googleId = profile.id;
						result
							.save()
							.then(() => {
								request.session.isLoggedIn = true;
								request.session.user = result;
								request.toastr.success('Logged In!');
								return done(null, result);
							})
							.catch((err) => {
								console.log(err);
								return done(err);
							});
					} else {
						const user = new User({
							googleId: profile.id,
							firstname: profile.given_name,
							middlename: profile.middle_name || '',
							lastname: profile.family_name,
							email: profile.email,
							username: profile.email,
							isVerified: profile.email_verified,
							profileImage: profile.picture,
							gender: profile.gender,
						});

						user.save()
							.then((_result) => {
								request.session.isLoggedIn = true;
								request.session.user = _result;
								return done(null, _result);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
	),
);

passport.serializeUser(function (user, done) {
	process.nextTick(() => {
		return done(null, user);
	});
});

passport.deserializeUser(function (user, done) {
	process.nextTick(() => {
		return done(null, user);
	});
});

module.exports = passport;
