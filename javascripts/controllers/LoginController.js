	

appControllers.controller('LoginController',function($scope,$http,$rootScope,$location,$window,UserService,AuthenticationService,Restangular){
 	$scope.email="geeg@traineau.com";
 	$scope.password="traiperiph";


	$scope.user = AuthenticationService;



	$scope.Login = function(){

		
		UserService.LogIn($scope.email,$scope.password).success(function(data){


			var monobjet_json = JSON.stringify(data);
			$window.sessionStorage.setItem("utilisateur",monobjet_json);

				$scope.isAuth = true;
				
				AuthenticationService.setUser(data);
				user=data;

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
				var current_u = $window.sessionStorage.getItem("utilisateur");
				var user = JSON.parse(current_u);

                AuthenticationService.setUser(false);
                UserService.LogOut().success(function(data){
                		//Logout reussi
                		console.log("Logout de l'utilisateur");
                		delete $window.sessionStorage.token;
                		delete user;
                		$scope.user.setUser(false);
                		$location.path("/login");

                }).error(function(data){

                	console.log("erreur lors du logout");
                });
               
            }
        }

});