/**
 * Created by kai on 2015/2/5.
 */
'use strict';

var filters = angular.module('filters', []);

//master controller
filters.filter('chineseFilter',function () {
   var chineseFilter = function(input){
       if(input=="all"){
           return "全部";
       }else if(input=="finished"){
           return "已完成";
       }else if(input=="unfinished"){
           return "未完成";
       }else{
           return input;
       }
   }
   return chineseFilter;
});