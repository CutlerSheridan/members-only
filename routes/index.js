const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { db, ObjectId } = require('../configs/mongodb_config');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', { ejsFile: 'index', title: 'Members Only' });
});

router.get(
  '/signup',
  asyncHandler(async (req, res, next) => {
    res.render('layout', {
      ejsFile: 'info_form',
      title: 'Sign Up',
      stylesheets: ['form'],
    });
  })
);
router.post(
  '/signup',
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    res.send('NOT IMPLEMENTED: Signup post');
  })
);

router.get('/login', (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login get');
});
router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Login post');
  })
);
router.get('/logout', (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logout get');
});

router.get(
  '/profile',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Profile get');
  })
);

router.get(
  '/update-user',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Update get');
  })
);
router.post(
  '/update-user',
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Update post');
  })
);

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
