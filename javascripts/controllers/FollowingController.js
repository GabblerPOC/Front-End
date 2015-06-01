/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowingController', function($scope,$http) {
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $http.get(ooptions.api.base_url +"/user/"+ user.id+ "/following").success(function (data) {
        console.log(data);
        $scope.users = data.users;
    })
});