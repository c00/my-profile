(function(){ 
	ndtApp.controller('subjectModalInstanceController', controller);

	function controller($scope, $q, Notification, $modalInstance, settings, $http, subject, editMode) {
		$scope.subjectPictureFolder = settings.subjectPictureFolder;
		$scope.subject = { pricePerHour: 100000,  pictureId: 'none' };
		$scope.newSubject = {};
		$scope.editMode = editMode;

		$scope.post = post;
		$scope.remove = remove;
		$scope.cancel = cancel;

		activate();

		function activate(){
			if (subject && subject.pictureId){
				$scope.subject = subject;
			}

			$scope.newSubject = jQuery.extend({}, $scope.subject);
		}

		function post(){
			$modalInstance.close($scope.newSubject);
		}

		function remove(){
			Notification.info("Subject has been removed. (But not really of course)");
			$modalInstance.close("removed");
		}

		function cancel(){
			$modalInstance.dismiss('cancel');
		}		

	}

})();