if (Meteor.isClient) {
  // counter starts at 10
  Session.setDefault("counter", 10);

  var timer = setInterval(function () {
    // every 20 seconds, subtract 1 from the counter
    var currentCounter = Session.get("counter");
    if (currentCounter) {
      Session.set("counter", currentCounter - 1);
    } else {
      clearInterval(timer);
    }
  }, 20 * 1000);

  Template.feed.helpers({
    counter: function () {
      return Session.get("counter");
    },
    mood: function () {
      var food = Session.get("counter");
      if (!food) {
        return "Your dragon has run away!"
      }

      var mood = "The dragon is ";
      if (food <= 3) {
        return mood + "angry.";
      } else if (food <= 5) {
        return mood + "hungry.";
      } else if (food === 20) {
        return mood + "full.";
      } else {
        return mood + "content.";
      }
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      var currentCounter = Session.get("counter");
      if (currentCounter > 0 && currentCounter < 20) {
        Session.set("counter", currentCounter + 1);
      }
      // TODO: alert that dragon is full, or that game is over
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
