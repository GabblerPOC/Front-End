appControllers.controller('MyProfileController', function($scope,$http,$window, $routeParams) {

    //On récupère l'utilsateur actuel
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);

    if($routeParams.id == null) {
        //On cache le bouton follow
        $scope.followButton = true;

        //On met à jour l'utilisateur actuel
        $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
            var monobjet_json = JSON.stringify(data);
            $window.sessionStorage.setItem("utilisateur", monobjet_json);
            $scope.gabs = data.gabs;
        });

        //On récupère l'utilisateur une fois mis à jour
        var current_u2 = $window.sessionStorage.getItem("utilisateur");
        var user2 = JSON.parse(current_u2);

        //On set son avatar et son background
        if (user != undefined) {
            $scope.avatar = options.api.base_url + user2.UrlAvatar;
            $scope.backGround = options.api.base_url + user2.UrlBackGround;
        }
    }
    else
    {
        var user_profile;
        $http.get(options.api.base_url + "/user/" + $routeParams.id).success(function (data) {
            user_profile = data;
            $scope.avatar = options.api.base_url + user_profile.UrlAvatar;
            $scope.backGround = options.api.base_url + user_profile.UrlBackGround;
            $scope.gabs = data.gabs;
        });

        $scope.followButton = false;
        $scope.followText = "Follow";


        $http.get(options.api.base_url + "/user/"+ user.id).success(function (data) {
            user= data;
        });

       /* for(i in user.following)
        {
            if(user_profile.id == i.id)
            {
                $scope.followText = "Unfollow";
            }
        }*/
    }

    $scope.followUser = function(){
        $http.post(options.api.base_url+"/user/Follow",{id: $routeParams.id})
        .success(function(data){
            console.log("Nice!");
        });
    }
});