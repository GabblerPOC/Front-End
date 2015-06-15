appControllers.controller('TimeLineController', function($scope,$http,$mdToast, $window, $timeout, $route, $rootScope){
	$scope.msnry = null;

	$scope.Masonry2 = function Masonry2(){
		var elem = document.querySelector('.tml');
		$scope.msnry = new Masonry(elem, {
			// options
			itemSelector: '.tile',
			columnWidth: 0,
			transitionDuration: 0.4,
			isAnimated: true
		});
	}

	 $http.get(options.api.base_url+"/timeline").success(function(data){
	 	$scope.gabs=data.gabs;

		 $scope.baseURL = options.api.base_url;

	 });

    $scope.obj = { null : true};
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    $http.get(options.api.base_url +"/user/"+ user.id).success(function (data) {
        $scope.gabsL = data.GabLiked;
        for (g in $scope.gabsL)
        {
            $scope.obj[$scope.gabsL[g].id] = true;
        }
    });


	$scope.CreateGab = function() {
		$http.post(options.api.base_url+"/user/CreateGab",{title: $scope.titre, content: $scope.contenu})
			.success(function(data){
				$mdToast.show(
					$mdToast.simple()
						.content('You just posted a Gab !')
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);
				$http.get(options.api.base_url+"/timeline").success(function(data){
					$scope.gabs=data.gabs;
					Masonry();
				});
			});

	};


	$scope.Like = function(Id){
    	$http.get(options.api.base_url+"/user/LikeGab/"+Id)
    		.success(function(data){
    			if(data.success){
					$mdToast.show(
						$mdToast.simple()
							.content('You liked it !')
							.position($scope.getToastPosition())
							.hideDelay(3000)
					);
                    $scope.obj[Id] = true;
				}
				else{
					$http.get(options.api.base_url+"/user/unLikeGab/"+Id)
						.success(function(data){
						$mdToast.show(
							$mdToast.simple()
								.content('You unliked it !')
								.position($scope.getToastPosition())
								.hideDelay(3000)
						);
                        $scope.obj[Id] = false;
					});
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


});

appControllers.controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
        $mdToast.hide();
    };
});