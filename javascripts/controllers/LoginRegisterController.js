appControllers.controller('LoginRegisterController',function($scope,$http,$rootScope,$location,$window,UserService,AuthenticationService, flash, $mdDialog,Restangular){
 	$scope.email="";
 	$scope.password="";
	$scope.loader=false;
    $scope.Name = "";
    $scope.LastName= "";
    $scope.Age = 21;
    $scope.callbackReg = false;

	$scope.user = AuthenticationService;

	$scope.Login = function(){
		UserService.LogIn($scope.email,$scope.password).success(function(data){
			$scope.loader = true;

			var monobjet_json = JSON.stringify(data);
			$window.sessionStorage.setItem("utilisateur",monobjet_json);

				$scope.isAuth = true;
				
				AuthenticationService.setUser(data);
				user=data;

				$http.get(options.api.base_url+"/user/jwt").success(function(data){
				
					$window.sessionStorage.token = data.token;
					$location.path("/");

						
				}).error(function(error){
					$scope.loader = false;
					console.log(error);					
				});

			}).error(function(data){

				if(data.error){
					$scope.loader = false;
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

    $scope.Register = function(){
        var params = {
            email: $scope.email,
            password: $scope.password,
            Name: $scope.Name,
            LastName: $scope.LastName,
            Age: $scope.Age
        };

        $http.post(options.api.base_url+"/auth/register",params)
            .success(function(data){
                if(data.success == false)
                {
                    if(data.error == "E_VALIDATION")
                    {
                        flash(data.error.invalidAttributes.password[0].message);
                        flash(data.error.invalidAttributes.email[0].message);
                    }
                } else if (data.success == true) {
                    $scope.callbackReg = true;
                }
            })
            .error(function(error){
                console.log(error);
            });
        };

});