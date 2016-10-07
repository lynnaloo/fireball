Fireball the Dragon
========

<img width='250' src='https://cloud.githubusercontent.com/assets/1610195/5512472/f8cc5636-87a9-11e4-8d52-429bf3704b2a.png'>

Fireball is a dragon that lives in pretty nice castle, but he needs you to be sure that
he has plenty dragon food. If he gets too hungry, then he gets angry. If he gets angry,
then he leaves the castle.

## Meteor.js

Meteor is a platform for creating web applications in JavaScript.

To get started, [install Meteor](https://www.meteor.com/install) or setup a meteor virtual machine on [Nitrous.io](http://www.nitrous.io).

## Fireball

Fireball is a simple web application that can be used as learning tool for kids and teens
learning to write JavaScript. This application uses Bootstrap 3 for styling and MongoDB for
the server.

To try out the full application:

```
git clone https://github.com/lynnaloo/fireball.git
cd fireball
meteor
```

Navigate to `http://localhost:3000` in your browser.

**To try out the application by developing in stages:**

[https://github.com/lynnaloo/fireball/wiki](https://github.com/lynnaloo/fireball/wiki)

To deploy your application, create an account on `www.meteor.com` and sign up for a Galaxy account.
Meteor now uses "pay-as-you-go" plans for the applications that you decide to host. If you decide
to sign up for Galaxy, you can run this command in the terminal to deploy changes to your site:

```
meteor deploy {your-app-name}.meteor.com
```

### Requirements

Fireball the dragon begins the game in a content mood with 10 pieces of food. Fireball
will take up to 20 pieces before he becomes full. As time goes on, Fireball eats some of his food:

* At 5 pieces, he starts to get hungry
* At 3 pieces, he is very hungry and starts to get angry
* At 0 pieces, he is very angry and ends the game

### Contributors

Application created by @lynnaloo. Fireball the Dragon graphic by @aurately.
