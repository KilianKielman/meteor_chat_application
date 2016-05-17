import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import { Chats } from '../chats.js';

 // For the Template 'nycda_chat', these are helper methods
Template.nycda_chat.helpers({
 // Return true if the post belongs to the current user
 currentUser(){
 return Meteor.userId() == this.user_id;
 }
});

 // For the body, these are helper methods
Template.body.helpers({
 // If the template is looking for 'chats', here we return all of the chats in the DB
 chats: function() {
 return Chats.find({}, { sort: { time: -1}});
 }
})

 // The following listen and respond user triggered events
Template.body.events({
 // If the user presses a keyboard key
 'keydown input#text' : function (e) {
 // We check to see if that key was the 'enter' key
 if (e.which == 13) { 
 // Set email to Anon, assuming the user has not yet signed up
 let email = "Anon";
 // Check to see if there is a logged in user and reassign the email varaible to their email
 if (Meteor.user() != null) {
 email = Meteor.user().emails[0].address;
 };
 // store the user's input text in a variable
 let message = $('#text');
 // store the user's id in a variable, or set a random number as their id if they are not signed in
 let id = Meteor.userId() || Math.random();
 // As long as the message isn't empty, store it
 if (message.value != '') {
   Chats.insert({
    owner: email,
    message: message.val(),
    user_id: id,
    time: Date.now()
   });
    // Clear the input text box
   $('#text').val('');
 }
 }
 }
});
