/*  Array Row directive Example:
<tbody array-row array="basicInfo.interests" label="interests"></tbody>

*/
(function(){ 
	ndtApp.directive('arrayRow', arrayRow);
	function arrayRow() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: {
				array: "=",
				label: "@",
				readonly: "=?"
			},
			templateUrl: "shared/arrayRow/arrayRow.html",
			controller: controller
		};
	}

	function controller($scope, Notification){
		$scope.collapse = true;
		$scope.valueUpdating = false;
		$scope.newArray = [];
		$scope.labelText = "";
		$scope.showError = false;
		$scope.errorText = "";
		$scope.addValue = "";

		$scope.setValue = setValue;
		$scope.collapseRow = collapseRow;
		$scope.add = add;
		$scope.remove = remove;

		activate();

		function activate(){
			if (!angular.isDefined($scope.readonly)) $scope.readonly = false;

			switch($scope.label) {
				case "interests":
				$scope.labelText = "Interests";
				break;
			}
		}

		function add(){
			$scope.newArray.push($scope.addValue);
			$scope.addValue = "";
		}

		function remove(value){
			var i = $scope.newArray.indexOf(value);
			if(i != -1) {
				$scope.newArray.splice(i, 1);
			}
		}

		function collapseRow(){
			$scope.collapse = !$scope.collapse;
			if (!$scope.collapse){
				$scope.newArray = $scope.array.slice(0);
			}
		}

		function setValue(){
			if ($scope.array == $scope.newArray){
				$scope.errorText = "Add or remove interests first.";
				$scope.showError = true;
			} else {
				$scope.showError = false;
			}

			//This is where some service would be called to udpate it.
			Notification.info("Please note: Nothing is actually being saved in this demo.");
			$scope.array = $scope.newArray;
			$scope.collapse = !$scope.collapse;
		}

		
	}

})();