appControllers.controller('TimeLineController', function($scope,$http,$mdToast){
	 $http.get(options.api.base_url+"/timeline").success(function(data){
	 	console.log(data);
	 	$scope.gabs=data.gabs;
	 })
	$scope.disabled = false;

	$scope.CreateGab = function() {
	 		$http.post(options.api.base_url+"/user/CreateGab",{title: $scope.titre, content: $scope.contenu});
			$mdToast.show(
				$mdToast.simple()
					.content('You just posted a Gab !')
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
        };

	$scope.Like = function(Id){
    	$http.get(options.api.base_url+"/user/LikeGab/"+Id)
    		.success(function(data){

    			console.log(data);
    			if(data.success){
					$scope.disabled = true;
					$mdToast.show(
						$mdToast.simple()
							.content('Mmmh.. you like it !')
							.position($scope.getToastPosition())
							.hideDelay(3000)
					);
				}

    		})
    		.error(function(error){

    			console.log(error);

    		});
    	
    };

    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

	var elem = document.querySelector('.tml');
	var msnry = new Masonry( elem, {
		// options
		itemSelector: '.tile',
		columnWidth: 0
	});


});

appControllers.controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
        $mdToast.hide();
    };
});