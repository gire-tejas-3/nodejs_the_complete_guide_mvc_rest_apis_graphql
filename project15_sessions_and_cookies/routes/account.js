const express = require('express');
const User = require('../model/user');
const Designation = require('../model/designation');
const Departments = require('../model/departments');

const router = express.Router();

router
	.route('/')
	.get((req, res, next) => {
		const user = req.user || req.locals.user;

		Promise.all([
			User.findById({ _id: user._id }),
			Designation.find(),
			Departments.find(),
		])
			.then(([accounts, designations, departments]) => {
				res.render('update', {
					title: 'Update Profile',
					user,
					accounts,
					designations,
					departments,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	})
	.post((req, res, next) => {
		const user = req.user || req.locals.user;
		const {
			firstname,
			middlename,
			lastname,
			contact,
			role,
			gender,
			dateOfBirth,
			department,
			designation,
			isActive,
			profileImage,
		} = req.body;

		User.findByIdAndUpdate(
			{ _id: user._id },
			{
				firstname: firstname,
				middlename: middlename,
				lastname: lastname,
				contact: contact,
				gender: gender,
				dateOfBirth: dateOfBirth,
				department: department,
				designation: designation,
				isActive: isActive,
				profileImage: profileImage,
			},
		)
			.then((result) => {
				console.log('Your Account Updated!');
				return res.redirect('/');
			})
			.catch((error) => {
				console.log(error);
			});
	});

router
	.route('/password')
	.get((req, res, next) => {
		const user = req.user || req.locals.user;
		res.render('update_password', { title: 'Update Passwords', user });
	})
	.post((req, res, next) => {
		const { oldPassword, newPassword, confirmPassword } = req.body;
		const user = req.user || req.locals.user;

		User.findById(user._id).then((result) => {
			if (oldPassword !== result.password) {
				console.log('Please Enter Correct Password');
				return res.redirect('/account/password');
			}

            if (newPassword === result.password) {
				console.log('New Password should differnt from old password');
				return res.redirect('/account/password');
			}

			if (
				!newPassword.match(
					/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,16}$/,
				)
			) {
				console.log(
					`Password Should Contain At least one digit, At least one lowercase letter, 
                at least one uppercase letter, at least one special character, not less than 
                8 characters and not exceed 16 characters`,
				);
				return res.redirect('/account/password');
			}

            if(confirmPassword !== newPassword){
                console.log("New Password should Match with Confirm Password");
                return res.redirect('/account/password');
            }

            result.updateOne({
                password: newPassword
            }).then(()=>{
                console.log("Password Updated!!");
                return res.redirect('/')
            })
		});
	});

module.exports = router;
