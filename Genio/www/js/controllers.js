angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.currentUser = {};
  $scope.isSignedIn = false;
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginwithGoogle', function($scope) {
   
   $scope.LoginwithGoogle = function(){
     $scope.GoogleAuth = gapi.auth2.getAuthInstance();
    $scope.isSignedIn = !$scope.GoogleAuth.isSignedIn.get();
      if($scope.isSignedIn){
        $scope.GoogleAuth.signIn({
        scope: 'email https://www.googleapis.com/auth/calendar'
      }).then(function(response) {
        console.log(response);
        console.log('comes here');
        $scope.modal.hide();
        $scope.currentUser = response;
        $scope.userGivenName = $scope.currentUser.getBasicProfile().getName();
        $scope.userImage = $scope.currentUser.getBasicProfile().getImageUrl();
        $scope.isSignedIn = true;
        // Handle response
      }, function(reason) {
        console.log(reason);
        $scope.isSignedIn = false;
        // Handle error
      });
        
    }else{
      console.log('comes here');
      $scope.currentUser = $scope.GoogleAuth.currentUser.get();
      $scope.userGivenName = $scope.currentUser.getBasicProfile().getName();
      $scope.userImage = $scope.currentUser.getBasicProfile().getImageUrl();
      $scope.isSignedIn = true;
    }
    
  };
});
