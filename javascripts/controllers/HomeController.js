appControllers.controller('HomeController', function($scope,$rootScope, $location, Restangular,$http, $window){
    
    var Users = Restangular.all("user");
   
    $scope.users = Users.getList().$object;

    $scope.Follow = function(Id, button){
    	$http.post(options.api.base_url+"/user/Follow",{id: Id})
    		.success(function(data){

    			console.log(data);
    			if(data.success){                    
                    console.log('success');
    			}

    		})
    		.error(function(error){

    			console.log(error);

    		});
    	
    };
	$scope.go = function () {
		var current_u = $window.sessionStorage.getItem("utilisateur");
		var user = JSON.parse(current_u);
		if(user!= null)
		{
			$location.path('/myprofile' );
		}
		else $location.path('/login' );

	};

    });