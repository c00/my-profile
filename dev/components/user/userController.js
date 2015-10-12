(function(){ 
	ndtApp.controller('userController', controller);
	
	function controller($scope, settings, userService) {
		
		$scope.pictureFolder = settings.pictureFolder;

		//instead of dumping stuff in the scope, I like to have an activate function that is executed on controller load.
		activate();

		function activate(){
			//Get user
			userService.getCurrentUser().then(
				function(user){
					$scope.user = user;
				},
				function(error){
					//Error is being dealt with in service.
				});	
		}

	}
})();