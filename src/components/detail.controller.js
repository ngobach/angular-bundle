angular.module('app')
	.controller('DetailController', ['$scope','$routeParams','setTitle','$base64','$window',function($scope,$routeParams,setTitle,$base64,$window){
		var text = $base64.decode($routeParams.text);
		$scope.text = text;
		$scope.back = function(){
			$window.history.back();
		}
		setTitle(text);
	}]);