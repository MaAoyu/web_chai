var app = angular.module('auto-biz-user', ['ngRoute']);

app.value('user', {})
app.config(function ($locationProvider,$httpProvider,$routeProvider) {
    console.log("载入angular config，跳转到login");
    $routeProvider
      .when('/log', {
         //templateUrl: '/page/project/html/views/table2.html'
        templateUrl: '/page/project/html/views/login.html',
        //controller: 'indexController'
      })
      .when('/', {
        templateUrl: '/page/project/html/views/treeIndex.html',
        //controller: 'treeIndexController',
        //controllerAs: '_ttrl'
      });
      $locationProvider.html5Mode(true);
  });
