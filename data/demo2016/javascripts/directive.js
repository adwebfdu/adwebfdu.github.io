'use strict';

/* App Module */
var directives = angular.module('directives', []);

directives.directive('spotListPanel', function ($location) {
    return {
        restrict: 'EA',
        replace: true,
        scope: { spots: '=', scroll:'@'},
        templateUrl:'partials/module/spotListPanel.html',
        link: function (scope, element, attrs) {
            $("[data-toggle='popover']").popover();
            scope.showCategoryIndex = 0;
            scope.sortBy = 'score';
            scope.keyword = {text:''};
            scope.orderBy = function(order){
                scope.sortBy = order;
            }
            scope.showCategory = function(index){
                scope.showCategoryIndex = index;
            }
            scope.showOverview = function(){
                $location.path('/overview');
            }
        }
    }
});
