angular.module('starter.controllers', [])

.controller('bootCtrl',function($scope,$rootScope,$cordovaNetwork,$http){

  $scope.currentStatus = 'Loading Ionic';

  $rootScope.ionicReady.then(function(){

    $scope.currentStatus = 'Ionic Platform is ready';

    if(navigator.onLine){
      $scope.currentStatus = "Connected to network";

      checkBackendConnection();
    }
    else{
      $scope.currentStatus = "Network connection failed";
    }
  });

  function checkBackendConnection(){
    $scope.currentStatus = 'Connecting to the backend';

    $http({
      method: 'GET',
      url: 'http://sampledata.getsandbox.com/getStatus'
    }).then(function successCallback(response) {
      $scope.currentStatus = 'Connected to the backend';

      checkForUserSession();

    }, function errorCallback(response) {
      $scope.currentStatus = 'Could not connect to the backend';
    });
  }


  function checkForUserSession(){

    $http({
      method: 'GET',
      url: 'http://sampledata.getsandbox.com/getUserSession',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function successCallback(response) {

      if(response.data.isUserSessionValid == 'true'){
      $scope.currentStatus = 'Logged in user is valid';
      }
      else{
        $scope.currentStatus = 'Logged in user is invalid.Please login again';
      }

    }, function errorCallback(response) {
      $scope.currentStatus = 'Could not connect to the backend';
    });

  }

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
