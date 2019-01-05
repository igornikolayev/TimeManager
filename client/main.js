import {
  Template
} from 'meteor/templating';
import {
  Task
} from '../lib/data.js';
import {
  Accounts
} from 'meteor/accounts-base';
import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.body.helpers({
  tasks() {
    return Task.find({});
  },
});
Template.body.events({
  'click #addnewtask'() {
    const text = document.getElementById("task").value;
    const time = document.getElementById("time").value;
    Task.insert({
      text,
      time,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    document.getElementById("task").value = '';
    document.getElementById("time").value = '';
  },
  'click #delete-task'() {
    Task.remove(this._id);
  },
  'click #change-time'() {
    var times = document.getElementById("change");
    Task.update(this._id, {
      $set: {
        time: times.value
      },
    });
    document.getElementById("change").value = ""
  },
  'click #declare-time'() {
    const times = document.getElementById("declare").value;
    Task.update(this._id, {
      $set: {
        time: this.time - times
      },
    });
    document.getElementById("declare").value = ""
  },
});