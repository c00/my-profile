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