const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { db, ObjectId } = require('../configs/mongodb_config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('../configs/passport_config');
const debug = require('debug')('route-validation');

/* GET home page. */
router.get('/', function (req, res, next) {
  debug('test');
  res.render('layout', { ejsFile: 'index', title: 'Members Only' });
});

router.get('/signup', (req, res, next) => {
  res.render('layout', {
    ejsFile: 'info_form',
    title: 'Sign Up',
    stylesheets: ['form'],
  });
});
router.post('/signup', [
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .custom(async (value) => {
      const existingUser = await db
        .collection('users')
        .findOne({ username: value });
      if (existingUser) {
        throw new Error('Username is taken');
      }
    })
    .bail()
    .isAlphanumeric()
    .withMessage('Username may only contain letters and numbers'),
  body('password')
    .trim()
    .blacklist(/[<>]/)
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least 1 lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(){}[\].?-_+=`]/)
    .withMessage(
      'Password must contain 1 of the following: ! @ # $ % ^ & * ( ) { } [ ] . ? - _ + = `'
    ),
  body('confirmed_password', 'Passwords must match')
    .trim()
    .if((value, { req }) => req.body.password)
    .custom((value, { req }) => req.body.password === value),
  body('email')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is invalid'),
  body('first_name', 'First name is required').trim().escape().notEmpty(),
  body('last_name', 'Last name is required').trim().escape().notEmpty(),
  asyncHandler(async (req, res, next) => {
    const user = User(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('layout', {
        ejsFile: 'info_form',
        title: 'Sign Up',
        stylesheets: ['form'],
        user,
        confirmed_password: req.body.confirmed_password,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
        user.password = hashedPass;
        await db.collection('users').insertOne(user);
      });
      res.redirect('/');
    }
    res.send('NOT IMPLEMENTED: Signup post');
  }),
]);

router.get('/login', (req, res, next) => {
  res.render('layout', {
    ejsFile: 'login',
    title: 'Log In',
    stylesheets: ['form'],
  });
});
router.post('/login', [
  body('username', 'Please fill in username').trim().escape().notEmpty(),
  body('password', 'Please fill in password')
    .trim()
    .blacklist(/[<>]/)
    .notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = User(req.body);
    if (!errors.isEmpty()) {
      res.render('layout', {
        ejsFile: 'login',
        title: 'Log In',
        stylesheets: ['form'],
        user,
        errors: errors.array(),
      });
    } else {
      passport.authenticate('local', (err, userResponse, info) => {
        if (err) {
          return next(err);
        }
        if (!userResponse) {
          return res.render('layout', {
            ejsFile: 'login',
            title: 'Log In',
            stylesheets: ['form'],
            user,
            errors: [{ msg: info.message }],
          });
        }
        req.login(userResponse, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      })(req, res, next);
    }
  }),
]);
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('back');
  });
});

router.get('/profile', (req, res, next) => {
  res.render('layout', {
    ejsFile: 'profile',
    title: 'Profile',
  });
});

router.get('/edit-profile', (req, res, next) => {
  res.render('layout', {
    ejsFile: 'info_form',
    title: 'Update Profile',
    stylesheets: ['form'],
  });
});
router.post('/edit-profile', [
  (req, res, next) => {
    debug('res.locals.currentUser in 1st func.: ', req.user);
    debug(
      'first func: ',
      req.body.username && req.body.username !== req.user.username
    );
    debug('req.body.username: ', req.body.username);
    next();
  },
  body('username')
    .if((value, { req }) => {
      return value && value !== req.user.username;
    })
    .trim()
    .escape()
    .custom(async (value, { req }) => {
      const existingUser = await db
        .collection('users')
        .findOne({ username: value });
      if (existingUser) {
        debug('there is an existing user');
        throw new Error('Username is taken');
      }
    })
    .bail()
    .isAlphanumeric()
    .withMessage('Username may only contain letters and numbers'),
  body('password')
    .if(body('password').notEmpty())
    .trim()
    .blacklist(/[<>]/)
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least 1 lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(){}[\].?-_+=`]/)
    .withMessage(
      'Password must contain 1 of the following: ! @ # $ % ^ & * ( ) { } [ ] . ? - _ + = `'
    ),
  body('confirmed_password', 'Passwords must match')
    .if(body('password').notEmpty())
    .trim()
    .custom((value, { req }) => req.body.password === value),
  body('email')
    .if((value, { req }) => {
      return value && value !== req.user.email;
    })
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email is invalid'),
  body('first_name', 'First name is required')
    .if(body('first_name').notEmpty())
    .trim()
    .escape(),
  body('last_name', 'Last name is required')
    .if(body('last_name').notEmpty())
    .trim()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const user = User(req.user);
    for (let prop in user) {
      if (req.body[prop] && user[prop] !== req.body[prop]) {
        user[prop] = req.body[prop];
      }
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (user.password === res.locals.currentUser.password) {
        user.password = null;
      }
      res.render('layout', {
        ejsFile: 'info_form',
        title: 'Update Profile',
        stylesheets: ['form'],
        user,
        confirmed_password: req.body.confirmed_password,
        errors: errors.array(),
      });
    } else {
      if (user.password && user.password !== req.user.password) {
        bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
          user.password = hashedPass;
          await db
            .collection('users')
            .updateOne({ _id: user._id }, { $set: user });
        });
      } else {
        await db
          .collection('users')
          .updateOne({ _id: user._id }, { $set: user });
      }
      res.redirect('/profile');
    }
  }),
]);

router.get(
  '/join',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Join get');
  })
);
router.post(
  '/join',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Join post');
  })
);

router.get('/post', (req, res, next) => {
  res.send('NOT IMPLEMENTED: Post get');
});
router.get(
  '/post',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Post post');
  })
);

module.exports = router;
