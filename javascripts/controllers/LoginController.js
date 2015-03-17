	

appControllers.controller('LoginController',function($scope,$http,$rootScope,$location,$window,UserService,AuthenticationService,Restangular){
 	$scope.email="olalex_69@hotmail.fr";
 	$scope.password="123456789";
	
	
	$scope.user = AuthenticationService;

	$scope.Login = function(){

		
		UserService.LogIn($scope.email,$scope.password).success(function(data){
				
				$scope.isAuth = true;
				
				AuthenticationService.setUser(data);
				window.user=data;

				$http.get(options.api.base_url+"/user/jwt").success(function(data){
				
					$window.sessionStorage.token = data.token;
					$location.path("/");

						
				}).error(function(error){

					console.log(error);					
				});
				
				
				


			}).error(function(data){

				if(data.error){
					$scope.Message = data.error;
				}
				

			});


	};

	$scope.Logout = function() {

            if (AuthenticationService.isConnected()) {


                AuthenticationService.setUser(false);
                UserService.LogOut().success(function(data){
                		//Logout reussi
                		console.log("Logout de l'utilisateur");
                		delete $window.sessionStorage.token;
                		delete window.user;
                		$scope.user.setUser(false);
                		$location.path("/login");

                }).error(function(data){

                	console.log("erreur lors du logout");
                });
               
            }
        }

});