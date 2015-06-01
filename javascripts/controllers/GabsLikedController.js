/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('GabsLikedController', function($scope,$http,$window) {
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $http.get(options.api.base_url + user.id+ "/GabsLiked").success(function (data) {
        console.log(data);
        $scope.gabs = data.gabs;
    })
});