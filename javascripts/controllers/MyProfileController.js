appControllers.controller('MyProfileController', function($scope,$http,$window, $routeParams, $location) {

    //On récupère l'utilsateur actuel
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);

    if($routeParams.id == null) {
        //On cache le bouton follow
        $scope.followButton = true;
        $scope.deleteGabP = false;

        //On met à jour l'utilisateur actuel
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
        $http.get(options.api.base_url + "/user/" + $routeParams.id).success(function (data) {
            user_profile = data;
            $scope.avatar = options.api.base_url + user_profile.UrlAvatar;
            $scope.backGround = options.api.base_url + user_profile.UrlBackGround;
            $scope.gabs = data.gabs;
            $scope.NameShown = data.LastName + " " + data.Name;
        });

        $scope.followButton = false;
        $scope.deleteGabP = true;
        $scope.followText = "Follow";

        $http.get(options.api.base_url + "/user/"+ user.id)
        .success(function (data) {
            user= data;
            for(id in user.following)
            {
                if(user_profile.id == user.following[id].id)
                {
                    $scope.followText = "Unfollow";
                    $scope.$apply();
                }
            }
        });
    }

    $scope.followUser = function(){
        if($scope.followText=="Follow") {
            $http.post(options.api.base_url + "/user/Follow", {id: $routeParams.id})
                .success(function (data) {
                    console.log("Nice!");
                });
        }
        else{
            $http.post(options.api.base_url + "/user/Unfollow", {id: $routeParams.id})
                .success(function (data) {
                    console.log("Unfollowed!");
                });
        }
    };

    $scope.deleteGab = function(id_){
        $http.delete(options.api.base_url + "/user/gabs/", {id: id_})
        .success(function (data) {
            console.log("Nice!");
        });
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