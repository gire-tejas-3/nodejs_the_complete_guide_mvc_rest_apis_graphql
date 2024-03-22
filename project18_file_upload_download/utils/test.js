const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Define department and designation OIDs
const departmentOids = [
	'65dded04d10d91eea430cb5c',
	'65dded9be1960cfc311fc514',
	'65ddeda8e1960cfc311fc51c',
	'65eaaa1b058aa59e1fd61512',
	'65f840e01ef5c5457e690e33',
];

const designationOids = [
	'65dded16d10d91eea430cb64',
	'65ddedb4e1960cfc311fc524',
	'65ddedd2e1960cfc311fc52d',
	'65eaab39058aa59e1fd6152b',
	'65eaab5c058aa59e1fd61534',
	'65eaab7a058aa59e1fd6153d',
	'65f7cacdc5ac04d125a63865',
];

const generateUsers = () => {
	let users = [];

	for (let i = 0; i < 100; i++) {
		let firstname = faker.person.firstName(),
			middlename = faker.person.firstName(),
			lastname = faker.person.lastName();

		const user = {
			firstname,
			middlename,
			lastname,
			email: `${firstname}${lastname}@gmail.com`,
			username: `${firstname.toLowerCase()}_${lastname.toLowerCase()}`,
			contact: faker.string.numeric(10),
			password: faker.internet.password(),
			role: faker.helpers.arrayElement(['user', 'admin']),
			gender: faker.helpers.arrayElement(['male', 'female']),
			dateOfBirth: faker.date.birthdate(),
			department: faker.helpers.arrayElement(departmentOids),
			designation: faker.helpers.arrayElement(designationOids),
			isVerified: faker.datatype.boolean(),
			isActive: faker.datatype.boolean(),
			__v: 0,
			profileImage: {
				filename:
					faker.system.fileName({ extensionCount: 0 }) +
					faker.helpers.arrayElement(['.png', '.jpg', '.jpeg']),
				mimetype: 'image/jpeg',
			},
			resume: {
				filename:
					faker.system.fileName({ extensionCount: 0 }) +
					faker.helpers.arrayElement(['.pdf']),
				mimetype: 'application/pdf',
			},
		};
		users.push(user);
	}

	return users;
};

const users = generateUsers();

fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
	if (err) {
		console.error('Error writing users.json:', err);
	} else {
		console.log('users.json generated successfully.');
	}
});

// exports.postAddUsers = async (req, res) => {
// 	const { _csrf, recaptchaToken } = req.body;

// 	const csrfVerified = verifyCsrfToken(_csrf);
// 	if (!csrfVerified) {
// 		return res.status(400).json({ error: 'CSRF Validation Failed' });
// 	}

// 	try {
// 		const usersData = fs.readFileSync('users.json');
// 		const users = JSON.parse(usersData);

// 		for (const userData of users) {
// 			const {
// 				firstname,
// 				middlename,
// 				lastname,
// 				contact,
// 				email,
// 				username,
// 				password,
// 				role,
// 				gender,
// 				dateOfBirth,
// 				department,
// 				designation,
// 				isActive,
// 				profileImage,
// 				resume,
// 			} = userData;

// 			const existingUser = await User.findOne({ username, email });

// 			if (existingUser) {
// 				continue; // Skip insertion if user already exists
// 			}

// 			const newUser = new User({
// 				firstname,
// 				middlename,
// 				lastname,
// 				contact,
// 				email,
// 				username,
// 				password,
// 				role,
// 				gender,
// 				dateOfBirth,
// 				department,
// 				designation,
// 				isActive,
// 				profileImage,
// 				resume,
// 			});

// 			await newUser.save();

// 			// const token = new Token({
// 			//   userId: newUser._id,
// 			//   token: crypto.randomBytes(18).toString('hex'),
// 			// });

// 			// await token.save();

// 			// const subject = `Confirm Your Email Address`;

// 			// const html = {
// 			//   subject,
// 			//   content: 'Please verify your account with following link: ',
// 			//   link: `${req.protocol}://${req.get('host')}/verify/${newUser._id}/${token.token}`,
// 			//   button: 'Verify',
// 			// };

// 			// await sendMail(email, subject, html);
// 		}

// 		return res.status(200).json({ message: 'New Users Created!' });
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).json({ error: 'Internal Server Error' });
// 	}
// };
