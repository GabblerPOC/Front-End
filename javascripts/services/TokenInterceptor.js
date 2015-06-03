App.factory("TokenInterceptor", function($q,$window,$location,AuthenticationService){
    var current_u = $window.sessionStorage.getItem("utilisateur");
    var user = JSON.parse(current_u);
    console.log(user);

	return{

		request: function($config){
            //Lors de chaque requête
			$config.headers = $config.headers || {};



			if($window.sessionStorage.token){
                //Si on possède le token on l'ajoute au header
				$config.headers['access_token'] = $window.sessionStorage.token;
			}

			return $config;

		},


        requestError: function(rejection) {
            //Lors de requête error
            return $q.reject(rejection);
        },

        response: function(response){
        	if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isConnected()) {
                AuthenticationService.setUser(user);
            }
            return response || $q.when(response);

        },

         responseError: function(rejection) {
            if (rejection != null && rejection.status === 403 && ($window.sessionStorage.token || AuthenticationService.isConnected())) {
                //Mauvais token , on le supprime et on le delog
                delete $window.sessionStorage.token;
                AuthenticationService.setUser(false);
                $location.path("/");
            }

            return $q.reject(rejection);
        }

		};


});