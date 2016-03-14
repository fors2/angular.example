'use strict';

/* App Service */

var phonecatServices = angular.module("phonecatServices", ['ngResource']);

phonecatServices.factory("apiService", ['$resource',
    function($resource){
        return $resource('api/v2/fish/:phoneId.json', {}, {
            query: {method:'GET', params: {phoneId: "list"}, isArray: true}
        });
    }
]);
