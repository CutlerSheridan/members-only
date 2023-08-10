# Members Only

## A message board with varying degrees of accessibility depending on if user is signed in, a club member, and/or an admin

Post messages. If you're not signed in, you can view messages, but not who posted them. If you are signed in and you are a club member, you can see who posted them. If you're an admin, you can delete them, too.

Made using Node, Express, MongoDB, Passport, bcryptjs, EJS, HTML, CSS.

#### TODO NEXT

#### TODO LATER

##### Features

- add ability for admin to delete messages

##### Behavior

##### Style

- decide on fonts
- add credit

#### DONE

_0.4.3_

- make nav prettier
- adjust card heading font size

_0.4.2_

- make headings bigger
- underline post card headings
- style profile

_0.4.1_

- style nav for different screen widths
- fix Join so, if you're a member or an admin, giving the password for the other one doesn't undo your current status
- style join
- style nav color
- clean up color vars

_0.4.0_

- decide on style for site
- style plaques
- style post cards
- style post feed
- style index-plaque
- style buttons and links
- style login
- style signup

_0.3.3_

- make card attribution only appear for members or admin
- save test user data in .env

_0.3.2_

- write post_card component
- write home feed logic
- make home feed reverse chronological
- change '-' to 'at' on card attribution
- remove debugs from Post
- make post content retain line breaks and spaces

_0.3.1_

- add date display method for Post objects

_0.3.0_

- write post form
- write post logic

_0.2.3_

- write join form
- write join logic
- make join view show check mark instead of input when a member of the club or admin

_0.2.2_

- redirect profile edit form to login form if not signed in

_0.2.1_

- write edit-profile logic
- get user object to pass to username validator correctly from req.user instead of res.locals.currentUser
- only update password if filled in
- don't auto-populate password field if password matches hashed password in DB

_0.2.0_

- write profile view
- write profile logic

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
- write signup/edit-profile form

_0.0.0_

- Initial commit; project setup
