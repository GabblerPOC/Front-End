
appServices.factory("AuthenticationService",function($window){
	var current_u = $window.sessionStorage.getItem("utilisateur");
	var user = JSON.parse(current_u);

	console.log(user);
	return  {

		getUser: function(){

			return user;
		},
		setUser: function(newUser){

			user = newUser;
		},
		isConnected: function(){

			if(user){
				return true;
			}
			else{
				return false;
			}
		}

	}

	

});

appServices.factory("UserService",function($http){

	return{

		LogIn: function(Email,Password){

			return $http.post(options.api.base_url+"/auth/login",{email: Email,password: Password});

		},

		LogOut: function(){
			
			return $http.get(options.api.base_url+"/auth/logout");
		}

	}

});