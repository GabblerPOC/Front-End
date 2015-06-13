/**
 * Created by Oxachon on 01/06/2015.
 */
appControllers.controller('GabsLikedController', function($scope,$http,$window,$mdToast, $timeout, $route) {
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $scope.baseURL = options.api.base_url;
    $http.get(options.api.base_url +"/user/"+ user.id).success(function (data) {
        $scope.gabs = data.GabLiked;
    });

    $scope.disLike = function (Id){
        $http.get(options.api.base_url+"/user/unLikeGab/"+Id)
            .success(function(){
                $mdToast.show({
                    position: "bottom left right",
                    template: "<md-toast style='background-color: #F2452B; position: fixed'>Gab unliked</md-toast>"
                });
                $timeout(function(){
                    $scope.$apply(function () {
                        $timeout(function() {
                            $route.reload();
                        }, 200)
                    }, 200);
                });
            });
    };
});