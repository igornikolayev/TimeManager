import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    check
} from 'meteor/check';
export const Task = new Mongo.Collection('task');
Meteor.methods({
    'task.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Task.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'task.remove'(taskId) {
        check(taskId, String);

        Task.remove(taskId);
    },
    'task.update'(taskId, newTime) {
        check(taskId, String);
        check(newTime, Number);

        Task.update(taskId, {
            $set: {
                time: newTime
            }
        });
    },
});