'use strict';

/* App Filter */

angular.module('phonecatFilters', []).filter("checkmark", function(){
    return function(input){
        return input ? '\u2713' : '\u2718';
    }
}).filter("number_format", function(){
    return function(input){
        return input.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,');
    }
});
