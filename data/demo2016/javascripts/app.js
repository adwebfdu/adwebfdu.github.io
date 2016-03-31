'use strict';

/* App Module */

var app = angular.module('app', [
	'ngRoute',
    'ngCookies',
    'filters',
	'controllers',
	'directives',
	'services',
    'ngResource'
]);

//define white list for a href attribute.
/*app.config(function($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});*/
/*app.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});*/
//config route
app.config(['$routeProvider',
	function($routeProvider,$locationProvider) {
		var urlBase = "partials/";
		$routeProvider.
            when('/', {
                templateUrl: urlBase+'home.html',
                controller: 'homeCtrl'
            }).
            when('/overview', {
                templateUrl: urlBase+'overview.html',
                controller: 'overviewCtrl'
            }).
            when('/detail', {
                templateUrl: urlBase+'detail.html',
                controller: 'detailCtrl'
            }).
            when('/comment', {
                templateUrl: urlBase+'comment.html',
                controller: 'commentCtrl'
            }).
            when('/3d',{
                templateUrl: urlBase+'3d.html',
                controller: '3dCtrl'
            }).
			otherwise({
				redirectTo: '/'
			}
		);
	}
]);

