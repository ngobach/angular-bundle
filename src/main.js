angular.module('app', ['ngRoute','ui.bootstrap','base64'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl : 'partials/index.html',
				controller : 'TodoListController',
				controllerAs : 'todoList'
			})
			.when('/view/:text', {
				templateUrl : 'partials/view.html',
				controller : 'DetailController'
			});
	}])
	.factory('setTitle', ['$rootScope',function($rootScope){
		return function(s){
			$rootScope.pageTitle = s;
		};
	}])
	.run(['$rootScope','$window', function($rootScope,$window){
		$rootScope.login = function(){
			$window.alert('Wanna login?');
		};
	}]);