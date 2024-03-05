const moment = require('moment');
const Departments = require('../../model/departments');
const Designations = require('../../model/designation');

// Department Contollers
exports.getAllDepartments = (req, res, next) => {
	const user = req.user || req.locals.user;
	Departments.find()
		.then((result) => {
			res.render('manage_department', {
				title: 'Department',
				user,
				moment,
				departments: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateDepartment = (req, res, next) => {
	const id = req.params.id;
	const { departmentName, departmentAbbr } = req.body;
	const lastUpdated = Date.now();

	Departments.findByIdAndUpdate(id, {
		departmentName: departmentName,
		departmentAbbr: departmentAbbr,
		updatedAt: lastUpdated,
	})
		.then((result) => {
			console.log('Department Updated!');
			return res.redirect('/department');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.deleteDepartment = (req, res, next) => {
	const id = req.params.id;
	Departments.findByIdAndDelete(id)
		.then((result) => {
			console.log('Department Deleted!');
			return res.redirect('/department');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getAddDepartments = (req, res, next) => {
	const user = req.user || req.locals.user;
	Designations.find()
		.then((result) => {
			res.render('add_department', {
				title: 'Add Department',
				user,
				designations: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.postAddDepartments = (req, res, next) => {
	const { designation ,departmentAbbr, departmentName } = req.body;
	Departments.findOne({ departmentName })
		.then((result) => {
			if (result) {
				console.log(`${departmentName} is Already Registered`);
				return res.redirect('/department/add');
			}

			const department = new Departments({
				designations: designation,
				departmentName: departmentName,
				departmentAbbr: departmentAbbr,
			});
			department
				.save()
				.then((reslt) => {
					console.log('Department Added Successfully!');
					return res.redirect('/department');
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
};
