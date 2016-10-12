import { Template } from 'meteor/templating';

import './controls.html';

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
