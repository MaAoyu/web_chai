angular.module('auto-biz-user')
    .filter('typeFilter', function() {
  return function(input) {
    //return input ? '\u2713' : '\u2718';
    if(input=="true") return '\u2713';
    else return '\u2718';
  };
});