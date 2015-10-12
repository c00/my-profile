(function(){ 
	ndtApp.service("subjectModal", subjectModalService);

	function subjectModalService($q, $modal, Notification){
		var self = this;

		self.open = open;

		function open(subject, editMode){
			var modalInstance = $modal.open({
				templateUrl: 'shared/subjectModal/subjectModal.html',
				controller: 'subjectModalInstanceController',
				size: 'md',
				resolve: {
					subject: function(){ return subject; },
					editMode: function(){ return editMode; }
				}
			});
			//Probably I can add a scope there for variables.

			modalInstance.result.then(
				function(subject) {
					return subject;
				}, 
				function () {
					$q.reject();
				});

			//Return the result promise.
			return modalInstance.result;
		}
	}

})();