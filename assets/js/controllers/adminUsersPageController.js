angular.module('brushfire').controller('adminUsersPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                  
                                                  
*/

  // set-up loading state
  $scope.userList = {
    loading: false
  };

$scope.me = window.SAILS_LOCALS.me;


  $http.get('/user/admin-users')
  .then(function onSuccess(sailsResponse){

    console.log('sailsResponse: ', sailsResponse);
    $scope.userList.contents = sailsResponse.data;

  })
  .catch(function onError(sailsResponse){
    console.log(sailsResponse);

  })
  .finally(function eitherWay(){

    $scope.userList.loading = false;
  });

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/ 

  $scope.saveAdmin = function(id, change){

    var theRoute = '/user/update-admin/' + id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        id: id,
        admin: change
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        // window.location = '#/profile/' + sailsResponse.data[0].id;

        // $scope.editProfile.loading = false;
        toastr.success('user record saved!','', { timeOut: 1000 });
        console.log('sailsResponse: ', sailsResponse);
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

  $scope.saveBanned = function(id, change){

    var theRoute = '/user/update-banned/' + id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        id: id,
        banned: change
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        // window.location = '#/profile/' + sailsResponse.data[0].id;

        // $scope.editProfile.loading = false;
        // toastr.options.fadeOut = 1000;
        // toastr.success('Successfully Saved!');
        toastr.success('user record saved!','', { timeOut: 1000 });
        console.log('sailsResponse: ', sailsResponse);
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

  $scope.saveDeleted = function(id, change){

    var theRoute = '/user/update-deleted/' + id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        id: id,
        deleted: change
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        // window.location = '#/profile/' + sailsResponse.data[0].id;

        // $scope.editProfile.loading = false;
        toastr.success('user record saved!','', { timeOut: 1000 });
        console.log('sailsResponse: ', sailsResponse);
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

}]);