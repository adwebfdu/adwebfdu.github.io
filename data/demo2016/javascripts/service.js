'use strict';

/* Services */
var services = angular.module('services',[]);

//factory for Data
services.factory('DataService', ['$http', '$q', function ($http, $q) {
	return {
		query : function(fileName) {
			var deferred = $q.defer();
			$http({method: 'GET', url: 'data/'+fileName+'.json'}).
			success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
        getUserByName:function(username){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/getUserByName'}).
                //$http({method: 'GET', url: dbName+"/"}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        queryByFile : function(fileName) {
            var deferred = $q.defer();
            $http({method: 'GET', url: 'data/'+fileName+'.json'}).
                //$http({method: 'GET', url: dbName+"/"}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        } ,
        queryAll : function(dbName) {
            var deferred = $q.defer();
            //$http({method: 'GET', url: 'data/'+fileName+'.json'}).
            $http({method: 'GET', url: dbName+"/"}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        queryById : function(dbName,id) {
            var deferred = $q.defer();
            //$http({method: 'GET', url: 'data/'+fileName+'.json'}).
            $http({method: 'GET', url: dbName+"/"+id}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        deleteById:function(dbName,id) {
            var deferred = $q.defer();
            //$http({method: 'GET', url: 'data/'+fileName+'.json'}).
            $http({method: 'DELETE', url: dbName+"/"+id}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
	};
}]);