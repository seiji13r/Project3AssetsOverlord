const express = require('express')
const router = express.Router()
const db = require("../models");
const passport = require('../passport')

router.post(
  '/signup',
  (req, res) => {
    console.log('user signup');

    const { email, username, password, passwdconf } = req.body
    // ADD VALIDATION
    db.User.findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          res.json({
            error: `Sorry, already a user with the email: ${email}`
          })
        }
        else {
          db.User.findOne({ where: { username: username } })
            .then((user) => {
              if (user) {
                res.json({
                  error: `Sorry, already a user with username: ${username}`
                })
              }
              else {
                if (password !== passwdconf) {
                  res.json({
                    error: `Passwords don't match, please verify`
                  })
                }
                db.User.create({
                  username: username,
                  password: password,
                  email: email,
                })
                  .then(userDB => {
                    res.json(userDB);
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                  });
              }
            });
        }
      });
  });

router.post(
  '/login',
  function (req, res, next) {
    console.log('routes/auth.js, login, req.body: ');
    // console.log(req.body)
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user);
    const userInfo = {
      username: req.user.username,
      email: req.user.email
    };
    res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== User!!======')
  // console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'Logging Out' })
  } else {
    res.send({ msg: 'No user to Log Out' })
  }
})


router.put(
  '/user',
  (req, res) => {
    const {
      id,
      company,
      image_link,
      first_name,
      last_name,
      city,
      country,
      about_me
    } = req.body
    // ADD VALIDATION
    db.User.update(
      {
        company,
        image_link,
        first_name,
        last_name,
        city,
        country,
        about_me
      },
      {
        where: {
          id: id
        }
      }
    ).then(function (dbUser) {
      res.json(dbUser);
    });
  });

router.get('/users', (req, res, next) => {
  db.User.findAll({
    attributes: ["email", "username", "first_name", "last_name", "company", "country", "city"]
  })
    .then(users => res.json(users))
    .catch(error => res.json(error));
})


module.exports = router