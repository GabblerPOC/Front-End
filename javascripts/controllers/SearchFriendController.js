appControllers.controller('SearchFriendController', function($scope,$http,$window, $location) {
    $scope.listUsers = [];
    $http.get(options.api.base_url + "/user/" ).success(function (data) {
        $scope.listUsers = data;
    });

    $scope.redirectById = function redirectById(id)
    {
        $location.path("/myprofile/"+id);
        $scope.apply();
    };
});