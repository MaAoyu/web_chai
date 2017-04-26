var app = angular.module('auto-biz-user', ['ngRoute']);

app.config(function ($locationProvider,$httpProvider,$routeProvider) {
    console.log("载入angular config，跳转到login");
    $routeProvider
      .when('/login', {
         //templateUrl: '/page/project/html/views/table2.html'
        templateUrl: '/page/project/html/views/login.html',
        //controller: 'indexController'
      })
      .when('/', {
        templateUrl: '/page/project/html/views/treeIndex.html',
        //controller: 'treeIndexController',
        //controllerAs: '_ttrl'
      })
      .when('/basicTable', {
        templateUrl: '/page/project/html/views/basicTable.html',
        //controller: 'basicTableController'
      });
      $locationProvider.html5Mode(true);
  });
