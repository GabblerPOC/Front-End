appControllers.controller('TimeLineController', function($scope,$http,flash){
	 $http.get(options.api.base_url+"/timeline").success(function(data){
	 	console.log(data);
	 	$scope.gabs=data.gabs;
	 })

	 	$scope.CreateGab = function() {
	 		$http.post(options.api.base_url+"/user/CreateGab",{title: $scope.titre, content: $scope.contenu});
	 		flash("gab créé");
        }




});