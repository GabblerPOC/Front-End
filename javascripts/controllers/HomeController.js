appControllers.controller('HomeController', function($scope,$rootScope, Restangular,$http){
    
    var Users = Restangular.all("user");
   
    $scope.users =Users.getList().$object;

    $scope.Follow = function(Id, button){
    	$http.post(options.api.base_url+"/user/Follow",{id: Id})
    		.success(function(data){

    			console.log(data);
    			if(data.success){
                    button.value = "toto";
    			}


    		})
    		.error(function(error){

    			console.log(error);

    		});
    	
    };


    });