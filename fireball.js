Scores = new Mongo.Collection('scores');

if (Meteor.isClient) {
  Session.setDefault("counter", 10);
  Session.setDefault("food", "Meat");
  let timer = null;

  //Sets the counter and start the game timer.
  const start = function () {
    const startTime = new Date().getTime();
    Session.set("counter", 10);

    timer = Meteor.setInterval(function () {
      // every 10 seconds (10 * 1000), subtract 1 from the counter
      const currentCounter = Session.get("counter");
      if (currentCounter > 0) {
        Session.set("counter", currentCounter - 1);
      }
      else {
        const endTime = new Date().getTime();
        const userName = prompt('Tell your name young tamer.');

        if (userName === '') {
          userName = 'Tamer_' + endTime;
        }

        Meteor.clearInterval(timer);
        Scores.insert({
          name: userName,
          score: endTime - startTime
        });
        alert("Game over! Your score is " + (endTime - startTime));
      }
    }, 10 * 1000);
  };

  // execute the start function
  Meteor.startup(start);

  Template.feed.helpers({
    counter: function () {
      return Session.get("counter");
    },
    mood: function () {
      const food = Session.get("counter");
      let mood = "The dragon is ";
      if (food === 0) {
        return "Your dragon has run away!";
      }

      switch (food) {
        case (food <= 3):
          mood += "angry.";
          break;
        case (food <= 5):
          mood += "hungry.";
          break;
        case (food === 20):
          mood += "full.";
          break;
        default:
          mood += "content.";
          break;
      }
      return mood;
    }
  });

  Template.feed.events({
    'click button': function () {
      // increment the counter when button is clicked
      const currentCounter = Session.get("counter");
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
      const choice = Math.floor((Math.random() *3) +1);

      switch (choice) {
        case 1:
          Session.set("food","People");
          Session.set("counter", Session.get("counter")-3);
          alert("We don't like eating people -3 points");
          break;
        case 2:
          Session.set("food","Vegetables");
          Session.set("counter", Session.get("counter") +2);
          alert("+2 Bonus points");
          break;
        default:
          Session.set("food","Meat");
          Session.set("counter", Session.get("counter")+1);
          alert("+1 Bonus points")
          break;
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
