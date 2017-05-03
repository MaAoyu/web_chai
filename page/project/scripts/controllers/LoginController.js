function LoginController($scope, $http, $location,user) {
  console.log("载入loginController");
  $scope.userName = "";
  $scope.passWord = "";
  $scope.login = function () {
    $http.get('http://localhost:8081/login?name='+$scope.userName+'&passWord='+$scope.passWord)
      .success(function (res) {
        if(res['ok']==-1)
          alert("帐号不存在");
        else if(res['ok']==0)
          alert("密码错误");
        else{
          user.name=res.name;
          user.city1=res.city1;
          user.city2=res.city2;
          user.city3=res.city3;
          //console.log(JSON.stringify(user));
          $location.path("/index");
        }
      })
      .error(function (res) {
        alert("网络出错");
      });
    // if ($scope.userName == 'admin' && $scope.passWord == '123')
    //   $location.path("/index");
    // else
    //   alert('帐号密码错误');
  }


}