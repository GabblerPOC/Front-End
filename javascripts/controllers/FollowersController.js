/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('FollowersController', function($scope,$http) {
    $http.get(options.api.base_url + user.getUser().id+ "/followers").success(function (data) {
        console.log(data);
        $scope.users = data.users;
    })
});