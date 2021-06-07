require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./User');
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const app = express();

const corsOptions = {
	origin: true,
	credentials: true,
	allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
};
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

mongoose.connect(
	MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log('MongoDB connected...');
	}
);
app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true
	})
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) throw err;
		if (!user) res.send({ msg: 'Not authorized' });
		else {
			req.login(user, (err) => {
				if (err) throw err;
				res.send({ msg: 'Success', id: user._id });
			});
		}
	})(req, res, next);
});

app.post('/register', (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send({ msg: 'User already exists' });
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				username: req.body.username,
				password: hashedPassword
			});
			await newUser.save();
			res.send({ msg: 'User created' });
		}
	});
});

app.get('/user', (req, res) => {
	if (!req.user) {
		res.send({ msg: 'Not authorized' });
	}
	if (req.user) {
		res.send({ user: req.user.username });
	}
});

app.get('/logout', function (req, res) {
	req.logout();
	res.send({ msg: 'Logged out' });
});
