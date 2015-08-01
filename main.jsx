angular.module("MailboxApp",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider
    .state('inbox', {
        url: "/inbox",
        templateUrl: "partials/inbox.html",
        controller:function($scope,messageStore,$element){
//            $scope.messages = messageStore.getMessages();
//        }
            
        var MessageList = React.createClass({
            render:function(){
                return (
                    <div>
                        Messages!!
                        <div>
                    {messageStore.getMessages().map(function(m){
                        return m;
                    })}
                        </div>
                    </div>
                )
            }
        });
            
        React.render(<MessageList />,$element[0]);
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
            date:Date.now() - i*240000000,
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