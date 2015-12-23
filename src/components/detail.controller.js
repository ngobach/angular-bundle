angular.module('app')
	.controller('DetailController', ['$scope','$routeParams','setTitle','$base64',function($scope,$routeParams,setTitle,$base64){
		var text = $base64.decode($routeParams.text);
		$scope.text = text;
		setTitle(text);
	}]);