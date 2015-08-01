angular.module("MailboxApp",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider
    .state('inbox', {
        url: "/inbox",
        templateUrl: "partials/inbox.html",
        controller:function($scope,messageStore){
            $scope.messages = messageStore.getMessages();
        }
    })   
    .state('message', {
        url: "/message/:id",
        templateUrl: "partials/message.html",
        controller:function($scope,messageStore,$stateParams){
            $scope.message = messageStore.getMessages().filter(function(m){
                return m.id == $stateParams.id;
            })[0];
            
        }
    })   
})
.service("messageStore",function(){
    var messages = [];
    // at 100 it's fine
    // at 1000 its a little buggy
    // at 10000 its all over
    var sampleSize = 1000;
    for (var i = 0; i < sampleSize; i++){
        messages.push({
            sender:`john.smith${i}@gmail.com`,
            date:Date.now() - i*60000,
            id:i,
            subject:`Regarding report DS-${i}`,
            body:`Where's that report? I've been waiting ${i} days. -John`
        })
    };
    return {
        getMessages:function(){
            return messages;
        }
    }
})