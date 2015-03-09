Scores = new Mongo.Collection('scores');

if (Meteor.isClient) {
  Session.setDefault("counter", 10);
  Session.setDefault("food", "Meat");
  var timer = null;
  /**
   Sets the counter and start the game timer.
  */
  var start = function () {
    var startTime = new Date().getTime();
    Session.set("counter", 10);
    timer = Meteor.setInterval(function () {
      // every 10 seconds (10 * 1000), subtract 1 from the counter
      var currentCounter = Session.get("counter");
      if (currentCounter > 0) {
        Session.set("counter", currentCounter - 1);
      } else {
        Meteor.clearInterval(timer);
        var endTime = new Date().getTime();
        alert("Game over! Your score is " + (endTime - startTime));
        Scores.insert({
          score: endTime - startTime
        });
      }
    }, 10 * 1000);
  }
  // execute the start function
  Meteor.startup(start);

  Template.feed.helpers({
    counter: function () {
      return Session.get("counter");
    },
    mood: function () {
      var food = Session.get("counter");
      if (food === 0) {
        return "Your dragon has run away!";
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

  Template.feed.events({
    'click button': function () {
      // increment the counter when button is clicked
      var currentCounter = Session.get("counter");
      if (currentCounter > 0 && currentCounter < 20) {
        Session.set("counter", currentCounter + 1);
      }
    }
  });

  Template.scores.helpers({
    scores: function () {
      return Scores.find({}, { sort: { score: -1 }, limit: 10});
    }
  });

  Template.reset.events({
    'click button': function () {
      Meteor.clearInterval(timer);
      start();
    }
  });

  Template.food.helpers({
    food: function () {
      return Session.get("food");
    }
  });

  Template.food.events({
    'click button': function () {
      var choice = Math.floor((Math.random() *3) +1);
      if (choice == 1) {
        Session.set("food","People");
        Session.set("counter", Session.get("counter")-3);
        alert("We don't like eating people -3 points");
      } else if (choice == 2) {
        Session.set("food","Vegetables");
        Session.set("counter", Session.get("counter") +2);
        alert("+2 Bonus points");
      } else {
        Session.set("food","Meat");
        Session.set("counter", Session.get("counter")+1);
        alert("+1 Bonus points")
      }

    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
