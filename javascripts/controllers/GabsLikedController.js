/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('GabsLikedController', function($scope,$http,$window,$mdToast) {
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $scope.baseURL = options.api.base_url;
    $http.get(options.api.base_url +"/user/"+ user.id).success(function (data) {
        $scope.gabs = data.GabLiked;
    });

    $scope.disLike = function (Id){
        $http.get(options.api.base_url+"/user/unLikeGab/"+Id)
            .success(function(data){
                $mdToast.show(
                    $mdToast.simple()
                        .content('You unliked it !')
                        .position($scope.getToastPosition())
                        .hideDelay(3000)
                )
            });
    };
});