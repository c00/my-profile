/* App Module */
var ndtApp = angular.module('ndtApp', [
	'ui.router',
	'angular-storage',
	'ui.bootstrap',
	'ngFileUpload',
	'ngImgCrop',
	'ui-notification',
	'bootstrapLightbox',
	'settings' /* ng-settings generated file */
	]);
ndtApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	//HTML5 mode on
	$locationProvider.html5Mode(true);

	//Default state
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
	.state('home', {
		url: "/",
		templateUrl: "components/home/home.html",
		controller: "homeController",
	})
	.state('user', {
		abstract: true,
		url: "/user",
		templateUrl: "components/user/user.html",
		controller: "userController",
	})
	.state('user.profile', {
		url: "/profile",
		templateUrl: "components/profile/profile.html",
		controller: "profileController",
	});
});
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
(function(){ 
	ndtApp.controller('userController', controller);
	
	function controller($scope, settings, userService) {
		
		$scope.pictureFolder = settings.pictureFolder;

		//instead of dumping stuff in the scope, I like to have an activate function that is executed on controller load.
		activate();

		function activate(){
			//Get user
			userService.getCurrentUser().then(
				function(user){
					$scope.user = user;
				},
				function(error){
					//Error is being dealt with in service.
				});	
		}

	}
})();
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
(function(){ 
	ndtApp.service("messageService", messageService);

	function messageService($http, settings, $q, Notification){
		var self = this;
		self.getConversations = getConversations;
		self.getMessages = getMessages;
		self.sendMessage = sendMessage;

		function getMessages(conversationId){
			var q = $q.defer();

			//Get messages
			$http.get(settings.apiBase + 'chat/conversation/' + conversationId).then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Couldn't get your messages. Try again or report this error.");
					q.reject(error);
				});

			return q.promise;
		}

		function getConversations(){
			var q = $q.defer();

			$http.get(settings.apiBase + 'nextdoorteacher/chat/conversations').then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("I can't reach your conversations right now. Try again later or report this error.");
					q.reject(error);
				});

			return q.promise;
		}

		function sendMessage(message){
			var q = $q.defer();
			//Send message
			$http.post(settings.apiBase + 'chat/message', message).then(
				function(result){	
					q.resolve(result.data);
				},
				function(error){
					Notification.error("I didn't sent that message. Please try again, or report this problem.");
					q.reject(error);
				});

			return q.promise;
		}

	}
})();
(function(){
	ndtApp.directive('navbar', navbar);

	function navbar() {
		return {
			restrict: "AE",
			replace: 'true',
			scope: { },
			templateUrl: "shared/navbar/navbar.html",
			controller: controller
		};
	}

	function controller($scope, settings, $http, userService, $log){
		$scope.pictureFolder = settings.pictureFolder;

		$scope.doLogout = doLogout;
		$scope.login = login;

		activate();

		function activate(){
			//Check is already logged in.
			userService.getCurrentUser().then(
				function(result) {
					$scope.currentUser = result;
					$scope.loggedIn = true;
					$log.debug(result);
				},
				function(data) {
					//Not logged in.
				});
		}

		function doLogout(){
			userService.doLogout().then(function(){
				$scope.currentUser = null;
				$scope.loggedIn = false;
			});
		}

		function login(){
		//Open Login Modal
		loginModalService.open().then(
			function(result) {
				$scope.currentUser = result;
				$scope.loggedIn = true;							
			},
			function(data) {
				$log.error(data);
			});

	}
}

})();
/* Format Rupiah number */
ndtApp.filter('rupiah', function() {
	return function(input) {
		if (input === undefined) return "";
		/* Thousands seperator: https://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript*/
		return "Rp " + input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	};
});

ndtApp.filter('arrayToList', function() {
  return function(input) {
    if (!jQuery.isArray(input)) return "none";

    return input.join(', ');
  };
});

/* Subjects array to comma seperated string */
ndtApp.filter('subjects', function() {
	return function(input) {
		if (!jQuery.isArray(input)) return "none";

		//To array
		var names = input.map(function(item) {
			return item.name;
		});

		//to string
		return names.join(", ");
	};
});

/* Gender to 'his' or 'her' */
ndtApp.filter('hisHer', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "his";
		}else {
			return "her";
		}
	};
});

/* Gender to 'he' or 'she' */
ndtApp.filter('heShe', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "he";
		}else {
			return "she";
		}
	};
});

/* Gender to 'him' or 'her' */
ndtApp.filter('himHer', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == "male"){
			return "him";
		}else {
			return "her";
		}
	};
});

/* Pluralize hour */
ndtApp.filter('hours', function() {
	return function(input) {
		if (input === undefined) return "";
		
		if (input == 1){
			return "1 hour";
		}else {
			return input + " hours";
		}
	};
});

/* Status */
ndtApp.filter('lessonStatus', function() {
	return function(input) {
		if (input === undefined) return "";

		switch(input) {
			case 1:
				return "Waiting for the teacher to confirm";
			case 2:
				return "Waiting for the student to confirm";
			case 3:
				return "Awaiting payment";
			case 10:
				return "Confirmed";
			case 20:
				return "Waiting for the teacher to review";
			case 21:
				return "Waiting for the student to review";
			case 30:
				return "Complete";
			case 31:
				return "Cancelled";
			case 40:
				return "Dispute";
			default:
				return "Unknown";
		}
	
	};

});

/* Status */
ndtApp.filter('lessonStatusClass', function() {
	return function(input) {
		if (input === undefined) return "";

		switch(input) {
			case 1:
				return "warning";
			case 2:
				return "warning";
			case 3:
				return "warning";
			case 10:
				return "success";
			case 20:
				return "warning";
			case 21:
				return "warning";
			case 30:
				return "success";
			case 31:
				return "info";
			case 40:
				return "danger";
			default:
				return "";
		}
	
	};

});
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
(function(){ 
	ndtApp.service("userService", userService);

	function userService($q, $http, Notification, $log){
		var self = this;

		self.getCurrentUser = getCurrentUser;
		self.getPersonalInfo = getPersonalInfo;

		function getPersonalInfo(){
			var q = $q.defer();
			$http.get(settings.apiBase + 'nextdoorteacher/my-info').then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Can't get your account details right now. Try again or report this error.");
					q.reject(error);
				});

			return q.promise;
		}


		function getCurrentUser(){
			var q = $q.defer();

			$http.get("data/user.json").then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Error: Can't get user.");
					$log.error("Can't get user.");
					q.reject(error);
				});

			return q.promise;
		}
	}

})();