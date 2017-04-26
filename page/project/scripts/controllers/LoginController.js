function LoginController($scope,$http,$location) {
  console.log("载入loginController");
  // $scope.data = "xxx";
  // $scope.getData = function() {
  //   console.log("getdata....");
  //   $http.get('http://localhost:8081/')
  //     .success(function (res) {
  //         console.log(res);
  //         $scope.data = res;
  //     })
  //     .error(function (res) {
  //       alert("您好，您访问的内容出错");
  //     });
  // }


  $scope.userName = "";
  $scope.passWord = "";
  $scope.login = function() {
    console.log("login....");
    if($scope.userName == 'admin' && $scope.passWord == '123')
      $location.path("/index");
    else
      alert('帐号密码错误');
  }


  

}