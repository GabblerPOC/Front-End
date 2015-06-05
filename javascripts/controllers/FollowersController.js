/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowersController', function($scope,$http, $window,  $routeParams) {
    if($routeParams.id == null) {
        var current_u = $window.sessionStorage.getItem("utilisateur");
        var user = JSON.parse(current_u);
        $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
            $scope.users = data.followers;
        })
    }
    else{
        $http.get(options.api.base_url + "/user/" + $routeParams.id).success(function (data) {
            $scope.users = data.followers;
        })
    }
});