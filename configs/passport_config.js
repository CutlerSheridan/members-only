const LocalStrategy = require('passport-local').Strategy;
const { db, ObjectId } = require('./mongodb_config');
const passport = require('passport');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.collection('users').findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Username does not exist' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
