angular.module('todoApp', ['ngRoute','ui.bootstrap','base64'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl : 'partials/index.html'
			})
			.when('/view/:text', {
				templateUrl : 'partials/view.html',
				controller : ['$scope','$routeParams','setTitle','$base64',function($scope,$routeParams,setTitle,$base64){
					var text = $base64.decode($routeParams.text);
					$scope.text = text;
					setTitle(text);
				}]
			});
	}])
	.controller('TodoListController', function($rootScope,$base64,$location){
		$rootScope.pageTitle = 'List todos';
		var todoList = this;
		todoList.name = "NgoBach";
		todoList.todos = [
			{text : 'Hello', done : false},
			{text : 'Hello 2', done : true},
			{text : 'Hello 3', done : false}
		];

		// Add function
		todoList.add = function (){
			if (todoList.job.length > 0)
				todoList.todos.push({
					'text' : todoList.job,
					'done' : false
				});
			todoList.job = '';
		};

		// Calculate number of remain items
		todoList.remain = function() {
			var count = 0;
			angular.forEach(todoList.todos,function(todo){
				if (!todo.done) count++;
			});
			return count;
		};

		// Archive todos
		todoList.archive = function(){
			var newList = [];
			angular.forEach(todoList.todos,function(todo){
				if (!todo.done)
					newList.push(todo);
			});
			todoList.todos = newList;
		};

		// Clear selection
		todoList.clearSelection = function (){
			angular.forEach(todoList.todos,function(todo){
				todo.done = false;
			});
		};

		// Callback View
		todoList.view = function(todo){
			console.log(todo);
			$location.path('/view/'+$base64.encode(todo.text));
		};
	})
	.factory('setTitle', function($rootScope){
		return function(s){
			$rootScope.pageTitle = s;
		};
	});