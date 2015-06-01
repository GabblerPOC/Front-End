/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowersController', function($scope,$http) {
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $http.get(options.api.base_url + user.id+ "/followers").success(function (data) {
        console.log(data);
        $scope.users = data.users;
    })
});