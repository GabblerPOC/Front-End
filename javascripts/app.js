
var App = angular.module("GabblerApp", ['ngMaterial', 'ngRoute','restangular','appServices','appControllers','flash','file-model', 'ngAnimate', 'masonry']);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:1337";


App.config(function($routeProvider,$httpProvider,RestangularProvider) {	
    
    //Définition des routes de notre application
    	$routeProvider
    		.when('/',{
    			templateUrl: "views/home.html",
    			controller: "HomeController",
                access: { requiredLogin: false }

    		})
    		.when('/login',{
    			templateUrl: "views/loginRegister.html",
    			controller: "LoginRegisterController",
                access: { requiredLogin: false }

    		})
            .when('/register',{
                templateUrl:"views/register.html",
                controller: "LoginRegisterController",
                access: { requiredLogin: false }
            })
            .when('/timeline',{
                templateUrl:"views/timeline.html",
                controller: "TimeLineController",
                access: { requiredLogin: true }
            })
            .when('/profile',{
                templateUrl:"views/profile.html",
                controller: "ProfileController",
                access: { requiredLogin: true }
            })
            .when('/followers',{
                templateUrl:"views/followers.html",
                controller: "FollowersController",
                access: { requiredLogin: true }
            })
            .when('/following',{
                templateUrl:"views/following.html",
                controller: "FollowingController",
                access: { requiredLogin: true }
            })
            .when('/followers/:id',{
                templateUrl:"views/followers.html",
                controller: "FollowersController",
                access: { requiredLogin: true }
            })
            .when('/following/:id',{
                templateUrl:"views/following.html",
                controller: "FollowingController",
                access: { requiredLogin: true }
            })
            .when('/gabsliked',{
                templateUrl:"views/gabsliked.html",
                controller: "GabsLikedController",
                access: { requiredLogin: true }
            })
            .when('/myprofile/:id',{
                templateUrl:"views/MyProfile.html",
                controller: "MyProfileController",
                access: { requiredLogin: true }
            })
            .when('/myprofile',{
                templateUrl:"views/MyProfile.html",
                controller: "MyProfileController",
                access: { requiredLogin: true }
            })
            .when('/searchfriend',{
                templateUrl:"views/searchFriend.html",
                controller: "SearchFriendController",
                access: { requiredLogin: true }
            })
    		.otherwise({
    			redirectTo: '/',
                access: { requiredLogin: false }  
   			 });
    

    RestangularProvider.setBaseUrl(options.api.base_url);

    $httpProvider.interceptors.push('TokenInterceptor');
    $httpProvider.defaults.withCredentials = true;


});

App.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isConnected()) {
            $location.path("/login");
        }
    });

});

App.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});