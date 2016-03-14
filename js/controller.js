'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['ngCookies']);

phonecatControllers.controller('PhoneListCtrl', function ($scope, $routeParams, apiService, filterFilter, $cookies) {
    $scope.uri    = "list/";
    $scope.direction = true;
    
    $scope.ctrPrice = false;
    
    $scope.phones = apiService.query();

/*
    $http.get('api/v2/fish/list.json').success(function(data) {
        $scope.phones = data;
    }).error(function(data, status, headers, config) {
        $scope.phones = [];
        console.log("error", data, status, headers, config);
    });
*/
    // ▽ソート
    $scope.orderProp = 'name';
    $scope.sort = function(order){
        $scope.direction = !$scope.direction;
        var direction = ($scope.direction) ? "+" : "-";
        $scope.orderProp = direction + order;
    }
    $scope.toggleClass = function(){
        $scope.ctrPrice  = true;
        $scope.ctrPriceD = !$scope.direction;
        $scope.ctrPriceA = $scope.direction;
    }
    $scope.optionPrice = {"+price":"Price ↑", "-price":"Price ↓", "+priority":"Priority ↑", "-priority":"Priority ↓"};
    
    // ▽チェックボックス
    $scope.chkall = false;
    $scope.chklist = [3, 2];
    $scope.changeChk = function(id){
        var idx = $scope.chklist.indexOf(id);
        if(angular.equals(idx, -1)){
            $scope.chklist.push(id);
        }else{
            $scope.chklist.splice(idx, 1);
        }
    }
    $scope.checkAll = function(){
        var chkall = !$scope.chkall;
        // 全チェック外し
        if(!chkall){
            $scope.chklist = [];
            return;
        }

        // フィルタの結果をリストとして利用する
        // http://qiita.com/piyohiko/items/470389e899dbb1ab7974
        var result = filterFilter($scope.phones, $scope.query);
        angular.forEach(result, function(value, key){
            var id  = value.id;
            var idx = $scope.chklist.indexOf(id);
            if(angular.equals(idx, -1)){
                $scope.chklist.push(id);
            }
        });
    }
    
    // ▽クッキー
    $scope.save = function(){
        // 検索条件の保存
        var value = {};
        value["query"]     = $scope.query;
        value["direction"] = $scope.direction;
        value["orderProp"] = $scope.orderProp;
        
        $cookies['where'] = JSON.stringify(value);
        console.log("value", value);
        console.log("cookie.where", $cookies.where);
    }
    if(!angular.isUndefined($cookies.where)){
        // 検索条件の復元
        var value = JSON.parse($cookies.where);
        $scope.query     = value["query"];
        $scope.direction = value["direction"];
        $scope.orderProp = value["orderProp"];
        if($scope.orderProp.substring(1) == "price"){
            $scope.ctrPrice  = true;
            $scope.ctrPriceD = !$scope.direction;
            $scope.ctrPriceA = $scope.direction;
        }
    }
    
    // ▽削除ボタン
    $scope.del = function(){
        angular.forEach($scope.chklist, function(value, key){
            var index = 0;
            angular.forEach($scope.phones, function(value2, key2){
                var id = value2.id;
                if(id == value){
                    $scope.phones.splice(index, 1);
                    return;
                }
                index++;
            });
        });
    }
});



phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'apiService',
    function($scope, $routeParams, apiService) {
        $scope.uri    = "detail/:id";
        $scope.phoneId = $routeParams.phoneId;

        $scope.phone = apiService.get({phoneId: $routeParams.phoneId}, function(data){
            $scope.phone.images.unshift(data.img);
            $scope.mainImageUrl = data.images[0];
        });
        
/*
        $http.get('api/v2/fish_' + $routeParams.phoneId + '.json').success(function(data) {
            data.images.unshift(data.img);
            $scope.phone = data;
            $scope.mainImageUrl = data.images[0];
            
        }).error(function(data, status, headers, config) {
            $scope.phone = [];
            console.log("error", data, status, headers, config);
        });
*/
        
        $scope.setImage = function(imageUrl){
            $scope.mainImageUrl = imageUrl;
        }
    }
]);
