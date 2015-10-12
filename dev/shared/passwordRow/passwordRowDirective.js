/*  Password Row directive Example:
<tbody password-row ></tbody>

Don't use this for passwords.
*/
(function(){ 
	ndtApp.directive('passwordRow', passwordRow);
	function passwordRow() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: { readonly: "=?" },
			templateUrl: "shared/passwordRow/passwordRow.html",
			controller: controller
		};
	}

	function controller($scope, userService, Notification){
		$scope.collapse = true;
		$scope.valueUpdating = false;
		$scope.oldValue = "";
		$scope.newValue = "";
		$scope.confirmNewValue = "";

		$scope.labelText = "Change password";
		$scope.showError = false;
		$scope.errorText = "";

		$scope.setValue = setValue;

		activate();

		function activate(){
			if (!angular.isDefined($scope.readonly)) $scope.readonly = false;
		}

		function setValue(){
			if ($scope.oldValue === ''){
				$scope.errorText = "Please type your old password";
				$scope.showError = true;
				return;
			} else if ($scope.newValue === '') {
				$scope.errorText = "Your password cannot be empty";
				$scope.showError = true;
				return;
			} else if ($scope.newValue.length < 5) {
				$scope.errorText = "Your password is too short.";
				$scope.showError = true;
				return;
			} else if ($scope.newValue !== $scope.confirmNewValue) {
				$scope.errorText = "Passwords don't match";
				$scope.showError = true;
				return;
			} else {
				$scope.showError = false;
			}

			//Here we'd call some service to update.
			Notification.info("Please note: Nothing is actually being saved in this demo.");

			$scope.collapse = !$scope.collapse;
			$scope.oldValue = "";
			$scope.newValue = "";
			$scope.confirmNewValue = "";
		}

		
	}

})();