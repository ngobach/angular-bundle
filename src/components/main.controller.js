angular.module('app')
	.controller('TodoListController',['$rootScope','$base64','$location','$scope', function($rootScope,$base64,$location,$scope){
		$rootScope.pageTitle = 'List todos';
		$scope.name = "NgoBach";
		$scope.todos = [];

		// Add function
		$scope.add = function (){
			if ($scope.job.length > 0)
				$scope.todos.push({
					'text' : $scope.job,
					'done' : false
				});
			$scope.job = '';
		};

		// Calculate number of remain items
		$scope.remain = function() {
			var count = 0;
			angular.forEach($scope.todos,function(todo){
				if (!todo.done) count++;
			});
			return count;
		};

		// Archive todos
		$scope.archive = function(){
			var newList = [];
			angular.forEach($scope.todos,function(todo){
				if (!todo.done)
					newList.push(todo);
			});
			$scope.todos = newList;
		};

		// Clear selection
		$scope.clearSelection = function (){
			angular.forEach($scope.todos,function(todo){
				todo.done = false;
			});
		};

		// Callback View
		$scope.view = function(idx){
			console.log(idx);
			$location.path('/view/'+$base64.encode($scope.todos[idx].text));
		};
	}]);