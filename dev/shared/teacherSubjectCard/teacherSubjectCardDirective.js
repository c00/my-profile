/*  Teacher Subject Card directive Example:
<div teacher-subject-card subject="s"></div>
*/
(function(){ 
	ndtApp.directive('teacherSubjectCard', teacherSubjectCard);
	function teacherSubjectCard() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: {
				subject: "="
			},
			templateUrl: "shared/teacherSubjectCard/teacherSubjectCard.html",
			controller: controller
		};
	}

	function controller($scope, settings, Notification){
		$scope.subjectPictureFolder = settings.subjectPictureFolder;

		activate();

		function activate(){
			
		}
		
	}

})();