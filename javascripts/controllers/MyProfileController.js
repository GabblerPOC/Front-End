appControllers.controller('MyProfileController', function($scope,$http,$window, $routeParams, $location, $mdToast, $timeout, $route) {

    //On r�cup�re l'utilsateur actuel
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);

    if($routeParams.id == null || $routeParams.id == user.id) {
        //On cache le bouton follow
        $scope.followButton = true;
        $scope.gabsLikedButton = false;
        $scope.deleteGabP = false;

        //On met � jour l'utilisateur actuel
        $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
            var monobjet_json = JSON.stringify(data);
            $window.sessionStorage.setItem("utilisateur", monobjet_json);
            $scope.gabs = data.gabs;
            $scope.NameShown = data.LastName + " " + data.Name;
            $scope.avatar = options.api.base_url + data.UrlAvatar;
            $scope.backGround = options.api.base_url + data.UrlBackGround;
        });
    }
    else
    {
        var user_profile;
        $scope.followButton = false;
        $scope.deleteGabP = true;
        $scope.gabsLikedButton= true;
        $scope.followText = "Follow";

        $http.get(options.api.base_url + "/user/" + $routeParams.id).success(function (data) {
            user_profile = data;
            $scope.avatar = options.api.base_url + user_profile.UrlAvatar;
            $scope.backGround = options.api.base_url + user_profile.UrlBackGround;
            $scope.gabs = data.gabs;
            $scope.NameShown = data.LastName + " " + data.Name;
            $http.get(options.api.base_url + "/user/"+ user.id)
                .success(function (data) {
                    data.following.some(function(id, index, array){
                        if(user_profile.id == data.following[index].id)
                        {
                            $scope.followText = "Unfollow";
                            $scope.$apply();
                            return true;
                        }
                    });
                });
        });


    }

    $scope.followUser = function(){
        if($scope.followText=="Follow") {
            $http.post(options.api.base_url + "/user/Follow", {id: $routeParams.id})
                .success(function (data) {
                    $scope.followText = "Unfollow";
                    $scope.$digest();
                });
        }
        else{
            $http.post(options.api.base_url + "/user/Unfollow", {id: $routeParams.id})
                .success(function (data) {
                    $scope.followText = "Follow";
                    $scope.$digest();
                });
        }
    };


    $scope.deleteGab = function(id_){
        $http.delete(options.api.base_url + "/gab/"+ id_)
        .success(function () {
            $mdToast.show({
                position: "bottom left right",
                template: "<md-toast style='background-color: #F2452B; position: fixed'>Gab deleted !</md-toast>"
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

    $scope.gabsUsers = function gabsUsers(){
        $location.path("/gabsliked/");
        $scope.apply();
    };

    $scope.redirectFollowers = function redirectFollowers(){
        if($scope.followButton)
            $location.path("/followers/");
        else  $location.path("/followers/"+ $routeParams.id);
        $scope.apply();
    };

    $scope.redirectFollowing = function redirectFollowing(){
        if($scope.followButton)
            $location.path("/following/");
        else  $location.path("/following/"+ $routeParams.id);
        $scope.apply();
    };
});