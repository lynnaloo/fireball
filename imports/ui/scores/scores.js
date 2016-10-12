import { Template } from 'meteor/templating';

import { Scores } from '../../api/scores.js';

import './scores.html';

Template.scores.helpers({
  scores: function () {
    return Scores.find({}, { sort: { score: -1 }, limit: 10});
  }
});
