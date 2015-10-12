(function(){
	ndtApp.directive('navbar', navbar);

	function navbar() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: { },
			templateUrl: "shared/navbar/navbar.html",
			controller: controller
		};
	}

	function controller($scope, settings, $http, userService, $log){
		$scope.pictureFolder = settings.pictureFolder;

		$scope.doLogout = doLogout;
		$scope.login = login;

		activate();

		function activate(){
			//Check is already logged in.
			userService.getCurrentUser().then(
				function(result) {
					$scope.currentUser = result;
					$scope.loggedIn = true;
					$log.debug(result);
				},
				function(data) {
					//Not logged in.
				});
		}

		function doLogout(){
			userService.doLogout().then(function(){
				$scope.currentUser = null;
				$scope.loggedIn = false;
			});
		}

		function login(){
		//Open Login Modal
		loginModalService.open().then(
			function(result) {
				$scope.currentUser = result;
				$scope.loggedIn = true;							
			},
			function(data) {
				$log.error(data);
			});

	}
}

})();