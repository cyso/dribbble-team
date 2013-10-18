'use strict';

var controllers = angular.module('dabbble.controllers', []);

controllers.controller('AppCtrl', function($scope) {

	$scope.name = "Module";

});

controllers.controller('ShotsListCtrl', function($scope, dribbble, $routeParams) {
	
	var list = $routeParams.list;
	
	dribbble.list(list).then(function (data) {
		$scope.list = data.data;
	});
	
	$scope.loadNextPage = function(){
		dribbble.list(list, {page: $scope.list.page + 1}).then(function (data){
			$scope.list.page = data.data.page;
			$scope.list.shots = $scope.list.shots.concat(data.data.shots);
		});
	}
});

controllers.controller('ShotsCtrl', function($scope, dribbble, $routeParams, PagedResult) {

	var id = $routeParams.id;

	$scope.shot = dribbble.shot(id);
	$scope.comments = new PagedResult('comments', id, 'comments').loadNextPage();

});

controllers.controller('PlayersCtrl', function($scope, dribbble, $routeParams) {

	var list = $routeParams.list;

	var username = $routeParams.username;

	dribbble.players(username).then(function (data) {
		$scope.player = data.data;
	});
	
	dribbble.playersshots(username,{}).then(function (data) {
		$scope.list = data.data;
		console.log($scope.list.page);
	});
	
	$scope.loadNextPage = function() {
		dribbble.playersshots(username, {page: ($scope.list.page*1) + 1}).then(function (data){
			console.log(data.data.page);
			$scope.list.page = data.data.page;
			$scope.list.shots = $scope.list.shots.concat(data.data.shots);
		});
	}
	

});
