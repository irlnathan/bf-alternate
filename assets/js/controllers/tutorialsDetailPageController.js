angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/

  // Grab any locals from the me property on the windows object
  $scope.me = window.SAILS_LOCALS.me;

  // Grab the number of stars (in a local) for this tutorial from the stars
  // property of the window object
  $scope.tutorial = {
    stars: window.SAILS_LOCALS.stars
  };

  // set-up loading state
  $scope.tutorialDetails = {
    loading: false,

    // This is a separate loading state for the delete button
    deleteTutorialLoading: false,
    deleteVideoLoading: false
  };

  // We need a max for the stars (i.e. 1 out of 5 stars)
  $scope.max = 5;

  // Whether the user may change the  rating.
  $scope.isReadonly = false;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

 // The number of stars currently being hovered over 
  $scope.hoveringOver = function(rating, tutorialId) {

    // The `id` of the tutorial, we'll need it for the $watch below because
    // we can't pass the `id` in the $watch function
    $scope.tutorialId = tutorialId;

    // The number of stars currently being hovered over
    $scope.overStar = rating;
  };

  // When the user clicks on the the stars this will change the model and
  //  we'll POST the rating
  $scope.$watch('myStars', function(rating) {

    // Doing this check because the rating directive will fire upon initial
    // page load 
    if (!rating) {
      return;
    }

    // This disables the rating element between AJAX PUT requests (e.g. double posting)
    if ($scope.tutorialDetails.loading) {
      return;
    }
    $scope.tutorialDetails.loading = true;
    $http.put('/tutorials/' + $scope.tutorialId + '/rate', {
      rating: rating,
      id: $scope.tutorialId
    })
    .then(function onSuccess(sailsResponse) {

      toastr.success('Your rating has been saved', 'Rating', {
          closeButton: true
        });

    })
    .catch(function onError(sailsResponse) {

      console.error(sailsResponse);

    })
    .finally(function eitherWay() {
      $scope.tutorialDetails.loading = false;
    });
    
  });

  $scope.editVideo = function(e, videoId) {

    e.preventDefault();

    // Redirect to the edit page using the tutorial `id`
    window.location = "/tutorials/" + videoId + "/videos/edit";
  };

  // Simulate deleting a tutorial
  $scope.deleteTutorial = function(id) {

    $scope.tutorialDetails.deleteTutorialLoading = true;

    $http.delete('/tutorials/'+id)
    .then(function onSuccess(sailsResponse){

      window.location = "/" + sailsResponse.data.username;

    })
    .catch(function onError(sailsResponse){
      console.log(sailsResponse);
    })
    .finally(function eitherWay(){
      
    });

  };

  // Simulate move video up
  $scope.moveVideoUp = function(e, videoId) {

    e.preventDefault();

    // With refresh:
    // 
    // TODO: lock UI
    // TODO: show loading state
    $http.post('/videos/'+videoId+'/up')
    .then(function (sailsResponse) {
      console.log('moved video up!');

      // Refresh the page
      location.reload();
    })
    .catch(function (sailsResponse) {
      console.error(sailsResponse);
    });

  };

  // Simulate move video down
  $scope.moveVideoDown = function(e, videoId) {

    e.preventDefault();

    // With refresh:
    // 
    // TODO: lock UI
    // TODO: show loading state
    $http.post('/videos/'+videoId+'/down')
    .then(function (sailsResponse) {
      console.log('moved video down!');

      // Refresh the page
      location.reload();
    })
    .catch(function (sailsResponse) {
      console.error(sailsResponse);
    });

  };

  // Simulate deleting a video
  $scope.deleteVideo = function(e, videoId, index) {

    e.preventDefault();

    console.log(index);

    $scope.tutorialDetails.deleteVideoLoading = index;

    $http.delete('/videos/'+videoId)
    .then(function onSuccess(sailsResponse){

      $scope.tutorialDetails.deleteVideoLoading = false;

      // Head back to the profile that is editing the tutorial
      // Simulated for now.
      // window.location = '/tutorials/1';
      
    })
    .catch(function onError(sailsResponse){
      console.log(sailsResponse);
    })
    .finally(function eitherWay(){
      
    });
  };
}]);