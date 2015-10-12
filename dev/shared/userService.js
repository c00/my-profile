(function(){ 
	ndtApp.service("userService", userService);

	function userService($q, $http, Notification, $log){
		var self = this;

		self.getCurrentUser = getCurrentUser;
		self.getPersonalInfo = getPersonalInfo;

		function getPersonalInfo(){
			var q = $q.defer();
			$http.get(settings.apiBase + 'nextdoorteacher/my-info').then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Can't get your account details right now. Try again or report this error.");
					q.reject(error);
				});

			return q.promise;
		}


		function getCurrentUser(){
			var q = $q.defer();

			$http.get("data/user.json").then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Error: Can't get user.");
					$log.error("Can't get user.");
					q.reject(error);
				});

			return q.promise;
		}
	}

})();