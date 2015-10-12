/*  Info Row directive Example:
<div info-row value="basicInfo.firstName" label="First name" placeholder="Jacky"></div>

Don't use this for passwords.
*/
(function(){ 
	ndtApp.directive('infoRow', infoRow);
	function infoRow() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: {
				value: "=",
				label: "@",
				placeholder: "@",
				readonly: "=?"
			},
			templateUrl: "shared/infoRow/infoRow.html",
			controller: controller
		};
	}

	function controller($scope, userService, Notification){
		$scope.collapse = true;
		$scope.valueUpdating = false;
		$scope.newValue = "";
		$scope.labelText = "";
		$scope.showError = false;
		$scope.errorText = "";

		$scope.setValue = setValue;

		activate();

		function activate(){
			if (!angular.isDefined($scope.readonly)) $scope.readonly = false;

			switch($scope.label) {
				case "firstName":
				$scope.labelText = "First name";
				break;
				case "lastName":
				$scope.labelText = "Last name";
				break;
				case "phone":
				$scope.labelText = "Phone number";
				break;
				case "email":
				$scope.labelText = "Email address";
				break;
				case "gender":
				$scope.labelText = "Gender";
				break;
			}
		}

		function validateEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		}

		function setValue(){
			if ($scope.label == "email" && !validateEmail($scope.newValue)){
				$scope.errorText = "Please enter a valid email address";
				$scope.showError = true;
				return;
			} else {
				$scope.showError = false;
			}

			Notification.info("Please note: Nothing is actually being saved in this demo.");
			
			$scope.value = $scope.newValue;
			$scope.collapse = !$scope.collapse;
		}

		
	}

})();