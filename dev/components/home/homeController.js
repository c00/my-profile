(function(){ 
	ndtApp.controller('homeController', homeController);

	function homeController($scope, $http, settings, Lightbox, $log, Notification){
		$scope.exampleImages = [];
		$scope.openLightboxModal = openLightboxModal;

		activate();

		function activate(){

			//Get images
			$http.get("data/exampleImages.json").then(
				function(result){
					$scope.exampleImages = result.data;
				},
				function (error){
					$log.error(error);
					Notification.error("Something went wrong.");
				});
		}

		function openLightboxModal(index){
			Lightbox.openModal($scope.exampleImages, index);
		}


	}

})();