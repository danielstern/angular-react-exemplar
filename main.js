(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module("MailboxApp", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider.state('inbox', {
        url: "/inbox",
        templateUrl: "partials/inbox.html",
        controller: function controller($scope, messageStore, $element) {
            //            $scope.messages = messageStore.getMessages();
            //        }

            var MessageList = React.createClass({
                displayName: "MessageList",

                render: function render() {
                    return React.createElement(
                        "div",
                        null,
                        "Messages!!",
                        React.createElement(
                            "div",
                            null,
                            messageStore.getMessages().map(function (m) {
                                return m;
                            })
                        )
                    );
                }
            });

            React.render(React.createElement(MessageList, null), $element[0]);
        }
    }).state('message', {
        url: "/message/:id",
        templateUrl: "partials/message.html",
        controller: function controller($scope, messageStore, $stateParams) {
            $scope.message = messageStore.getMessages().filter(function (m) {
                return m.id == $stateParams.id;
            })[0];
        }
    });
}).service("messageStore", function () {
    var messages = [];
    // at 100 it's fine
    // at 1000 its a little buggy
    // at 10000 its all over
    var sampleSize = 1000;
    for (var i = 0; i < sampleSize; i++) {
        messages.push({
            sender: "john.smith" + i + "@gmail.com",
            date: Date.now() - i * 240000000,
            id: i,
            subject: "Regarding report DS-" + i,
            body: "Where's that report? I've been waiting " + i + " days. -John"
        });
    };
    return {
        getMessages: function getMessages() {
            return messages;
        }
    };
});

},{}]},{},[1]);
