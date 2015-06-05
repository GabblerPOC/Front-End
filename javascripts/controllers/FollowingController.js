/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowingController', function($scope,$http,$window, $routeParams, $location) {
    if($routeParams.id == null) {
        var current_u = $window.sessionStorage.getItem("utilisateur");
        var user = JSON.parse(current_u);
        $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
            $scope.users = data.following;
        })
    }
    else{
        $http.get(options.api.base_url + "/user/" + $routeParams.id).success(function (data) {
            $scope.users = data.following;
        })
    }

    $scope.redirectById = function redirectById(id)
    {
        $location.path("/myprofile/"+id);
        $scope.apply();
    };
});