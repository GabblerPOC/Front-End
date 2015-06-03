appControllers.controller('MyProfileController', function($scope,$http,$window) {
    //On r�cup�re l'utilsateur actuel
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);

    //On r�cup�re ses gabs et on les sets dans le scope
    $http.get(options.api.base_url +"/user/"+ user.id).success(function (data) {
        console.log(data);
        $scope.gabs = data.gabs;
    });

    //On met � jour l'utilisateur actuel
    $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
        var monobjet_json = JSON.stringify(data);
        $window.sessionStorage.setItem("utilisateur", monobjet_json);
    });

    //On r�cup�re l'utilisateur une fois mis � jour
    var current_u2 = $window.sessionStorage.getItem("utilisateur");
    var user2 = JSON.parse(current_u2);

    //On set son avatar et son background
    if(user!=undefined) {
        $scope.avatar = options.api.base_url + user2.UrlAvatar;
        $scope.backGround = options.api.base_url + user2.UrlBackGround;
    }

});