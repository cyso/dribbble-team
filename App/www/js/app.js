'use strict';

var app = angular.module('dabbble', [
	"dabbble.controllers",
	"dabbble.filters",
	"dabbble.services"
	]);

app.config(function ($routeProvider){
	$routeProvider
	.when("/shots/:id", {controller:"ShotsCtrl", templateUrl: "partials/shots.html"})
	.when("/:list", {controller:"ShotsListCtrl", templateUrl: "partials/shots_list.html"})
	.when("/:players/:username", {controller:"PlayersCtrl", templateUrl: "partials/player.html"})
	.otherwise({redirectTo: "/popular"})
});