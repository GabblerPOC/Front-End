
var App = angular.module("GabblerApp", ['ngRoute','restangular','appServices','appControllers','flash']);

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
                access: { requiredLogin: true }

    		})
    		.when('/login',{
    			templateUrl: "views/login.html",
    			controller: "LoginController",
                access: { requiredLogin: false }              

    		})
            .when('/register',{
                templateUrl:"views/register.html",
                controller: "RegisterController",
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
    


    