function basicTableController($scope,countrysideName) {
  console.log("载入basicTableController");
  $scope.currentTable='table1';
  
  $scope.countrysideName=test2;
  //console.log("countrysideName:"+test2);

  $scope.selectTable = function(table) {  //选择表格
    $scope.currentTable=table; 
    //console.log("countrysideName:"+test2);
  }
}