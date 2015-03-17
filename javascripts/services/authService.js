
appServices.factory("AuthenticationService",function(){
	var user=window.user;

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