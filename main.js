angular.module("MailboxApp",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider
    .state('inbox', {
      url: "/inbox",
      templateUrl: "partials/inbox.html"
    })
    
})
.run(function(){
    console.info("Mailbox Running.");
})