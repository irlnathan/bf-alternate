angular.module('brushfire').controller('tutorialsDetailEditPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  // set-up loading state
  $scope.tutorialDetailsEdit = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;
  $scope.tutorial = window.SAILS_LOCALS.tutorial;

  $scope.tutorialDetailsEdit.title = $scope.tutorial.title;
  $scope.tutorialDetailsEdit.description = $scope.tutorial.description;
/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.submitEditTutorialForm = function(id) {

    $http.put('/tutorials/'+id, {
      title: $scope.tutorialDetailsEdit.title,
      description: $scope.tutorialDetailsEdit.description
    })
    .then(function onSuccess(sailsResponse){
      console.log(sailsResponse);
      window.location="/tutorials/"+sailsResponse.data.id;
    })
    .catch(function onError(sailsResponse){
      console.log(sailsResponse);
    })
    .finally(function eitherWay(){

    });
  };
}]);