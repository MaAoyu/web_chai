function LoginController($scope, $http, $location, user) {
  console.log("载入loginController");
  $scope.userName = "";
  $scope.passWord = "";
  $scope.rememberAccount = false;
  $scope.rememberPassword = false;
  var defuserName = getCookie("username");
  if (defuserName) {
    $scope.userName = defuserName;
  }
  var defPassword = getCookie("password");
  if (defPassword) {
    $scope.passWord = defPassword;
  }
  var defrememberAccount = getCookie("rememberAccount");
  if (defrememberAccount) {
    $scope.rememberAccount = true;
  }
  var defrememberPassword = getCookie("rememberPassword");
  if (defrememberPassword) {
    $scope.rememberPassword = true;
  }

  function setCookie(name, value, timeout) {
    var d = new Date();
    d.setDate(d.getDate() + timeout);
    document.cookie = name + '=' + value + ';expires=' + d;
  }
  function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //['abc','cba']  
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return '';
  }

  $scope.login = function () {
    if ($scope.rememberAccount) {
      setCookie("username", $scope.userName, 1);
      setCookie("rememberAccount", true, 1);
    }else{
      setCookie("username", '', 1);
      setCookie("rememberAccount", '', 1);
    }
    if ($scope.rememberPassword) {
      setCookie("password", $scope.passWord, 1);
      setCookie("rememberPassword", true, 1);
    }else{
      setCookie("password", '', 1);
      setCookie("rememberPassword", '', 1);
    }
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