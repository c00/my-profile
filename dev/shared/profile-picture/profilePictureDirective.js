(function(){ 
	ndtApp.directive('profilePicture', profilePicture);
	function profilePicture() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: {
				pictureId: "=",
				size: '@'
			},
			templateUrl: "shared/profile-picture/profilePicture.html",
			controller: controller
		};
	}

	function controller($scope, settings){
		$scope.pictureFolder = settings.pictureFolder;
		$scope.sizeClass = "img-normal";

		activate();

		function activate(){
			if ($scope.size == 'sm') {
				$scope.sizeClass = "img-small";
			}else if ($scope.size == 'lg'){
				$scope.sizeClass = 'img-medium';
			}
		}

	}

})();