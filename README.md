# Members Only

## A message board with varying degrees of accessibility depending on if user is signed in, a club member, and/or an admin

Post messages. If you're not signed in, you can view messages, but not who posted them. If you are signed in and a club member, you can see who posted them. If you're an admin, you can delete them, too.

Made using Node, Express, MongoDB, Passport, bcryptjs, EJS, HTML, CSS.

#### TODO NEXT

- write update-user logic

#### TODO LATER

##### Features

- write profile form
- write profile logic
- write join form
- write join logic
- write post form
- write post logic
- write post_card component
- write home feed logic

##### Behavior

- add indices to db for:
  - users: {username: 1}
    - passport_config.js in LocalStrategy
    - post('/signup') body('username').custom()
    - post('/login') body('username').custom()

##### Style

- add credit

#### DONE

_0.1.3_

- write login form
- write login logic
- get passport.authenticate to pass along specific error message when authentication fails
- write logout logic

_0.1.2_

- add password encryption to signup form

_0.1.1_

- write signup logic

_0.1.0_

- set up routes
- set up layout.ejs
- write signup/update-user form

_0.0.0_

- Initial commit; project setup
