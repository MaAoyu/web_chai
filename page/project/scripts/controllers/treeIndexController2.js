function treeIndexController($scope,$location,countrysideName) {
  console.log("载入treeIndexController");
  //$scope.citys2=[{'name': 'Effective Java', 'author':'Joshua Bloch'},{'name': 'Year without Pants', 'author':'Scott Berkun'},{ 'name':'Confessions of public speaker','author':'Scott Berkun'},{'name':'JavaScript Good Parts','author':'Douglas Crockford'}];

  $scope.citys1=[false,false,false];
  $scope.citys2=[false,false,false];
  $scope.citys3=[false,false,false];

  $scope.isShowCity1 = function(index) {  //第一层展开
    if($scope.citys1[index]==false)
      $scope.citys1[index]=true;
    else
      $scope.citys1[index]=false;
  }
  $scope.isShowCity2 = function(index) {  //第二层展开
    if($scope.citys2[index]==false)
      $scope.citys2[index]=true;
    else
      $scope.citys2[index]=false;
  }
  $scope.isShowCity3 = function(index) {  //第三层展开
    if($scope.citys3[index]==false)
      $scope.citys3[index]=true;
    else
      $scope.citys3[index]=false;
  }

  $scope.selectItem = function(item) {  //选择城镇
    test2=item; 
    console.log("countrysideName:"+test2);
    $location.path("/basicTable");
  }
}