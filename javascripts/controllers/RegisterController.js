appControllers.controller('RegisterController', function($scope,$rootScope, Restangular,$http, flash){
    $scope.email="geeg@traineau.com";
    $scope.password="traiperiph";
    $scope.Name = "caca";
    $scope.LastName= "Supinfo";
    $scope.Age = 19999;
    

    $scope.Register = function(){
        var params = {
            email: $scope.email,
            password: $scope.password,
            Name: $scope.Name,
            Lastname: $scope.LastName,
            Age: $scope.Age
        }

    	$http.post(options.api.base_url+"/auth/register",params)
    		.success(function(data){

    			console.log(data);

                if(data.success == false)
                {
                    if(data.error.error == "E_VALIDATION")
                    {
                        flash(data.error.invalidAttributes.password[0].message);
                        flash(data.error.invalidAttributes.email[0].message);
                    }

                }
                
    		})
    		.error(function(error){

                
    			console.log(error);

    		});
    };



    });

