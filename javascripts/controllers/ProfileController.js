appControllers.controller('ProfileController', function($scope,$http,$window){
	var current_u = $window.sessionStorage.getItem("utilisateur");
	var user = JSON.parse(current_u);

	$scope.email = user.email;
	$scope.Name=user.Name;
	$scope.LastName = user.LastName;
	$scope.password = user.password;
	$scope.age = user.Age;

	$scope.updateAvatar = function() {
		var fd = new FormData();
		fd.append('file',$scope.userPic);
		var obj = {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		};
		$scope.PostAndGet(options.api.base_url+"/user/ModifierAvatar", fd, obj, $scope.clb);
	};
	 $scope.PostAndGet = function(opt, fd, obj,  clb) {
		$http.post(opt, fd, obj);
		clb();
	};
	$scope.clb = function() {
		$http.get(options.api.base_url + "/user/" + user.id).success(function (data) {
			var monobjet_json = JSON.stringify(data);
			$window.sessionStorage.setItem("utilisateur", monobjet_json);
			console.log(monobjet_json);
		});
	};

	$scope.updateBackground = function() {
		var fd = new FormData();
		fd.append('file',$scope.userBg);
		$http.post(options.api.base_url+"/user/ModifierBackground", fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		});
		$http.get(options.api.base_url+"/user/" + user.id).success(function(data) {
			var monobjet_json = JSON.stringify(data);
			$window.sessionStorage.setItem("utilisateur", monobjet_json);
		});
	}

	$scope.UpdateUser = function(){
		var params = {
			user: {
				password: $scope.password,
				Name: $scope.Name,
				LastName: $scope.LastName,
				Age: $scope.age
			}
		};

		$http.post(options.api.base_url+"/user/ModifierProfile",params)
			.success(function(data){
				if(data.success == false)
				{
					if(data.error == "E_VALIDATION")
					{
						flash(data.error.invalidAttributes.password[0].message);
						flash(data.error.invalidAttributes.email[0].message);
					}
				} else if (data.success == true) {
					$http.get(options.api.base_url+"/user/" + user.id).success(function(data) {
						var monobjet_json = JSON.stringify(data);
						$window.sessionStorage.setItem("utilisateur", monobjet_json);
					});
				}
			})
			.error(function(error){
				console.log(error);
			});
	};




});