/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('GabsLikedController', function($scope,$http) {
    $http.get(options.api.base_url + user.getUser().id+ "/GabsLiked").success(function (data) {
        console.log(data);
        $scope.gabs = data.gabs;
    })
});