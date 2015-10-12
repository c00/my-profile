/*  Sswitch Row directive Example:
<tbody switch-row current="'male'" value1="male" value2="female" label="gender"></tbody>

*/
(function(){ 
	ndtApp.directive('switchRow', switchRow);
	function switchRow() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: {
				current: "=",
				label: "@",
				value1: "@",
				value2: "@",
				readonly: "=?"
			},
			templateUrl: "shared/switchRow/switchRow.html",
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
				case "gender":
				$scope.labelText = "Gender";
				break;
			}
		}

		function setValue(){
			Notification.info("Please note: Nothing is actually being saved in this demo.");
			$scope.current = $scope.newValue;
			$scope.collapse = !$scope.collapse;			
		}

		
	}

})();