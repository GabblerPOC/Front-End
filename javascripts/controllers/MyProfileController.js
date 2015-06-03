appControllers.controller('MyProfileController', function($scope,$http,$window) {
    //On récupère l'utilsateur actuel
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);

    //On récupère ses gabs et on les sets dans le scope
    $http.get(options.api.base_url +"/user/"+ user.id).success(function (data) {
        console.log(data);
        $scope.gabs = data.gabs;
    });

    //On met à jour l'utilisateur actuel
    $http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
        var monobjet_json = JSON.stringify(data);
        $window.sessionStorage.setItem("utilisateur", monobjet_json);
    });

    //On récupère l'utilisateur une fois mis à jour
    var current_u2 = $window.sessionStorage.getItem("utilisateur");
    var user2 = JSON.parse(current_u2);

    //On set son avatar et son background
    if(user!=undefined) {
        $scope.avatar = options.api.base_url + user2.UrlAvatar;
        $scope.backGround = options.api.base_url + user2.UrlBackGround;
    }

});