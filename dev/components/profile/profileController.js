(function(){ 
	ndtApp.controller('profileController', controller);

	function controller($scope, $log, userService, Notification, subjectModal, $window) {
		//$scope.user is inherited
		$scope.hidePersonalPanel = false;
		
		$scope.openSubjectModal = openSubjectModal;
		$scope.saveText = saveText;
		$scope.addGoal = addGoal;
		$scope.contact = contact;

		activate();

		function activate(){
			$log.log($scope.user);
			
		}

		function contact(){
			$window.location.href('mailto:info@cerem.co');
		}

		function demoNotice(){
			Notification.info("Please note: Nothing is actually being saved in this demo.");
		}

		function addGoal(){
			Notification.warning("That's not available in this demo, sorry!");
		}

		function saveText(){
			demoNotice();
		}

		function removeSubject(s){
			for (var i = 0; i < $scope.user.subjects.length; i++) {
				if ($scope.user.subjects[i].name == s.name) {
					$scope.user.subjects.splice(i,1);
					break;
				}
			}
		}
		
		function openSubjectModal(subject, editMode){
			subjectModal.open(subject, editMode).then(
				function(s){
					if (s == "removed") {
						removeSubject(subject);
					}else if (editMode){
						subject.quote = s.quote;
						subject.from = s.from;
					} else {
						$scope.user.subjects.push(s);	
					}
					
				});
		}

	}
})();