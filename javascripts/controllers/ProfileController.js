appControllers.controller('ProfileController', function($scope,$http){
	
		$scope.updateAvatar = function() {
			var fd = new FormData();
    		fd.append('file',$scope.userPic);
        	$http.post(options.api.base_url+"/user/ModifierProfile", fd, {
        		withCredentials: true,
        		headers: {'Content-Type': undefined },
        		transformRequest: angular.identity
    		});
    		console.log(angular.identity);

	 		//$http.post(options.api.base_url+"/user/ModifierProfile",{userPhoto: $scope.userPic});
	 		//console.log($scope.userPic);
        }
     


});