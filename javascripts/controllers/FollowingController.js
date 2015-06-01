/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowingController', function($scope,$http) {
    $http.get(options.api.base_url + user.getUser().id+ "/following").success(function (data) {
        console.log(data);
        $scope.users = data.users;
    })
});