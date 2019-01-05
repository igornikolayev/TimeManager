import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
export const Task = new Mongo.Collection('task');

Meteor.startup(() => {});