function TreeIndexController($scope, $http, $location, user) {
    console.log("载入TreeIndexController");
    $scope.testUrl = 'http://106.14.17.37:8081/';
    // $scope.testUrl = 'http://localhost:8081/';
    if (user.name == null || user.name == '') {
        //alert("请登陆！");
        $location.path("/");
    }
    //框架参数
    $scope.userName = user.name;
    $scope.userCity1 = user.city1;
    $scope.userCity2 = user.city2;
    $scope.userCity3 = user.city3;

    // $scope.userName = 'admin';
    // $scope.userCity1 = 1;
    // $scope.userCity2 = 1;
    // $scope.userCity3 = 1;

    if ($scope.userName == 'admin') {
        $scope.userName = '系统管理员';
    }
    $scope.password = {};
    $scope.isManageUser = -1;
    $scope.cityName = "";
    $scope.cityLevel = '0';
    $scope.tableIndex = '0';
    $scope.citys1 = [{ "name": "内江市", "flag": false }, { "name": "自贡市", "flag": false }, { "name": "泸州市", "flag": false }];
    $scope.citys2 = [{ "name": "内江市东兴区", "flag": false }, { "name": "内江市市中区", "flag": false }, { "name": "自贡市大安区", "flag": false }, { "name": "自贡市沿滩区", "flag": false },
    { "name": "自贡市富顺县", "flag": false }, { "name": "泸州市泸县", "flag": false }, { "name": "泸州市龙马潭区", "flag": false }];
    $scope.citys3 = [{ "name": "内江市东兴区高桥街道办", "flag": false }, { "name": "内江市东兴区郭北镇", "flag": false }, { "name": "内江市东兴区东兴街道", "flag": false }, { "name": "内江市东兴区胜利街道", "flag": false },
    { "name": "内江市东兴区新江街道", "flag": false }, { "name": "内江市市中区乐贤街道", "flag": false }, { "name": "内江市市中区白马镇", "flag": false }, { "name": "内江市市中区凤鸣镇", "flag": false },
    { "name": "内江市市中区交通镇", "flag": false }, { "name": "内江市市中区永安镇", "flag": false }, { "name": "内江市市中区伏龙镇", "flag": false }, { "name": "内江市市中区凌家镇", "flag": false },
    { "name": "自贡市大安区何市镇", "flag": false }, { "name": "自贡市大安区三多寨镇", "flag": false }, { "name": "自贡市沿滩区仙市镇", "flag": false }, { "name": "自贡市沿滩区瓦市镇", "flag": false },
    { "name": "自贡市富顺县互助镇", "flag": false }, { "name": "自贡市富顺县富世镇", "flag": false }, { "name": "自贡市富顺县狮市镇", "flag": false }, { "name": "自贡市富顺县东湖镇", "flag": false },
    { "name": "自贡市富顺县骑龙镇", "flag": false }, { "name": "自贡市富顺县童寺镇", "flag": false }, { "name": "自贡市富顺县古佛镇", "flag": false }, { "name": "自贡市富顺县龙万乡", "flag": false },
    { "name": "自贡市富顺县代寺镇", "flag": false }, { "name": "自贡市富顺县中石镇", "flag": false },
    { "name": "泸州市泸县玉蝉街道办事处", "flag": false }, { "name": "泸州市泸县福集镇", "flag": false }, { "name": "泸州市泸县富集镇", "flag": false }, { "name": "泸州市泸县牛滩镇", "flag": false },
    { "name": "泸州市泸县德胜镇", "flag": false }, { "name": "泸州市龙马潭区双加镇", "flag": false }, { "name": "泸州市龙马潭区石洞镇", "flag": false }, { "name": "泸州市龙马潭区鱼塘镇", "flag": false },
    { "name": "泸州市龙马潭区安宁镇", "flag": false }];
    $scope.currPage = 1;
    $scope.totalPages = 1;
    //框架函数
    $scope.isShowCity1 = isShowCity1;
    $scope.isShowCity2 = isShowCity2;
    $scope.isShowCity3 = isShowCity3;
    $scope.selectItem = selectItem;
    $scope.selectTable = selectTable;
    $scope.manageUser = manageUser;
    $scope.manageTable = manageTable;
    $scope.logout = logout;
    $scope.modifyPassword = modifyPassword;
    //分页
    $scope.getNextPage = getNextPage;
    //导出excel
    $scope.outputExcel = outputExcel;
    $scope.output2Excel = output2Excel;
    //表一相关
    $scope.curTable1 = {}; //表一当前添加数据
    $scope.autoID = 0;       //表一当前行数
    $scope.table1Datas = []; //表一所有数据
    $scope.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 }; //表一合计
    $scope.getAllTable1Datas = getAllTable1Datas;//增删改查
    $scope.getTable1ByPK = getTable1ByPK;
    $scope.deleteTable1 = deleteTable1;
    $scope.saveTable1Data = saveTable1Data;
    //用户表相关
    $scope.peopleLists = []; //所有户主列表
    $scope.current = null;   //当前正在操作的户主
    $scope.filterText = null //户主列表过滤关键字
    $scope.searchName = null;//选择的户主
    $scope.filter = filterCustomer; //户主列表过滤
    $scope.search = search;         //根据户主搜索
    $scope.getPeopleList = getPeopleList;
    //表二相关
    $scope.table2Datas = [];                            //表二所有数据
    $scope.table2Total = { "total": 0, "total2": 0 };   //表二合计数据
    $scope.Table2Type1 = [];                             //表二价格标准1
    $scope.Table2Type2 = [];                             //表二价格标准2
    $scope.updateTable2 = updateTable2;                 //更改表二标准
    //表三相关
    $scope.curTable3 = {}; //表三当前添加数据
    $scope.table3Datas = []; //表三所有数据
    $scope.buildingNames = ["框架", "砖混", "砖瓦", "土木"];//表三建筑物类别
    $scope.getTable3ByPK = getTable3ByPK;
    $scope.saveTable3Data = saveTable3Data;
    $scope.deleteTable3 = deleteTable3;
    //表四相关
    $scope.curTable4 = {};  //表四当前编辑数据
    $scope.table4Datas = []; //表四所有数据
    $scope.table4Total = {}; //合计
    $scope.getAllTable4Datas = getAllTable4Datas; //根据户主ID获取表四数据
    $scope.getTable4ByPK = getTable4ByPK;
    $scope.updateTable4 = updateTable4;
    //权限表相关
    $scope.userDatas = [];
    $scope.curUser = {};
    $scope.newUser = {};
    $scope.addUser = addUser;
    $scope.updateUser = updateUser;
    $scope.deleteUser = deleteUser;
    $scope.getUserByName = getUserByName;
    //表4-1相关
    $scope.table411Datas = [];
    $scope.currTable411 = {};
    $scope.table411Total = { "city4Name": '', "t1": 0, "t2": 0 };
    $scope.table412Datas = [];
    $scope.table412Total = { "city4Name": '', "t1": 0, "t2": 0 };
    $scope.table413Datas = [];
    $scope.curTable413 = { 'name': '', 'id': '', 'quantity': '', 'price': '', 'total': '', 'text': '' };
    $scope.table413Total = { "city4Name": '', "t1": 0, "t2": 0 };
    $scope.c4CurrList = [];
    $scope.table413Datas = [];
    $scope.getC4List = getC4List; //根据镇名获取下属村列表
    $scope.getAllTable411Datas = getAllTable411Datas;      //根据村名获取4-1青苗数据
    $scope.getTable411mIdByPK = getTable411mIdByPK;        //根据户名显示凭证编号
    $scope.saveTable411mId = saveTable411mId;
    $scope.getAllTable412Datas = getAllTable412Datas;      //根据村名获取4-1建筑物数据
    $scope.getTable412mIdByPK = getTable412mIdByPK;        //根据户名显示凭证编号
    $scope.saveTable412mId = saveTable412mId;
    $scope.getAllTable413Datas = getAllTable413Datas;      //根据村名获取4-1土地
    $scope.getTable413ByPK = getTable413ByPK;
    $scope.deleteTable413 = deleteTable413;
    $scope.saveTable413Data = saveTable413Data;
    //表4-2相关
    $scope.table42Datas = [];
    $scope.realtable42Datas = [];
    $scope.table42Total = { "t1": 0, "t2": 0 };
    $scope.getAllTable42Datas = getAllTable42Datas;      //获取4-2数据
    $scope.currTable42 = {};
    $scope.getTable42mIdByPK = getTable42mIdByPK;        //根据户名显示凭证编号
    $scope.saveTable42mId = saveTable42mId;
    //表4-3相关
    $scope.curTable43 = {};
    $scope.table43Datas = [];
    $scope.table43Total = { "t1": 0, "t2": 0 };
    $scope.getAllTable43Datas = getAllTable43Datas;      //获取4-3数据
    $scope.saveTable43Data = saveTable43Data;
    $scope.getTable43ByPK = getTable43ByPK;
    $scope.deleteTable43 = deleteTable43;
    //表1-1相关
    $scope.table11DatasP1 = []; //第一页
    $scope.table11TotalP1 = {};
    $scope.table11DatasP2 = []; //第二页
    $scope.table11TotalP2 = {};
    $scope.table11DatasP3 = []; //第三页
    $scope.table11TotalP3 = {};
    $scope.getAllTable11Datas = getAllTable11Datas;      //获取1-1数据
    //表1-2相关
    $scope.c3CurrList = [];
    $scope.table12DatasP1 = []; //第一页
    $scope.table12TotalP1 = {};
    $scope.table12DatasP2 = []; //第二页
    $scope.table12TotalP2 = {};
    $scope.table12DatasP3 = []; //第三页
    $scope.table12TotalP3 = {};
    $scope.getAllTable12Datas = getAllTable12Datas;      //获取1-1数据
    //表5相关
    $scope.curTable5 = {};
    $scope.table5Datas = [];
    $scope.table5Total = { "area": 0, "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "total": 0 };
    $scope.getAllTable5Datas = getAllTable5Datas;
    $scope.saveTable5Data = saveTable5Data;
    $scope.getTable5ByPK = getTable5ByPK;
    $scope.deleteTable5 = deleteTable5;
    //表7-1相关
    $scope.curTable71 = {};
    $scope.table71Datas = [];
    $scope.table71Total = { "a1": 0, "b1": 0, "t1": 0, "f1": 0, "m1": 0, "a2": 0, "b2": 0, "t2": 0, "f2": 0, "m2": 0 };
    $scope.getAllTable71Datas = getAllTable71Datas;
    $scope.saveTable71Data = saveTable71Data;
    $scope.getTable71ByPK = getTable71ByPK;
    $scope.deleteTable71 = deleteTable71;
    //表7相关
    $scope.c2CurrList = [];
    $scope.table7Datas = [];
    $scope.table7Total = { "a1": 0, "b1": 0, "t1": 0, "f1": 0, "m1": 0, "a2": 0, "b2": 0, "t2": 0, "f2": 0, "m2": 0 };
    $scope.getAllTable7Datas = getAllTable7Datas;
    $scope.saveTable7Line = saveTable7Line;
    //表9-1相关
    $scope.table91Datas = [];
    $scope.table91NumDatas = ["", "", "", "", "", "", "", "二"];
    $scope.table91NameDatas = ["1、土地补偿费", "2、安置补偿费", "3、人员社保补贴费用", "4、青苗补偿费", "5、房屋安置费用",
        "6、地上附着物", "7、农户搬迁及相关费费用", "工作经费"];
    $scope.table91Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
    $scope.getAllTable91Datas = getAllTable91Datas;
    $scope.saveTable91Data = saveTable91Data;
    $scope.saveTable9Line = saveTable9Line;
    //表9-2相关
    $scope.table92Datas = [];
    $scope.table92Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
    //表9-3相关
    $scope.table93Datas = [];
    $scope.table93NumDatas = ["一", "", "", "", "", "", "二", "三"];
    $scope.table93NameDatas = ["征地补偿及拆迁安置费用", "", "", "", "", "", "工作经费", "税费"];
    $scope.table93Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
    $scope.getAllTable93Datas = getAllTable93Datas;
    $scope.saveTable93Data = saveTable93Data;
    //表9相关
    $scope.t9Data1 = {};
    $scope.t9Data5 = [1, 2, 3];
    $scope.t9Data3 = {};
    $scope.t9Data4 = {};
    $scope.t9Data2 = {};
    $scope.table9Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
    //表10-1相关
    $scope.table101Datas = [];
    $scope.table101Datas2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    $scope.table101NumDatas = ["一", "二"];
    $scope.table101NameDatas = ["国有土地", "集体土地"];
    $scope.table101Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
    $scope.getAllTable101Datas = getAllTable101Datas;
    $scope.saveTable101Data = saveTable101Data;



    /*
     * 内部函数
     */
    function saveTable7Line(c2, line) {
        console.log(c2 + line);
        $http.get($scope.testUrl + 'updateTable7Line?c2=' + c2 + '&line=' + line)//里程
            .success(function (res) {
                alert("更新成功！");
            })
            .error(function (res) {
                alert("更新失败，请重试");
            });
    }
    function getAllTable7Datas() {
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable7Line')//里程
            .success(function (res) {
                mIdList = res;
            })
            .error(function (res) {
            });

        var count = 0;
        $scope.table7Datas = [];
        $scope.table7Total = { "a1": 0, "b1": 0, "t1": 0, "f1": 0, "m1": 0, "a2": 0, "b2": 0, "t2": 0, "f2": 0, "m2": 0 };
        for (var k = 0; k < $scope.c2CurrList.length; k++) {
            $http.get($scope.testUrl + 'getTable7?city=' + $scope.cityName + $scope.c2CurrList[k])
                .success(function (res) {
                    //console.log(JSON.stringify(res));
                    for (var i = 0; i < res.length; i++) {
                        var new7 = new Object();
                        new7.c2 = $scope.c2CurrList[count];
                        for (var j = 0; j < mIdList.length; j++) {
                            if (mIdList[j].c2 == new7.c2) {
                                new7.line = mIdList[j].line;
                            }
                        }
                        count++;
                        var t7Arr = ['a1', 'b1', 'f1', 'm1', 'a2', 'b2', 'f2', 'm2'];
                        for (var j = 0; j < t7Arr.length; j++) {
                            var sumVar = 'sum(' + t7Arr[j] + ')';
                            new7[t7Arr[j]] = res[i][sumVar];
                        }
                        new7.t1 = new7.a1 + new7.b1;
                        new7.t2 = new7.a2 + new7.b2;
                        var t7Arr2 = ['a1', 'b1', 't1', 'f1', 'm1', 'a2', 'b2', 't2', 'f2', 'm2'];
                        for (var j = 0; j < t7Arr2.length; j++) {
                            $scope.table7Total[t7Arr2[j]] = $scope.table7Total[t7Arr2[j]] + new7[t7Arr2[j]];
                        }
                        $scope.table7Datas.push(new7);
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
    }
    function modifyPassword() {
        if ($scope.password.p2 != $scope.password.p3) {
            alert("两次输入新密码不一致，请重新输入！");
        }
        else {
            $http.get($scope.testUrl + 'login?name=' + $scope.userName + '&passWord=' + $scope.password.p1)
                .success(function (res) {
                    if (res['ok'] == -1)
                        alert("帐号不存在");
                    else if (res['ok'] == 0)
                        alert("旧密码输入错误");
                    else {
                        console.log($scope.password.p2);
                        $http.get($scope.testUrl + 'modifyPassword?name=' + $scope.userName + '&passWord=' + $scope.password.p2)
                            .success(function (res) {
                                alert("修改密码成功！");
                            })
                            .error(function (res) {
                                alert("修改失败");
                            });
                        $scope.password = {};
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
    }
    function logout() {
        user.name = '';
        $location.path("/");
    }
    function saveTable101Data(autoID, index) {
        //unit price a1 a2 a3 a4 autoID
        var urlPara = '';
        var t1Para = ['unit', 'price', "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", 'autoID'];
        for (let i = 0; i < t1Para.length; i++) {
            urlPara = urlPara + t1Para[i] + '=' + $scope.table101Datas[index][t1Para[i]] + '&';
        }
        console.log(urlPara);
        $http.get($scope.testUrl + 'updateTable101?' + urlPara)
            .success(function (res) {
                alert("更新表101成功！");
            })
            .error(function (res) {
                alert("更新表101数据出错");
            });
        getAllTable101Datas();
    }
    function getAllTable101Datas() {
        $scope.table101Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
        $http.get($scope.testUrl + 'getTable101?city=' + $scope.cityName)
            .success(function (res) {
                $scope.table101Datas = res;
                for (var i = 0; i < res.length; i++) {
                    var t101Arr = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4"];
                    for (var j = 0; j < t101Arr.length; j++) {
                        res[i][t101Arr[j]] = res[i][t101Arr[j]] * 1;
                        $scope.table101Total[t101Arr[j]] = $scope.table101Total[t101Arr[j]] + res[i][t101Arr[j]];
                    }
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable9Line(id, unit) {
        $http.get($scope.testUrl + 'updateTable9Unit?city=' + $scope.cityName + '&id=' + id + "&unit=" + unit)
            .success(function (res) {
                alert("更新成功！");
            })
            .error(function (res) {
                alert("更新失败，请重试");
            });
    }
    function getAllTable9Datas() {
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable9Unit?city=' + $scope.cityName)//里程
            .success(function (res) {
                mIdList = res;
            })
            .error(function (res) {
            });

        $scope.table91Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
        $http.get($scope.testUrl + 'getTable9L1?city=' + $scope.cityName)
            .success(function (res) {
                $scope.t9Data1.a1 = res[0]['sum(a1)'];
                $scope.t9Data1.b1 = res[0]['sum(a1*price)'];
                $scope.t9Data1.a2 = res[0]['sum(a2)'];
                $scope.t9Data1.b2 = res[0]['sum(a2*price)'];
                $scope.t9Data1.a3 = res[0]['sum(a3)'];
                $scope.t9Data1.b3 = res[0]['sum(a3*price)'];
                $scope.t9Data1.a4 = res[0]['sum(a4)'];
                $scope.t9Data1.b4 = res[0]['sum(a4*price)'];
                for (var k = 0; k < mIdList.length; k++) {
                    if (mIdList[k].id == 1) {
                        $scope.t9Data1.unit = mIdList[k].unit;
                    }
                }
                $scope.t9Data1.price = ($scope.t9Data1.b4 / $scope.t9Data1.a4).toFixed(2);
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'getTable9L2?city=' + $scope.cityName)
            .success(function (res) {
                $scope.t9Data2.a1 = res[0]['sum(a1)'];
                $scope.t9Data2.b1 = res[0]['sum(a1*price)'];
                $scope.t9Data2.a2 = res[0]['sum(a2)'];
                $scope.t9Data2.b2 = res[0]['sum(a2*price)'];
                $scope.t9Data2.a3 = res[0]['sum(a3)'];
                $scope.t9Data2.b3 = res[0]['sum(a3*price)'];
                $scope.t9Data2.a4 = res[0]['sum(a4)'];
                $scope.t9Data2.b4 = res[0]['sum(a4*price)'];
                for (var k = 0; k < mIdList.length; k++) {
                    if (mIdList[k].id == 2) {
                        $scope.t9Data2.unit = mIdList[k].unit;
                    }
                }
                $scope.t9Data2.price = ($scope.t9Data2.b4 / $scope.t9Data2.a4).toFixed(2);
            })
            .error(function (res) {
            });
        $http.get($scope.testUrl + 'getTable9L4?city=' + $scope.cityName)
            .success(function (res) {
                $scope.t9Data4.a1 = res[0]['sum(a1)'];
                $scope.t9Data4.b1 = res[0]['sum(a1*price)'];
                $scope.t9Data4.a2 = res[0]['sum(a2)'];
                $scope.t9Data4.b2 = res[0]['sum(a2*price)'];
                $scope.t9Data4.a3 = res[0]['sum(a3)'];
                $scope.t9Data4.b3 = res[0]['sum(a3*price)'];
                $scope.t9Data4.a4 = res[0]['sum(a4)'];
                $scope.t9Data4.b4 = res[0]['sum(a4*price)'];
                for (var k = 0; k < mIdList.length; k++) {
                    if (mIdList[k].id == 4) {
                        $scope.t9Data4.unit = mIdList[k].unit;
                    }
                }
                $scope.t9Data4.price = ($scope.t9Data4.b4 / $scope.t9Data4.a4).toFixed(2);
            })
            .error(function (res) {
            });
        $http.get($scope.testUrl + 'getTable9L31?city=' + $scope.cityName)
            .success(function (res) {
                $scope.t9Data3.a1 = res[0]['sum(a1)'];
                $scope.t9Data3.b1 = res[0]['sum(a1*price)'];
                $scope.t9Data3.a2 = res[0]['sum(a2)'];
                $scope.t9Data3.b2 = res[0]['sum(a2*price)'];
                $scope.t9Data3.a3 = res[0]['sum(a3)'];
                $scope.t9Data3.b3 = res[0]['sum(a3*price)'];
                $scope.t9Data3.a4 = res[0]['sum(a4)'];
                $scope.t9Data3.b4 = res[0]['sum(a4*price)'];
                $http.get($scope.testUrl + 'getTable9L32?city=' + $scope.cityName)
                    .success(function (res) {
                        $scope.t9Data3.a1 = $scope.t9Data3.a1 + res[0]['sum(a1)'];
                        $scope.t9Data3.b1 = $scope.t9Data3.b1 + res[0]['sum(a1*price)'];
                        $scope.t9Data3.a2 = $scope.t9Data3.a2 + res[0]['sum(a2)'];
                        $scope.t9Data3.b2 = $scope.t9Data3.b2 + res[0]['sum(a2*price)'];
                        $scope.t9Data3.a3 = $scope.t9Data3.a3 + res[0]['sum(a3)'];
                        $scope.t9Data3.b3 = $scope.t9Data3.b3 + res[0]['sum(a3*price)'];
                        $scope.t9Data3.a4 = $scope.t9Data3.a4 + res[0]['sum(a4)'];
                        $scope.t9Data3.b4 = $scope.t9Data3.b4 + res[0]['sum(a4*price)'];
                        for (var k = 0; k < mIdList.length; k++) {
                            if (mIdList[k].id == 3) {
                                $scope.t9Data3.unit = mIdList[k].unit;
                            }
                        }
                        $scope.t9Data3.price = ($scope.t9Data3.b4 / $scope.t9Data3.a4).toFixed(2);
                    })
                    .error(function (res) {
                    });
            })
            .error(function (res) {
            });
    }
    function saveTable93Data(autoID, index) {
        //unit price a1 a2 a3 a4 autoID
        var urlPara = '';
        var t1Para = ['unit', 'price', "a1", "a2", "a3", "a4", 'autoID'];
        for (let i = 0; i < t1Para.length; i++) {
            urlPara = urlPara + t1Para[i] + '=' + $scope.table93Datas[index][t1Para[i]] + '&';
        }
        console.log(urlPara);
        $http.get($scope.testUrl + 'updateTable93?' + urlPara)
            .success(function (res) {
                alert("更新表93成功！");
            })
            .error(function (res) {
                alert("更新表93数据出错");
            });
        getAllTable93Datas();
    }
    function getAllTable93Datas() {
        $scope.table93Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
        $http.get($scope.testUrl + 'getTable93?city=' + $scope.cityName)
            .success(function (res) {
                res.sort(function (a, b) {
                    return a.index1 - b.index1
                });
                // console.log(JSON.stringify(res));

                $scope.table93Datas = res;
                for (var i = 0; i < res.length; i++) {
                    var t93Arr = ["a1", "a2", "a3", "a4"];
                    for (var j = 0; j < t93Arr.length; j++) {
                        res[i][t93Arr[j]] = res[i][t93Arr[j]] * 1;
                        $scope.table93Total[t93Arr[j]] = $scope.table93Total[t93Arr[j]] + res[i][t93Arr[j]];
                    }
                    $scope.table93Datas[i].b1 = res[i].a1 * res[i].price;
                    $scope.table93Datas[i].b2 = res[i].a2 * res[i].price;
                    $scope.table93Datas[i].b3 = res[i].a3 * res[i].price;
                    $scope.table93Datas[i].b4 = res[i].a4 * res[i].price;
                    $scope.table93Total.b1 = $scope.table93Total.b1 + $scope.table93Datas[i].b1;
                    $scope.table93Total.b2 = $scope.table93Total.b2 + $scope.table93Datas[i].b2;
                    $scope.table93Total.b3 = $scope.table93Total.b3 + $scope.table93Datas[i].b3;
                    $scope.table93Total.b4 = $scope.table93Total.b4 + $scope.table93Datas[i].b4;
                }
                //console.log(JSON.stringify($scope.table93Datas));
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getAllTable92Datas() {
        $scope.table92Datas = [];
        $scope.table91Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
        $http.get($scope.testUrl + 'getTable92Sum?city=' + $scope.cityName)
            .success(function (res) {
                $scope.table92Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
                for (var j = 0; j < res.length; j++) {
                    var new92 = new Object();
                    new92.index1 = res[j].index1;
                    new92.a1 = res[j]["sum(a1)"];
                    new92.a2 = res[j]["sum(a2)"];
                    new92.a3 = res[j]["sum(a3)"];
                    new92.a4 = res[j]["sum(a4)"];
                    $scope.table92Total.a1 = $scope.table92Total.a1 + new92.a1;
                    $scope.table92Total.a2 = $scope.table92Total.a2 + new92.a2;
                    $scope.table92Total.a3 = $scope.table92Total.a3 + new92.a3;
                    $scope.table92Total.a4 = $scope.table92Total.a4 + new92.a4;
                    $scope.table92Datas.push(new92);
                }
                console.log($scope.testUrl + 'getTable92?city=' + $scope.cityName);
                $http.get($scope.testUrl + 'getTable92?city=' + $scope.cityName)
                    .success(function (res2) {
                        console.log(JSON.stringify(res2));
                        for (var j = 0; j < res2.length; j++) {
                            for (var i = 0; i < 8; i++) {
                                if (res2[j].index1 == $scope.table92Datas[i].index1) {
                                    console.log("i:" + i + ";j:" + j);
                                    if (res2[j].unit != null && res2[j].price != null) {
                                        $scope.table92Datas[i].unit = res2[j].unit;
                                        $scope.table92Datas[i].price = res2[j].price;
                                        $scope.table92Datas[i].b1 = $scope.table92Datas[i].a1 * res2[j].price;
                                        $scope.table92Datas[i].b2 = $scope.table92Datas[i].a2 * res2[j].price;
                                        $scope.table92Datas[i].b3 = $scope.table92Datas[i].a3 * res2[j].price;
                                        $scope.table92Datas[i].b4 = $scope.table92Datas[i].a4 * res2[j].price;
                                    }
                                    break;
                                }
                            }
                        }
                        var t92Arr = ['b1', 'b2', 'b3', 'b4'];
                        for (var i = 0; i < 8; i++) {
                            for (var j = 0; j < t92Arr.length; j++) {
                                if ($scope.table92Datas[i][t92Arr[j]] == null) {
                                    $scope.table92Datas[i][t92Arr[j]] = 0;
                                }
                                $scope.table92Total[t92Arr[j]] = $scope.table92Total[t92Arr[j]] + $scope.table92Datas[i][t92Arr[j]];
                            }
                        }
                        $scope.table92Datas.sort(function (a, b) {
                            return a.index1 - b.index1
                        });
                        //console.log(JSON.stringify($scope.table92Datas));
                    })
                    .error(function (res2) {
                    });
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable91Data(autoID, index) {
        //unit price a1 a2 a3 a4 autoID
        var urlPara = '';
        var t1Para = ['unit', 'price', "a1", "a2", "a3", "a4", 'autoID'];
        for (let i = 0; i < t1Para.length; i++) {
            urlPara = urlPara + t1Para[i] + '=' + $scope.table91Datas[index][t1Para[i]] + '&';
        }
        console.log(urlPara);
        $http.get($scope.testUrl + 'updateTable91?' + urlPara)
            .success(function (res) {
                alert("更新表91成功！");
            })
            .error(function (res) {
                alert("更新表91数据出错");
            });
        getAllTable91Datas();
    }
    function getAllTable91Datas() {
        $scope.table91Total = { "a1": 0, "b1": 0, "a2": 0, "b2": 0, "a3": 0, "b3": 0, "a4": 0, "b4": 0 };
        $http.get($scope.testUrl + 'getTable91?city=' + $scope.cityName)
            .success(function (res) {
                res.sort(function (a, b) {
                    return a.index1 - b.index1
                });
                // console.log(JSON.stringify(res));

                $scope.table91Datas = res;
                for (var i = 0; i < res.length; i++) {
                    var t91Arr = ["a1", "a2", "a3", "a4"];
                    for (var j = 0; j < t91Arr.length; j++) {
                        res[i][t91Arr[j]] = res[i][t91Arr[j]] * 1;
                        $scope.table91Total[t91Arr[j]] = $scope.table91Total[t91Arr[j]] + res[i][t91Arr[j]];
                    }
                    $scope.table91Datas[i].b1 = res[i].a1 * res[i].price;
                    $scope.table91Datas[i].b2 = res[i].a2 * res[i].price;
                    $scope.table91Datas[i].b3 = res[i].a3 * res[i].price;
                    $scope.table91Datas[i].b4 = res[i].a4 * res[i].price;
                    $scope.table91Total.b1 = $scope.table91Total.b1 + $scope.table91Datas[i].b1;
                    $scope.table91Total.b2 = $scope.table91Total.b2 + $scope.table91Datas[i].b2;
                    $scope.table91Total.b3 = $scope.table91Total.b3 + $scope.table91Datas[i].b3;
                    $scope.table91Total.b4 = $scope.table91Total.b4 + $scope.table91Datas[i].b4;
                }
                //console.log(JSON.stringify($scope.table91Datas));
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getTable71ByPK(autoID) {
        $http.get($scope.testUrl + 'getTable71ByPK?autoID=' + autoID)
            .success(function (res) {
                $scope.curTable71 = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function deleteTable71(autoID) {
        $http.get($scope.testUrl + 'deleteTable71?autoID=' + autoID)
            .success(function (res) {
                alert("删除成功！");
                getAllTable71Datas();
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable71Data() {
        //更新   //c3 line a1 b1 f1 m1 a2 b2 f2 m2 city
        if ($scope.curTable71 != null && $scope.curTable71.autoID != null) {
            var urlPara = '';
            var t1Para = ['c3', 'line', "a1", "b1", "f1", "m1", "a2", "b2", "f2", "m2", 'autoID'];
            for (let i = 0; i < t1Para.length; i++) {
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable71[t1Para[i]] + '&';
            }
            //console.log(urlPara);
            $http.get($scope.testUrl + 'updateTable71?' + urlPara)
                .success(function (res) {
                    alert("更新表71成功！");
                })
                .error(function (res) {
                    alert("更新表71数据出错");
                });
            getAllTable71Datas($scope.currPage);
        }
        //添加
        else {
            $scope.curTable71.city = $scope.cityName;
            var urlPara = '';
            var t1Para = ['c3', 'line', "a1", "b1", "f1", "m1", "a2", "b2", "f2", "m2", 'city'];
            for (let i = 0; i < t1Para.length; i++) {
                if ($scope.curTable71[t1Para[i]] == null)
                    $scope.curTable71[t1Para[i]] = '';
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable71[t1Para[i]] + '&';
            }
            //console.log(urlPara);
            $http.get($scope.testUrl + 'addTable71?' + urlPara)
                .success(function (res) {
                    alert("添加表71成功！");
                })
                .error(function (res) {
                    alert("添加表71数据出错");
                });
            $http.get($scope.testUrl + 'getTable71Count?city=' + $scope.cityName)//1.取到总页数
                .success(function (res) {
                    if ($scope.totalPages < Math.ceil(res[0]["count(*)"] / 10)) {
                        getAllTable71Datas($scope.totalPages + 1);
                    }
                    else {
                        getAllTable71Datas($scope.totalPages);
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        $scope.curTable71 = {};
    }
    function getAllTable71Datas(page) {
        $scope.currPage = page;
        $scope.table71Datas = [];
        $http.get($scope.testUrl + 'getTable71Count?city=' + $scope.cityName)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });

        $scope.table71Total = { "a1": 0, "b1": 0, "t1": 0, "f1": 0, "m1": 0, "a2": 0, "b2": 0, "t2": 0, "f2": 0, "m2": 0 };
        $http.get($scope.testUrl + 'getTable71?city=' + $scope.cityName + '&page=' + page)
            .success(function (res) {
                $scope.table71Datas = res;
                for (var i = 0; i < res.length; i++) {
                    var t71Arr = ["a1", "b1", "f1", "m1", "a2", "b2", "f2", "m2"];
                    for (var j = 0; j < t71Arr.length; j++) {
                        res[i][t71Arr[j]] = res[i][t71Arr[j]] * 1;
                        $scope.table71Total[t71Arr[j]] = $scope.table71Total[t71Arr[j]] + res[i][t71Arr[j]];
                    }
                    $scope.table71Datas[i].t1 = res[i].a1 + res[i].b1;
                    $scope.table71Datas[i].t2 = res[i].a2 + res[i].b2;
                    $scope.table71Total.t1 = $scope.table71Total.t1 + $scope.table71Datas[i].t1;
                    $scope.table71Total.t2 = $scope.table71Total.t2 + $scope.table71Datas[i].t2;
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getTable5ByPK(autoID) {
        $http.get($scope.testUrl + 'getTable5ByPK?autoID=' + autoID)
            .success(function (res) {
                $scope.curTable5 = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function deleteTable5(autoID) {
        $http.get($scope.testUrl + 'deleteTable5?autoID=' + autoID)
            .success(function (res) {
                alert("删除成功！");
                getAllTable5Datas($scope.currPage);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable5Data() {
        //更新  // id name address area a1 a2 a3 a4 a5 doc city
        if ($scope.curTable5 != null && $scope.curTable5.autoID != null) {
            var urlPara = '';
            var t1Para = ['name', 'id', 'address', 'area', 'a1', 'a2', 'a3', 'a4', 'a5', 'doc', 'autoID'];
            for (let i = 0; i < t1Para.length; i++) {
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable5[t1Para[i]] + '&';
            }
            //console.log(urlPara);
            $http.get($scope.testUrl + 'updateTable5?' + urlPara)
                .success(function (res) {
                    alert("更新表5成功！");
                })
                .error(function (res) {
                    alert("更新表5数据出错");
                });
            getAllTable5Datas($scope.currPage);
        }
        //添加
        else {
            //name id type unit quantity price total city
            $scope.curTable5.city = $scope.cityName;
            var urlPara = '';
            var t1Para = ['name', 'id', 'address', 'area', 'a1', 'a2', 'a3', 'a4', 'a5', 'doc', 'city'];
            for (let i = 0; i < t1Para.length; i++) {
                if ($scope.curTable5[t1Para[i]] == null)
                    $scope.curTable5[t1Para[i]] = '';
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable5[t1Para[i]] + '&';
            }
            console.log(urlPara);
            $http.get($scope.testUrl + 'addTable5?' + urlPara)
                .success(function (res) {
                    alert("添加表5成功！");
                })
                .error(function (res) {
                    alert("添加表5数据出错");
                });
            $http.get($scope.testUrl + 'getTable5Count?city=' + $scope.cityName)//1.取到总页数
                .success(function (res) {
                    if ($scope.totalPages < Math.ceil(res[0]["count(*)"] / 10)) {
                        getAllTable5Datas($scope.totalPages + 1);
                    }
                    else {
                        getAllTable5Datas($scope.totalPages);
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        $scope.curTable5 = {};
    }
    function getAllTable5Datas(page) {
        $scope.currPage = page;
        $scope.table5Datas = [];
        $http.get($scope.testUrl + 'getTable5Count?city=' + $scope.cityName)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });

        $scope.table5Total = { "area": 0, "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "total": 0 };
        $http.get($scope.testUrl + 'getTable5?city=' + $scope.cityName + '&page=' + page)
            .success(function (res) {
                $scope.table5Datas = res;
                for (var i = 0; i < res.length; i++) {
                    res[i].area = res[i].area * 1;
                    res[i].a1 = res[i].a1 * 1;
                    res[i].a2 = res[i].a2 * 1;
                    res[i].a3 = res[i].a3 * 1;
                    res[i].a4 = res[i].a4 * 1;
                    res[i].a5 = res[i].a5 * 1;
                    $scope.table5Datas[i].total = res[i].a1 + res[i].a2 + res[i].a3 + res[i].a4 + res[i].a5;
                    $scope.table5Datas[i].total = $scope.table5Datas[i].total * 1;
                    $scope.table5Total.area = $scope.table5Total.area + res[i].area;
                    $scope.table5Total.a1 = $scope.table5Total.a1 + res[i].a1;
                    $scope.table5Total.a2 = $scope.table5Total.a2 + res[i].a2;
                    $scope.table5Total.a3 = $scope.table5Total.a3 + res[i].a3;
                    $scope.table5Total.a4 = $scope.table5Total.a4 + res[i].a4;
                    $scope.table5Total.a5 = $scope.table5Total.a5 + res[i].a5;
                    $scope.table5Total.total = $scope.table5Total.total + $scope.table5Datas[i].total;
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getTable43ByPK(autoID) {
        $http.get($scope.testUrl + 'getTable43ByPK?autoID=' + autoID)
            .success(function (res) {
                $scope.curTable43 = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function deleteTable43(autoID) {
        $http.get($scope.testUrl + 'deleteTable43?autoID=' + autoID)
            .success(function (res) {
                alert("删除成功！");
                getAllTable43Datas($scope.currPage);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable43Data() {
        //更新
        if ($scope.curTable43 != null && $scope.curTable43.autoID != null) {
            var urlPara = '';
            var t1Para = ['name', 'id', 'type', 'price', 'total', 'unit', 'quantity', 'autoID'];
            for (let i = 0; i < t1Para.length; i++) {
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable43[t1Para[i]] + '&';
            }
            //console.log(urlPara);
            $http.get($scope.testUrl + 'updateTable43?' + urlPara)
                .success(function (res) {
                    alert("更新表4-3成功！");
                })
                .error(function (res) {
                    alert("更新表4-3数据出错");
                });
            getAllTable43Datas($scope.currPage);
        }
        //添加
        else {
            //name id type unit quantity price total city
            $scope.curTable43.city = $scope.cityName;
            var urlPara = '';
            var t1Para = ['name', 'id', 'type', 'price', 'total', 'unit', 'quantity', 'city'];
            for (let i = 0; i < t1Para.length; i++) {
                if ($scope.curTable43[t1Para[i]] == null)
                    $scope.curTable43[t1Para[i]] = '';
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable43[t1Para[i]] + '&';
            }
            console.log(urlPara);
            $http.get($scope.testUrl + 'addTable43?' + urlPara)
                .success(function (res) {
                    alert("添加表4-3成功！");
                })
                .error(function (res) {
                    alert("添加表4-3数据出错");
                });
            $http.get($scope.testUrl + 'getTable43Count?city=' + $scope.cityName)//1.取到总页数
                .success(function (res) {
                    if ($scope.totalPages < Math.ceil(res[0]["count(*)"] / 10)) {
                        getAllTable43Datas($scope.totalPages + 1);
                    }
                    else {
                        getAllTable43Datas($scope.totalPages);
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        $scope.curTable43 = {};

    }
    function getAllTable43Datas(page) {
        $scope.currPage = page;
        $scope.table43Datas = [];
        $scope.table43Total = { "t1": 0, "t2": 0 };
        $http.get($scope.testUrl + 'getTable43Count?city=' + $scope.cityName)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'getTable43?city=' + $scope.cityName + '&page=' + page)
            .success(function (res) {
                $scope.table43Datas = res;
                for (var i = 0; i < res.length; i++) {
                    res[i].quantity = res[i].quantity * 1;
                    res[i].total = res[i].total * 1;
                    $scope.table43Total.t1 = $scope.table43Total.t1 + res[i].quantity;
                    $scope.table43Total.t2 = $scope.table43Total.t2 + res[i].total;
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getAllTable12Datas() {
        $scope.table12TotalP1 = {
            "area": 0, "familys": 0, "t1": 0, "t2": 0, "t3": 0, "t4": 0, "total": 0,
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0
        };
        $scope.table12DatasP1 = [];
        $scope.table12TotalP2 = {
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0,
            "a7": 0, "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0
        };
        $scope.table12DatasP2 = [];
        $scope.table12TotalP3 = {
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0,
            "a7": 0, "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0, "a14": 0, "a15": 0, "a16": 0
        };
        $scope.table12DatasP3 = [];
        var countc3 = 0;

        for (var j = 0; j < $scope.c3CurrList.length; j++) {//2.遍历所有村
            $http.get($scope.testUrl + 'getTable1SumArea?city=' + $scope.cityName + $scope.c3CurrList[j])
                .success(function (res) {                   //3.从表一获取征地面积
                    var new12 = new Object();
                    var new12p2 = new Object();
                    var new12p3 = new Object();
                    new12 = {
                        "t1": 0, "t2": 0, "t3": 0, "t4": 0, "total": 0,
                        "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0
                    };
                    new12p2 = {
                        "c4": '', "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0, "a7": 0
                        , "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0
                    };
                    new12p3 = {
                        "c4": '', "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0, "a7": 0
                        , "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0, "a14": 0, "a15": 0, "a16": 0
                    };
                    new12.c4 = $scope.c3CurrList[countc3];
                    new12p2.c4 = $scope.c3CurrList[countc3];
                    new12p3.c4 = $scope.c3CurrList[countc3];
                    countc3++;

                    new12.area = res[0]["sum(area)"] != null ? res[0]["sum(area)"] : 0;
                    $scope.table12TotalP1.area = $scope.table12TotalP1.area + new12.area;
                    //console.log($scope.cityName + new12.c4);
                    $http.get($scope.testUrl + 'getTable3Bycity3?city=' + $scope.cityName + new12.c4)
                        .success(function (res2) {                   //3.从表三获取房屋信息
                            //console.log(JSON.stringify(res2));
                            var rawT4Datas = [].concat(res2);
                            new12.familys = rawT4Datas.length;
                            $scope.table12TotalP1.familys = $scope.table12TotalP1.familys + new12.familys;
                            for (var i = 0; i < rawT4Datas.length; i++) {
                                rawT4Datas[i]["area"] = rawT4Datas[i]["area"] * 1;
                                rawT4Datas[i]["quantity"] = rawT4Datas[i]["quantity"] * 1;
                                new12.total = new12.total + rawT4Datas[i]["area"];
                                switch (rawT4Datas[i]["type2"]) {   //5.房屋面积
                                    case "框架":
                                        new12.t1 = new12.t1 + rawT4Datas[i]["area"];
                                        break;
                                    case "砖混":
                                        new12.t2 = new12.t2 + rawT4Datas[i]["area"];
                                        break;
                                    case "砖木":
                                        new12.t3 = new12.t3 + rawT4Datas[i]["area"];
                                        break;
                                    case "土木":
                                        new12.t4 = new12.t4 + rawT4Datas[i]["area"];
                                        break;
                                    default:
                                        break;
                                }
                                //6.构筑物
                                var prjArr = [["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
                                    , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
                                ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
                                ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
                                ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
                                    , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
                                for (var k = 0; k < 6; k++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[k][0]) {
                                        new12[prjArr[k][1]] = new12[prjArr[k][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                                for (var k = 6; k < 19; k++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[k][0]) {
                                        new12p2[prjArr[k][1]] = new12p2[prjArr[k][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                                for (var k = 19; k < prjArr.length; k++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[k][0]) {
                                        new12p3[prjArr[k][1]] = new12p3[prjArr[k][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                            }
                            //7.合计
                            var table12TotalP1Arr = ["t1", "t2", "t3", "t4", "total", "a1", "a2", "a3", "a4", "a5", "a6"];
                            for (var k = 0; k < table12TotalP1Arr.length; k++) {
                                $scope.table12TotalP1[table12TotalP1Arr[k]] = $scope.table12TotalP1[table12TotalP1Arr[k]] + new12[table12TotalP1Arr[k]];
                            }
                            var table12TotalP2Arr = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a12", "a12", "a13"];
                            for (var m = 0; m < table12TotalP2Arr.length; m++) {
                                $scope.table12TotalP2[table12TotalP2Arr[m]] = $scope.table12TotalP2[table12TotalP2Arr[m]] + new12p2[table12TotalP2Arr[m]];
                            }
                            var table12TotalP3Arr = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a12", "a12", "a13", "a14", "a15", "a16"];
                            for (var m = 0; m < table12TotalP3Arr.length; m++) {
                                $scope.table12TotalP3[table12TotalP3Arr[m]] = $scope.table12TotalP3[table12TotalP3Arr[m]] + new12p3[table12TotalP3Arr[m]];
                            }
                            $scope.table12DatasP1.push(new12);
                            $scope.table12DatasP2.push(new12p2);
                            $scope.table12DatasP3.push(new12p3);
                            // console.log(JSON.stringify(new12));
                            // console.log(JSON.stringify($scope.table12DatasP1));
                            // console.log(JSON.stringify($scope.table12TotalP1));
                        })
                        .error(function (res) {
                        });
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
    }
    function getC2List() {
        $http.get('page/project/conf/city2.json').success(function (data) {
            $scope.c2CurrList = data[$scope.cityName];
        });
    }
    function getC3List() {
        $http.get('page/project/conf/city3.json').success(function (data) {
            $scope.c3CurrList = data[$scope.cityName];
        });
    }
    function getAllTable11Datas() {
        $scope.table11TotalP1 = {
            "area": 0, "familys": 0, "t1": 0, "t2": 0, "t3": 0, "t4": 0, "total": 0,
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0
        };
        $scope.table11DatasP1 = [];
        $scope.table11TotalP2 = {
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0,
            "a7": 0, "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0
        };
        $scope.table11DatasP2 = [];
        $scope.table11TotalP3 = {
            "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0,
            "a7": 0, "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0, "a14": 0, "a15": 0, "a16": 0
        };
        $scope.table11DatasP3 = [];
        var count1 = 0;
        console.log(JSON.stringify($scope.c4CurrList));
        for (var i = 0; i < $scope.c4CurrList.length; i++) {//1.遍历所有村
            $http.get($scope.testUrl + 'getTable1Area?city=' + $scope.cityName + $scope.c4CurrList[i])
                .success(function (res) {
                    //console.log(JSON.stringify(res));
                    var new11 = new Object();
                    var new11p2 = new Object();
                    var new11p3 = new Object();
                    new11 = {
                        "c4": '', "area": 0, "familys": 0, "t1": 0, "t2": 0, "t3": 0, "t4": 0, "total": 0,
                        "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0
                    };
                    new11p2 = {
                        "c4": '', "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0, "a7": 0
                        , "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0
                    };
                    new11p3 = {
                        "c4": '', "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0, "a7": 0
                        , "a8": 0, "a9": 0, "a10": 0, "a11": 0, "a12": 0, "a13": 0, "a14": 0, "a15": 0, "a16": 0
                    };
                    new11.c4 = $scope.c4CurrList[count1];           //2.村子名字
                    new11p2.c4 = $scope.c4CurrList[count1];
                    new11p3.c4 = $scope.c4CurrList[count1];
                    count1++;

                    var rawT4Datas = [].concat(res);
                    for (var n = 0; n < rawT4Datas.length; n++) {   //3.征地面积
                        new11.area = new11.area + rawT4Datas[n]['area'];
                    };
                    $scope.table11TotalP1.area = $scope.table11TotalP1.area + new11.area;
                    //房屋
                    $http.get($scope.testUrl + 'getTable3Bycity?city=' + $scope.cityName + new11.c4)
                        .success(function (res) {
                            var rawT4Datas = [].concat(res);
                            new11.familys = rawT4Datas.length;      //4.房屋户数
                            $scope.table11TotalP1.familys = $scope.table11TotalP1.familys + new11.familys;
                            //面积
                            for (var i = 0; i < rawT4Datas.length; i++) {
                                rawT4Datas[i]["area"] = rawT4Datas[i]["area"] * 1;
                                rawT4Datas[i]["quantity"] = rawT4Datas[i]["quantity"] * 1;
                                new11.total = new11.total + rawT4Datas[i]["area"];
                                switch (rawT4Datas[i]["type2"]) {   //5.房屋面积
                                    case "框架":
                                        new11.t1 = new11.t1 + rawT4Datas[i]["area"];
                                        break;
                                    case "砖混":
                                        new11.t2 = new11.t2 + rawT4Datas[i]["area"];
                                        break;
                                    case "砖瓦":
                                        new11.t3 = new11.t3 + rawT4Datas[i]["area"];
                                        break;
                                    case "土木":
                                        new11.t4 = new11.t4 + rawT4Datas[i]["area"];
                                        break;
                                    default:
                                        break;
                                }
                                //6.构筑物
                                var prjArr = [["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
                                    , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
                                ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
                                ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
                                ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
                                    , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
                                //console.log(rawT4Datas[i]["prj"]);
                                for (var j = 0; j < 6; j++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[j][0]) {
                                        new11[prjArr[j][1]] = new11[prjArr[j][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                                for (var j = 6; j < 19; j++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[j][0]) {
                                        new11p2[prjArr[j][1]] = new11p2[prjArr[j][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                                for (var j = 19; j < prjArr.length; j++) {
                                    if (rawT4Datas[i]["prj"] == prjArr[j][0]) {
                                        new11p3[prjArr[j][1]] = new11p3[prjArr[j][1]] + rawT4Datas[i]["quantity"];
                                        break;
                                    }
                                }
                                //console.log(JSON.stringify(new11p2));
                            }
                            //7.合计
                            var table11TotalP1Arr = ["t1", "t2", "t3", "t4", "total", "a1", "a2", "a3", "a4", "a5", "a6"];
                            for (var k = 0; k < table11TotalP1Arr.length; k++) {
                                $scope.table11TotalP1[table11TotalP1Arr[k]] = $scope.table11TotalP1[table11TotalP1Arr[k]] + new11[table11TotalP1Arr[k]];
                            }
                            var table11TotalP2Arr = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13"];
                            for (var m = 0; m < table11TotalP2Arr.length; m++) {
                                $scope.table11TotalP2[table11TotalP2Arr[m]] = $scope.table11TotalP2[table11TotalP2Arr[m]] + new11p2[table11TotalP2Arr[m]];
                            }
                            var table11TotalP3Arr = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16"];
                            for (var m = 0; m < table11TotalP3Arr.length; m++) {
                                $scope.table11TotalP3[table11TotalP3Arr[m]] = $scope.table11TotalP3[table11TotalP3Arr[m]] + new11p3[table11TotalP3Arr[m]];
                            }
                            //console.log($scope.cityName);
                            //console.log(JSON.stringify($scope.table11TotalP1));
                            //8.数据绑定
                            $scope.table11DatasP1.push(new11);
                            $scope.table11DatasP2.push(new11p2);
                            $scope.table11DatasP3.push(new11p3);
                        })
                        .error(function (res) {
                        });
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
    }
    function saveTable42mId() {
        //TODO.. SERVER端   建筑物、土地取数据
        var mId = $scope.currTable42.mId;
        var type = $scope.currTable42.type;
        var c4 = $scope.cityName + $scope.currTable42.c4;
        //console.log('###'+mId + name + city4Name);
        //判断数据库中是否有记录
        $http.get($scope.testUrl + 'isTable42mId?c4=' + c4 + '&type=' + type)
            .success(function (res) {
                if (res.length > 0) {
                    //update
                    $http.get($scope.testUrl + 'updateTable42mId?c4=' + c4 + '&mId=' + mId + '&type=' + type)//凭证编号
                        .success(function (res) {
                            //console.log(JSON.stringify(res));
                            alert('修改成功');
                            getAllTable42Datas($scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                else {
                    //add
                    $http.get($scope.testUrl + 'saveTable42mId?c4=' + c4 + '&mId=' + mId + '&type=' + type)//凭证编号
                        .success(function (res) {
                            //console.log(JSON.stringify(res));
                            alert('添加成功');
                            getAllTable42Datas($scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                //console.log(JSON.stringify(res));
            })
            .error(function (res) {
                alert('网络出错');
            });


    }
    function getTable42mIdByPK(c4, type) {    //根据户名显示凭证编号
        $scope.currTable42 = { 'c4': c4, 'mId': '', 'type': type };
        c4 = $scope.cityName + c4;
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable42mId')//凭证编号
            .success(function (res) {
                mIdList = res;
                for (var i = 0; i < mIdList.length; i++) {//添加凭证编号
                    if (type == mIdList[i].type && c4 == mIdList[i].c4) {
                        $scope.currTable42.mId = mIdList[i].mId;
                        break;
                    }
                }
            })
            .error(function (res) {
            });
    }
    function getAllTable42Datas(page) {
        $scope.table42Total = { "t1": 0, "t2": 0 };
        $scope.table42Datas = [];
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        $scope.currPage = page;
        if ($scope.c4CurrList.length > 3) { //分页
            $scope.totalPages = 2;
            var begin = page == 1 ? 0 : 3;
            count1 = page == 1 ? 0 : 3;
            count2 = page == 1 ? 0 : 3;
            var end = page == 1 ? 3 : $scope.c4CurrList.length;
        }
        else {
            $scope.totalPages = 1;
            var begin = 0;
            var end = $scope.c4CurrList.length;
        }
        //console.log('begin:' + begin + 'end:' + end);
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable42mId')//凭证编号
            .success(function (res) {
                mIdList = res;
            })
            .error(function (res) {
            });

        for (var i = begin; i < end; i++) {//1.遍历所有村
            $http.get($scope.testUrl + 'getAllTable411Datas2?city=' + $scope.cityName + $scope.c4CurrList[i])
                .success(function (res) {                       //2.青苗
                    //console.log(JSON.stringify(res));
                    var new42 = new Object();
                    new42.c4 = $scope.c4CurrList[count1];
                    new42.type = "青苗";
                    new42.unit = "亩";
                    new42.quantity = 0;
                    new42.total = 0;
                    new42.price = 0;
                    var rawT4Datas = [].concat(res);
                    for (var i = 0; i < rawT4Datas.length; i++) {
                        rawT4Datas[i].quantity = rawT4Datas[i].quantity * 1;
                        rawT4Datas[i].total = rawT4Datas[i].quantity * rawT4Datas[i].price;
                        new42.price = rawT4Datas[i].price;
                        new42.quantity = new42.quantity + rawT4Datas[i].quantity;
                        new42.total = new42.total + rawT4Datas[i].total;
                    };

                    if (new42.quantity == 0) {
                        new42.price = 0;
                    }
                    else {
                        new42.price = new42.total / new42.quantity;
                    }
                    var totalNew42C4 = $scope.cityName + new42.c4;
                    for (var j = 0; j < mIdList.length; j++) {//添加凭证编号
                        if (totalNew42C4 == mIdList[j].c4 && new42.type == mIdList[j].type) {
                            new42.mId = mIdList[j].mId;
                            break;
                        }
                    }
                    $scope.table42Datas.push(new42);
                    count1++;

                    $scope.table42Total.t1 = $scope.table42Total.t1 + new42.quantity;
                    $scope.table42Total.t2 = $scope.table42Total.t2 + new42.total;
                })
                .error(function (res) {
                    alert("网络出错");
                });
            $http.get($scope.testUrl + 'getAllTable412Datas2?city=' + $scope.cityName + $scope.c4CurrList[i])
                .success(function (res) {   //3.地面建筑物  地面建筑物单价不一致
                    var new42 = new Object();
                    new42.c4 = $scope.c4CurrList[count2];
                    new42.type = "地面建筑物";
                    new42.unit = "m²";
                    new42.quantity = 0;
                    new42.total = 0;
                    new42.price = 0;
                    var rawT4Datas = [].concat(res);
                    for (var i = 0; i < rawT4Datas.length; i++) {
                        rawT4Datas[i].area1 = rawT4Datas[i].area1 * 1;
                        rawT4Datas[i].total = rawT4Datas[i].area1 * rawT4Datas[i].price;
                        new42.quantity = new42.quantity + rawT4Datas[i].area1;
                        new42.total = new42.total + rawT4Datas[i].total;
                    };
                    if (new42.quantity == 0) {
                        new42.price = 0;
                    }
                    else {
                        new42.price = new42.total / new42.quantity;
                    }
                    var totalNew42C4 = $scope.cityName + new42.c4;
                    for (var j = 0; j < mIdList.length; j++) {//添加凭证编号
                        if (totalNew42C4 == mIdList[j].c4 && new42.type == mIdList[j].type) {
                            new42.mId = mIdList[j].mId;
                            break;
                        }
                    }

                    $scope.table42Datas.push(new42);
                    count2++;
                    $scope.table42Total.t1 = $scope.table42Total.t1 + new42.quantity;
                    $scope.table42Total.t2 = $scope.table42Total.t2 + new42.total;
                })
                .error(function (res) {
                });
            $http.get($scope.testUrl + 'getAllTable413Datas2?city=' + $scope.cityName + $scope.c4CurrList[i])
                .success(function (res) {   //3.地面建筑物  地面建筑物单价不一致
                    console.log(JSON.stringify(res));
                    var new42 = new Object();
                    new42.c4 = $scope.c4CurrList[count3];
                    new42.type = "土地";
                    new42.unit = "m²";
                    new42.quantity = 0;
                    new42.total = 0;
                    new42.price = 0;
                    //汇总
                    var rawT4Datas = [].concat(res);
                    for (var i = 0; i < rawT4Datas.length; i++) {
                        rawT4Datas[i].quantity = rawT4Datas[i].quantity * 1;
                        rawT4Datas[i].total = rawT4Datas[i].total * 1;
                        new42.quantity = new42.quantity + rawT4Datas[i].quantity;
                        new42.total = new42.total + rawT4Datas[i].total;
                        if (new42.quantity == 0) {
                            new42.price = 0;
                        }
                        else {
                            new42.price = new42.total / new42.quantity;
                        }
                    };
                    //编号
                    var totalNew42C4 = $scope.cityName + new42.c4;
                    for (var j = 0; j < mIdList.length; j++) {//添加凭证编号
                        if (totalNew42C4 == mIdList[j].c4 && new42.type == mIdList[j].type) {
                            new42.mId = mIdList[j].mId;
                            break;
                        }
                    }

                    $scope.table42Datas.push(new42);
                    count3++;
                    $scope.table42Total.t1 = $scope.table42Total.t1 + new42.quantity;
                    $scope.table42Total.t2 = $scope.table42Total.t2 + new42.total;
                })
                .error(function (res) {
                });
        }
    }
    function getC4List() {
        $scope.table411Datas = [];
        $scope.table411Total = { "city4Name": '', "t1": 0, "t2": 0 };
        $scope.table412Datas = [];
        $scope.table412Total = { "city4Name": '', "t1": 0, "t2": 0 };
        $http.get('page/project/conf/city4.json').success(function (data) {
            $scope.c4CurrList = data[$scope.cityName];
            //console.log(JSON.stringify($scope.c4CurrList));
        });
    }
    function getAllTable413Datas(city4Name, page) {    //根据村名获取表4-1－3全部数据
        $scope.table413Total.city4Name = city4Name;
        console.log($scope.table413Total.city4Name);
        city4Name = $scope.cityName + city4Name;
        $http.get($scope.testUrl + 'getTable413Count?city=' + city4Name)
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });
        // if (page == $scope.totalPages - 1) {    //添加完毕时显示最后一页
        //     page = $scope.totalPages;
        // }
        $scope.currPage = page;
        $http.get($scope.testUrl + 'getAllTable413Datas?page=' + page + '&city=' + city4Name)
            .success(function (res) {
                //console.log(res);
                $scope.table413Datas = [].concat(res);
                $scope.table413Total.t1 = 0;
                $scope.table413Total.t2 = 0;
                for (let i = 0; i < $scope.table413Datas.length; i++) {
                    if ($scope.table413Datas[i].quantity != null) {
                        $scope.table413Datas[i].quantity = $scope.table413Datas[i].quantity * 1;
                        console.log($scope.table413Datas[i].quantity);
                        $scope.table413Total.t1 = $scope.table413Total.t1 + $scope.table413Datas[i].quantity;
                    }
                    if ($scope.table413Datas[i].total != null) {
                        $scope.table413Datas[i].total = $scope.table413Datas[i].total * 1;
                        $scope.table413Total.t2 = $scope.table413Total.t2 + $scope.table413Datas[i].total;
                    }
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable413Data() {
        //console.log($scope.table413Total.city4Name);
        var urlPara = 'city=' + $scope.cityName + $scope.table413Total.city4Name + '&';
        var t1Para = ['name', 'id', 'price', 'total', 'text', 'quantity'];
        for (let i = 0; i < t1Para.length; i++) {
            if ($scope.curTable413[t1Para[i]] == null)
                $scope.curTable413[t1Para[i]] = '';
            urlPara = urlPara + t1Para[i] + '=' + $scope.curTable413[t1Para[i]] + '&';
        }
        if ($scope.curTable413.isExist == 1) {
            $http.get($scope.testUrl + 'updateTable413?' + urlPara)
                .success(function (res) {
                    alert("更新成功！");
                    $scope.curTable413 = {};
                    getAllTable413Datas($scope.table413Total.city4Name, $scope.currPage);
                })
                .error(function (res) {
                    alert("添加数据出错");
                });
        }
        else {
            $http.get($scope.testUrl + 'addTable413?' + urlPara)
                .success(function (res) {
                    alert("添加成功！");
                    $scope.curTable413 = {};
                    getAllTable413Datas($scope.table413Total.city4Name, $scope.currPage);
                })
                .error(function (res) {
                    alert("添加数据出错");
                });
        }
    }
    function getTable413ByPK(id) {
        $http.get($scope.testUrl + 'getTable413ById?id=' + id)
            .success(function (res) {
                var rawDatas = [].concat(res);
                $scope.curTable413 = rawDatas[0];
                $scope.curTable413.isExist = 1;
                //console.log($scope.curTable1.name);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function deleteTable413(id) {
        $http.get($scope.testUrl + 'deleteTable413?pk=' + id)
            .success(function (res) {
                getAllTable413Datas($scope.table413Total.city4Name, $scope.currPage);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }

    function saveTable412mId() {
        var mId = $scope.currTable412.mId;
        var name = $scope.currTable412.name;
        var city4Name = $scope.cityName + $scope.table412Total.city4Name;
        console.log('###' + mId + name + city4Name);
        //判断数据库中是否有记录
        $http.get($scope.testUrl + 'isTable412mId?name=' + name + '&city=' + city4Name)
            .success(function (res) {
                if (res.length > 0) {
                    //update
                    $http.get($scope.testUrl + 'updateTable412mId?name=' + name + '&mId=' + mId + '&city=' + city4Name)//凭证编号
                        .success(function (res) {
                            console.log(JSON.stringify(res));
                            alert('修改成功');
                            getAllTable412Datas($scope.table412Total.city4Name, $scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                else {
                    //add
                    $http.get($scope.testUrl + 'saveTable412mId?name=' + name + '&mId=' + mId + '&city=' + city4Name)//凭证编号
                        .success(function (res) {
                            console.log(JSON.stringify(res));
                            alert('添加成功');
                            getAllTable412Datas($scope.table412Total.city4Name, $scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                //console.log(JSON.stringify(res));
            })
            .error(function (res) {
                alert('网络出错');
            });


    }
    function getTable412mIdByPK(name) {    //根据户名显示凭证编号
        var city4Name = $scope.cityName + $scope.table412Total.city4Name;
        $scope.currTable412 = { 'name': name, 'mId': '' };
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable412mId?c4name=' + city4Name)//凭证编号
            .success(function (res) {
                mIdList = res;
                for (var i = 0; i < mIdList.length; i++) {//添加凭证编号
                    if (name == mIdList[i].name) {
                        $scope.currTable412.mId = mIdList[i].mId;
                        break;
                    }
                }
            })
            .error(function (res) {
            });
    }
    function getAllTable412Datas(city4Name, page) {    //根据村名获取表4-1－2全部数据
        $scope.currPage = page;
        $scope.table412Total.city4Name = city4Name;
        city4Name = $scope.cityName + city4Name;

        var mIdList = [];
        $http.get($scope.testUrl + 'getTable412mId?c4name=' + city4Name)//凭证编号
            .success(function (res) {
                mIdList = res;
            })
            .error(function (res) {
            });

        $http.get($scope.testUrl + 'getAllTable412Datas?city=' + city4Name + '&page=' + page)//表内容
            .success(function (res) {
                //console.log(JSON.stringify(res));
                $scope.totalPages = Math.ceil(res.length / 10);
                var rawT4Datas = [].concat(res);
                $scope.table412Total.t1 = 0;
                $scope.table412Total.t2 = 0;
                $scope.table412Datas = [];
                for (var i = 0; i < rawT4Datas.length; i++) {
                    var new411 = new Object();
                    new411.name = rawT4Datas[i]["name"];
                    new411.area1 = rawT4Datas[i]["sum(area1)"];
                    new411.total = rawT4Datas[i]["sum(area1*price+quantity*price2+o1+o2+o3+o4)"];
                    if (new411.area1 == 0) {
                        new411.price = 0;
                    }
                    else {
                        new411.price = new411.total / new411.area1;
                    }
                    for (var j = 0; j < mIdList.length; j++) {//添加凭证编号
                        if (new411.name == mIdList[j].name) {
                            new411.mId = mIdList[j].mId;
                            break;
                        }
                    }

                    $scope.table412Datas.push(new411);
                    $scope.table412Total.t1 = $scope.table412Total.t1 + new411.area1;
                    $scope.table412Total.t2 = $scope.table412Total.t2 + new411.total;
                };
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function saveTable411mId() {
        var mId = $scope.currTable411.mId;
        var name = $scope.currTable411.name;
        var city4Name = $scope.cityName + $scope.table411Total.city4Name;
        //console.log(mId + name + city4Name);
        //判断数据库中是否有记录
        $http.get($scope.testUrl + 'isTable411mId?name=' + name + '&city=' + city4Name)
            .success(function (res) {
                if (res.length > 0) {
                    //update
                    $http.get($scope.testUrl + 'updateTable411mId?name=' + name + '&mId=' + mId + '&city=' + city4Name)//凭证编号
                        .success(function (res) {
                            alert('修改成功');
                            getAllTable411Datas($scope.table411Total.city4Name, $scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                else {
                    //add
                    $http.get($scope.testUrl + 'saveTable411mId?name=' + name + '&mId=' + mId + '&city=' + city4Name)//凭证编号
                        .success(function (res) {
                            alert('添加成功');
                            getAllTable411Datas($scope.table411Total.city4Name, $scope.currPage);
                        })
                        .error(function (res) {
                            alert('网络出错');
                        });
                }
                //console.log(JSON.stringify(res));
            })
            .error(function (res) {
                alert('网络出错');
            });


    }
    function getTable411mIdByPK(name) {    //根据户名显示凭证编号
        var city4Name = $scope.cityName + $scope.table411Total.city4Name;
        $scope.currTable411 = { 'name': name, 'mId': '' };
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable411mId?c4name=' + city4Name)//凭证编号
            .success(function (res) {
                mIdList = res;
                for (var i = 0; i < mIdList.length; i++) {//添加凭证编号
                    if (name == mIdList[i].name) {
                        $scope.currTable411.mId = mIdList[i].mId;
                        break;
                    }
                }
            })
            .error(function (res) {
            });
    }
    function getAllTable411Datas(city4Name, page) {    //根据村名获取表4-1－1全部数据
        $scope.currPage = page;
        $scope.table411Total.city4Name = city4Name;
        city4Name = $scope.cityName + city4Name;
        var limitPeopleList = [];
        var mIdList = [];
        $http.get($scope.testUrl + 'getTable411mId?c4name=' + city4Name)//凭证编号
            .success(function (res) {
                mIdList = res;
            })
            .error(function (res) {
            });

        $http.get($scope.testUrl + 'getPeopleList?city=' + city4Name)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res.length / 10);
                var resLength = 10 * page > res.length ? res.length : 10 * page;
                for (var i = 10 * (page - 1); i < resLength; i++) {
                    limitPeopleList.push(res[i].id);
                }
                $http.get($scope.testUrl + 'getSumTable411Datas?ids=' + limitPeopleList)//2.表内容
                    .success(function (res) {
                        //console.log(JSON.stringify(res));
                        var rawT4Datas = [].concat(res);
                        $scope.table411Total.t1 = 0;
                        $scope.table411Total.t2 = 0;
                        $scope.table411Datas = [];
                        for (var i = 0; i < rawT4Datas.length; i++) {
                            var new411 = new Object();
                            new411.name = rawT4Datas[i]["name"];
                            new411.quantity = rawT4Datas[i]["sum(quantity)"];
                            new411.total = rawT4Datas[i]["sum(price*quantity)"];
                            if (new411.quantity == 0) {
                                new411.price = 0;
                            }
                            else {
                                new411.price = new411.total / new411.quantity;
                            }
                            for (var j = 0; j < mIdList.length; j++) {//添加凭证编号
                                if (new411.name == mIdList[j].name) {
                                    new411.mId = mIdList[j].mId;
                                    break;
                                }
                            }
                            //console.log(JSON.stringify(mIdList));
                            $scope.table411Datas.push(new411);
                            $scope.table411Total.t1 = $scope.table411Total.t1 + new411.quantity;
                            $scope.table411Total.t2 = $scope.table411Total.t2 + new411.total;
                        };
                    })
                    .error(function (res) {
                    });
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getUserByName(name) {
        $http.get($scope.testUrl + 'getUserByName?pk=' + name)
            .success(function (res) {
                $scope.curUser = res[0];
                if ($scope.curUser.city1 == 'true')
                    $scope.curUser.city1 = true;
                if ($scope.curUser.city2 == 'true')
                    $scope.curUser.city2 = true;
                if ($scope.curUser.city3 == 'true')
                    $scope.curUser.city3 = true;
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function updateUser() { //更新用户
        var url = 'name=' + $scope.curUser.name + '&password=' + $scope.curUser.password + '&city1=' + $scope.curUser.city1 +
            '&city2=' + $scope.curUser.city2 + '&city3=' + $scope.curUser.city3;
        //console.log(url);
        $http.get($scope.testUrl + 'updateUser?' + url)
            .success(function (res) {
                alert("更新成功！");
            })
            .error(function (res) {
                alert("网络出错");
            });
        $scope.curUser = {};
        getUserDatas();
    }
    function deleteUser(name) { //删除用户
        $http.get($scope.testUrl + 'deleteUser?pk=' + name)
            .success(function (res) {
                alert("删除成功！");
            })
            .error(function (res) {
                alert("网络出错");
            });
        getUserDatas();
    }
    function addUser() { //添加用户
        //console.log(JSON.stringify($scope.newUser));
        $scope.newUser.city1 = $scope.newUser.city1 == null ? false : $scope.newUser.city1;
        $scope.newUser.city2 = $scope.newUser.city2 == null ? false : $scope.newUser.city2;
        $scope.newUser.city3 = $scope.newUser.city3 == null ? false : $scope.newUser.city3;
        var url = 'name=' + $scope.newUser.name + '&password=' + $scope.newUser.password + '&city1=' + $scope.newUser.city1 +
            '&city2=' + $scope.newUser.city2 + '&city3=' + $scope.newUser.city3;
        $http.get($scope.testUrl + 'addUser?' + url)
            .success(function (res) {
                alert("添加成功！");
            })
            .error(function (res) {
                alert("网络出错");
            });
        $scope.newUser = {};
        getUserDatas();
    }
    function updateTable4() {   //更新表四
        var urlPara = '';
        var t4Para = ['price', 'price2', 'o1', 'o2', 'o3', 'o4', 'fID'];
        for (let i = 0; i < t4Para.length; i++) {
            if ($scope.curTable4[t4Para[i]] == null)
                $scope.curTable4[t4Para[i]] = '';
            urlPara = urlPara + t4Para[i] + '=' + $scope.curTable4[t4Para[i]] + '&';
        }
        //console.log(urlPara);
        $http.get($scope.testUrl + 'updateTable4?' + urlPara)
            .success(function (res) {
                alert("更新成功！");
            })
            .error(function (res) {
                alert("网络出错");
            });
        getAllTable4Datas($scope.curTable4.id, $scope.currPage);
        $scope.curTable4 = {};
    }
    function getTable4ByPK(pk) {
        $http.get($scope.testUrl + 'getTable4ByPK?pk=' + pk)
            .success(function (res) {
                //console.log(JSON.stringify(res));
                var rawDatas = [].concat(res);
                $scope.curTable4 = rawDatas[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getAllTable4Datas(id, page) {    //根据户主ID获取表四数据
        $scope.currPage = page;
        $scope.table4Datas = [];
        $http.get($scope.testUrl + 'getTable4Count?id=' + id)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'getTable1ById?id=' + id)//2.取表头信息
            .success(function (res) {
                $scope.current = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
        console.log(page);
        $http.get($scope.testUrl + 'gettable4Datas?id=' + id + '&page=' + page)//3.取表信息
            .success(function (res) {
                var rawT4Datas = [].concat(res);
                for (var i = 0; i < rawT4Datas.length; i++) {
                    $scope.table4Datas[i] = rawT4Datas[i];
                    $scope.table4Datas[i].total = $scope.table4Datas[i].area1 * $scope.table4Datas[i].price;
                    $scope.table4Datas[i].total2 = $scope.table4Datas[i].quantity * $scope.table4Datas[i].price2;
                };
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'gettable4AllDatas?id=' + id)//4.汇总该户主所有数据
            .success(function (resall) {
                $scope.table4Total = {
                    "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "total1": 0,
                    "quantity": 0, "total2": 0, "o1": 0, "o2": 0, "o3": 0, "o4": 0
                };
                var rawT4Datas2 = [].concat(resall);
                //console.log(JSON.stringify(rawT4Datas));
                var t4TotalArr = ["t1", "t2", "t3", "t4", "t5", "quantity", "o1", "o2", "o3", "o4"];
                for (var i = 0; i < rawT4Datas2.length; i++) {
                    for (var j = 0; j < t4TotalArr.length; j++) {
                        rawT4Datas2[i][t4TotalArr[j]] = rawT4Datas2[i][t4TotalArr[j]] * 1;
                        $scope.table4Total[t4TotalArr[j]] = $scope.table4Total[t4TotalArr[j]] + rawT4Datas2[i][t4TotalArr[j]];
                    }
                    $scope.table4Total.total1 = $scope.table4Total.total1 + rawT4Datas2[i].area1 * rawT4Datas2[i].price;
                    $scope.table4Total.total2 = $scope.table4Total.total2 + rawT4Datas2[i].quantity * rawT4Datas2[i].price2;
                };
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function deleteTable3(pk) { //删除表三
        $http.get($scope.testUrl + 'deleteTable3?pk=' + pk)//1.删除表三
            .success(function (res) {
                getAllTable3Datas($scope.current.id, $scope.currPage);
            })
            .error(function (res) {
                alert("删除表三数据出错");
            });
        $http.get($scope.testUrl + 'deleteTable4?pk=' + pk)//2.删除表四
            .success(function (res) {
            })
            .error(function (res) {
                alert("删除表四数据出错");
            });
    }
    function saveTable3Data() {   //添加表三数据
        var currTable4 = {};//1.相应添加到表四
        currTable4.index = $scope.curTable3.index;
        currTable4.type1 = $scope.curTable3.type2;
        currTable4.area1 = $scope.curTable3.area;
        switch ($scope.curTable3.type2) {
            case "框架":
                currTable4.t1 = $scope.curTable3.area;
                break;
            case "砖混":
                currTable4.t2 = $scope.curTable3.area;
                break;
            case "砖木":
                currTable4.t3 = $scope.curTable3.area;
                break;
            case "土木":
                currTable4.t4 = $scope.curTable3.area;
                break;
            default:
                currTable4.t5 = $scope.curTable3.area;
        }
        currTable4.arcName = $scope.curTable3.prj;
        currTable4.unit = $scope.curTable3.unit;
        currTable4.quantity = $scope.curTable3.quantity;
        var urlPara = '';   //2.拼装表三字段
        var t3Para = ['index', 'length', 'width', 'high', 'area',
            'type1', 'type2', 'prj', 'unit', 'quantity', 'autoID'];
        for (let i = 0; i < t3Para.length; i++) {
            if ($scope.curTable3[t3Para[i]] == null)
                $scope.curTable3[t3Para[i]] = '';
            urlPara = urlPara + t3Para[i] + '=' + $scope.curTable3[t3Para[i]] + '&';
        }
        //console.log(urlPara);
        var urlPara2 = '';  //3.拼装表四字段
        var t4Para = ['index', 'type1', 'area1', 't1', 't2',
            't3', 't4', 't5', 'arcName', 'unit', 'quantity'];
        for (let i = 0; i < t4Para.length; i++) {
            if (currTable4[t4Para[i]] == null)
                currTable4[t4Para[i]] = '';
            urlPara2 = urlPara2 + t4Para[i] + '=' + currTable4[t4Para[i]] + '&';
        }
        //console.log(urlPara2);
        //console.log(JSON.stringify($scope.curTable3));
        //4.更新
        if ($scope.curTable3 != null && $scope.curTable3.autoID != "") {
            $http.get($scope.testUrl + 'updateTable3?' + urlPara)//4.1更新表三
                .success(function (res) {
                    alert("更新表三成功！");
                })
                .error(function (res) {
                    alert("更新表三数据出错");
                });
            urlPara2 = urlPara2 + 'autoID=' + $scope.curTable3.autoID;
            console.log(urlPara2);
            $http.get($scope.testUrl + 'updateTable4ByT3?' + urlPara2)//4.2更新表四
                .success(function (res) {
                })
                .error(function (res) {
                    alert("更新表四数据出错");
                });
            getAllTable3Datas($scope.current.id, $scope.currPage);
        }
        //5.添加
        else {
            $http.get($scope.testUrl + 'getT4PriceByPrj?prj=' + currTable4.type1)
                .success(function (res) {//5.1 根据type1得到表四price
                    if (res.length != 0)
                        urlPara2 = urlPara2 + 'price=' + res[0]["price"];
                    else
                        urlPara2 = urlPara2 + 'price=0';
                })
                .error(function (res) {
                    urlPara2 = urlPara2 + 'price=0';
                });
            $http.get($scope.testUrl + 'getT4Price2ByPrj?prj=' + currTable4.arcName)
                .success(function (res) {//5.2 根据arcName得到表四price2
                    if (res.length != 0)
                        urlPara2 = urlPara2 + 'price2=' + res[0]["price2"];
                    else
                        urlPara2 = urlPara2 + 'price2=0';
                })
                .error(function (res) {
                    urlPara2 = urlPara2 + 'price2=0';
                });
            urlPara = urlPara + 'id=' + $scope.current.id + '&city=' + $scope.cityName;
            $http.get($scope.testUrl + 'addTable3?' + urlPara)//5.3 添加表三
                .success(function (res) {
                    //console.log(JSON.stringify(res));
                    urlPara2 = urlPara2 + '&id=' + $scope.current.id + '&fID=' + res.insertId
                        + '&city=' + $scope.cityName + '&name=' + $scope.current.name;    //取到表三自增id
                    $http.get($scope.testUrl + 'addTable4?' + urlPara2) //5.4 添加表四
                        .success(function (res) {
                        })
                        .error(function (res) {
                            alert("添加表四数据出错");
                        });
                    alert("添加表三成功！");
                })
                .error(function (res) {
                    alert("添加表三数据出错");
                });
            $http.get($scope.testUrl + 'getTable3Count?id=' + $scope.current.id)//1.取到总页数
                .success(function (res) {
                    if ($scope.totalPages < Math.ceil(res[0]["count(*)"] / 10)) {
                        getAllTable3Datas($scope.current.id, $scope.totalPages + 1);
                    }
                    else {
                        getAllTable3Datas($scope.current.id, $scope.totalPages);
                    }
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        //重载表单
        $scope.curTable3 = {};
    }
    function getTable3ByPK(pk) {    //选择要编辑的数据
        //console.log(pk);
        $http.get($scope.testUrl + 'getTable3ByPK?pk=' + pk)
            .success(function (res) {
                var rawDatas = [].concat(res);
                $scope.curTable3 = rawDatas[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getAllTable3Datas(id, page) {//根据户主取出表三信息
        $scope.currPage = page;
        $http.get($scope.testUrl + 'getTable3Count?id=' + id)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'getTable1ById?id=' + id)//2.取表头信息
            .success(function (res) {
                $scope.current = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'gettable3Datas?id=' + id + '&page=' + page)//3.取表信息
            .success(function (res) {
                $scope.table3Datas = [].concat(res);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function updateTable2(Table2Type1, Table2Type2) { //更改表二标准
        $scope.Table2Type1 = Table2Type1;
        $scope.Table2Type2 = Table2Type2;
        for (var i = 0; i < $scope.table2Datas.length; i++) {
            //更改数据库中所有该种类的价格
            if ($scope.Table2Type1[i] != null) {
                $http.get($scope.testUrl + 'updateTable2?prj=' + $scope.table2Datas[i].prj + '&type=' + $scope.Table2Type1[i])
                    .success(function (res) {
                        alert("更改成功！");
                    })
                    .error(function (res) {
                        alert("网络出错");
                    });
            }
            if ($scope.Table2Type2[i] != null) {
                $http.get($scope.testUrl + 'updateTable2?prj=' + $scope.table2Datas[i].prj2 + '&type=' + $scope.Table2Type2[i])
                    .success(function (res) {
                    })
                    .error(function (res) {
                    });
            }
        }
        $scope.Table2Type1 = [];
        $scope.Table2Type2 = [];
        //重新加载表二
        getAllTable2Datas($scope.searchName.id, $scope.currPage);
    }
    function getAllTable2Datas(id, page) { //根据户主取出表二信息
        $scope.currPage = page;
        $scope.table2Datas = [];
        $http.get($scope.testUrl + 'getTable2Count?id=' + id)//1.取到总页数
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'getTable1ById?id=' + id)//2.取表头信息
            .success(function (res) {
                $scope.current = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get($scope.testUrl + 'gettable2Datas?id=' + id + '&page=' + page)//3.取表信息
            .success(function (res) {
                var rawDatas = [].concat(res);
                $scope.table2Total = { "total": 0, "total2": 0 };
                for (var i = 0; i < rawDatas.length; i++) {//4.表特殊处理
                    if (2 * i + 1 > rawDatas.length)
                        break;
                    $scope.table2Datas[i] = rawDatas[2 * i];
                    $scope.table2Datas[i].total = $scope.table2Datas[i].quantity * $scope.table2Datas[i].price;
                    $scope.table2Total.total = $scope.table2Total.total + $scope.table2Datas[i].total;

                    if (2 * i + 1 >= rawDatas.length)
                        break;
                    $scope.table2Datas[i].prj2 = rawDatas[2 * i + 1].prj;
                    $scope.table2Datas[i].unit2 = rawDatas[2 * i + 1].unit;
                    $scope.table2Datas[i].quantity2 = rawDatas[2 * i + 1].quantity;
                    $scope.table2Datas[i].price2 = rawDatas[2 * i + 1].price;
                    $scope.table2Datas[i].total2 = $scope.table2Datas[i].quantity2 * $scope.table2Datas[i].price2;
                    $scope.table2Total.total2 = $scope.table2Total.total2 + $scope.table2Datas[i].total2;
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function filterCustomer(filterText) {
        if (filterText == null || filterText == "") {
            getPeopleList();
        }
        else {
            $http.get($scope.testUrl + 'getNameListByName?city=' + $scope.cityName + '&text=' + filterText)
                .success(function (res) {
                    $scope.peopleLists = [].concat(res);
                    $scope.current = res[0];
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        //直接显示搜索结果第一的具体信息
        getAllTable2Datas($scope.current.id, 1);
        getAllTable3Datas($scope.current.id, 1);
        getAllTable4Datas($scope.current.id, 1);
    }
    function search(searchName) {
        $scope.searchName = searchName;
        $scope.currPage = 1;
        //console.log("searchName:"+searchName.id);
        switch ($scope.tableIndex) {
            case '2':
                getAllTable2Datas(searchName.id, 1);
                break;
            case '3':
                getAllTable3Datas(searchName.id, 1);
                break;
            case '4':
                getAllTable4Datas(searchName.id, 1);
                break;
            default:
                console.log("no datas..");
        }
    }
    function getPeopleList() {  //得到户主列表
        $http.get($scope.testUrl + 'getPeopleList?city=' + $scope.cityName)
            .success(function (res) {
                $scope.peopleLists = [].concat(res);
                $scope.current = res[0];
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getNextPage(flag) {  //分页
        var page = 0;
        switch (flag) {
            case 0: //首页
                page = 1;
                if ($scope.currPage == 1) {
                    alert("已经是首页！");
                }
                break;
            case 1://上一页
                if ($scope.currPage == 1) {
                    alert("已经是第一页！");
                    page = 1;
                }
                else {
                    page = $scope.currPage - 1;
                    $scope.currPage = page;
                }
                break;
            case 2://下一页
                if ($scope.currPage == $scope.totalPages) {
                    alert("已经是最后一页！");
                    page = $scope.currPage;
                }
                else {
                    page = $scope.currPage + 1;
                    $scope.currPage = page;
                }
                break;
            case 3://尾页
                page = $scope.totalPages;
                if ($scope.currPage == page) {
                    alert("已经是尾页！");
                }
                break;
            default:
                console.log("no datas..");
        }
        switch ($scope.tableIndex) {
            case '1':
                getAllTable1Datas(page);//得到初始表一数据
                break;
            case '2':
                getAllTable2Datas($scope.searchName.id, page);
                break;
            case '3':
                getAllTable3Datas($scope.searchName.id, page);
                break;
            case '4':
                getAllTable4Datas($scope.searchName.id, page);
                break;
            case '5':
                getAllTable5Datas(page);
                break;
            case '411':
                getAllTable411Datas($scope.table411Total.city4Name, page);
                break;
            case '412':
                getAllTable412Datas($scope.table412Total.city4Name, page);
                break;
            case '42':
                getAllTable42Datas(page);
                break;
            case '43':
                getAllTable43Datas(page);
                break;
            case '71':
                getAllTable71Datas(page);
                break;
            default:
                console.log("no datas..");
        }
    }
    function saveTable1Data() {   //添加表一数据
        //检验身份证与名字是否对应
        $http.get($scope.testUrl + 'getPeopleByID?id=' + $scope.curTable1.id)
            .success(function (res) {
                if (res != null && res[0] != null && res[0].name != $scope.curTable1.name)
                    alert('身份证号与姓名不匹配，该身份证号已对应姓名:' + res[0].name);
                else {
                    //更新
                    if ($scope.curTable1 != null && $scope.curTable1.autoID != null) {
                        var urlPara = '';
                        var t1Para = ['name', 'family', 'people', 'rail', 'type',
                            'area', 'land', 'nonland', 'prj', 'unit', 'quantity', 'autoID'];
                        for (let i = 0; i < t1Para.length; i++) {
                            urlPara = urlPara + t1Para[i] + '=' + $scope.curTable1[t1Para[i]] + '&';
                        }
                        //console.log(urlPara);
                        $http.get($scope.testUrl + 'updateTable1?' + urlPara)
                            .success(function (res) {
                                alert("更新表一成功！");
                            })
                            .error(function (res) {
                                alert("更新表一数据出错");
                            });
                        var urlPara2 = '';
                        urlPara2 = 'id=' + $scope.curTable1.id + '&prj=' + $scope.curTable1.prj + '&unit=' +
                            $scope.curTable1.unit + '&quantity=' + $scope.curTable1.quantity + '&autoID=' +
                            $scope.curTable1.autoID;
                        $http.get($scope.testUrl + 'updateTable2ByT1?' + urlPara2)
                            .success(function (res) {
                                // alert("更新表成功！");
                            })
                            .error(function (res) {
                                alert("更新表二数据出错");
                            });

                        $scope.curTable1 = {};
                        getAllTable1Datas($scope.currPage);
                    }
                    //添加
                    else {
                        $scope.curTable1.city = $scope.cityName;
                        //添加表一
                        var urlPara = '';
                        var t1Para = ['name', 'id', 'family', 'people', 'rail', 'type',
                            'area', 'land', 'nonland', 'prj', 'unit', 'quantity', 'city'];
                        var t1Para2 = ['area', 'land', 'nonland', 'quantity'];
                        for (let i = 0; i < t1Para.length; i++) {
                            if ($scope.curTable1[t1Para[i]] == null)
                                $scope.curTable1[t1Para[i]] = '';

                            for (let j = 0; j < t1Para2.length; j++) {
                                if ($scope.curTable1[t1Para2[j]] == '')
                                    $scope.curTable1[t1Para2[j]] = 0;
                            }
                            urlPara = urlPara + t1Para[i] + '=' + $scope.curTable1[t1Para[i]] + '&';
                        }
                        //console.log(urlPara);
                        //添加表二，表二pID外键对应表一主键 id prj unit quantity fID price
                        var urlTable2 = 'city=' + $scope.cityName + '&name=' + $scope.curTable1.name + '&id=' + $scope.curTable1.id + '&prj=' + $scope.curTable1.prj +
                            '&unit=' + $scope.curTable1.unit + '&quantity=' + $scope.curTable1.quantity;
                        //根据prj得到表二price
                        $http.get($scope.testUrl + 'getPriceByPrj?prj=' + $scope.curTable1.prj)
                            .success(function (res) {
                                if (res.length != 0)
                                    urlTable2 = urlTable2 + '&price=' + res[0]["price"];
                                else
                                    urlTable2 = urlTable2 + '&price=0';
                            })
                            .error(function (res) {
                                urlTable2 = urlTable2 + '&price=0';
                            });
                        $http.get($scope.testUrl + 'addTable1?' + urlPara)
                            .success(function (res) {
                                urlTable2 = urlTable2 + '&fID=' + res.insertId;//取到表一自增id
                                //添加表二
                                $http.get($scope.testUrl + 'addTable2?' + urlTable2)
                                    .success(function (res) {
                                    })
                                    .error(function (res) {
                                        alert("添加表二数据出错");
                                    });
                                alert("添加表1成功！");
                            })
                            .error(function (res) {
                                alert("添加表一数据出错");
                            });
                        //添加用户表，身份证为主键 id name city
                        var urlPeople = 'id=' + $scope.curTable1.id + '&name=' + $scope.curTable1.name
                            + '&city=' + $scope.curTable1.city;
                        $http.get($scope.testUrl + 'addTablePeople?' + urlPeople)
                            .success(function (res) {
                            })
                            .error(function (res) {
                                // alert("添加用户表数据出错");
                            });
                        //重载表单
                        $scope.curTable1 = {};
                        $http.get($scope.testUrl + 'getTable1Count?city=' + $scope.cityName)
                            .success(function (res) {
                                if ($scope.totalPages < Math.ceil(res[0]["count(*)"] / 10)) {
                                    getAllTable1Datas($scope.totalPages + 1);
                                }
                                else {
                                    getAllTable1Datas($scope.totalPages);
                                }
                                //alert(res[0]["count(*)"]);
                            })
                            .error(function (res) {
                                alert("网络出错");
                            });
                    }
                }
            })
            .error(function (res) {
                alert('网络错误');
            });
    }
    function deleteTable1(pk, id) { //删除表一
        $http.get($scope.testUrl + 'deleteTable1?pk=' + pk)//1.删除表一
            .success(function (res) {
                //重新加载表1
                getAllTable1Datas($scope.currPage);
            })
            .error(function (res) {
                alert("删除表一数据出错");
            });
        $http.get($scope.testUrl + 'deleteTable2?pk=' + pk)//2.删除表二
            .success(function (res) {
            })
            .error(function (res) {
                alert("删除表二数据出错");
            });
        $http.get($scope.testUrl + 'deleteTable2ByT1?pk=' + id)//2.删除表三
            .success(function (res) {
            })
            .error(function (res) {
                alert("删除表三数据出错");
            });
        $http.get($scope.testUrl + 'getTable2Count?id=' + id)//3.删除用户表
            .success(function (res) {
                console.log(res[0]["count(*)"] == 0);
                if (res[0]["count(*)"] == 0) { //此人在表一没有记录则删除用户表数据
                    $http.get($scope.testUrl + 'deletePeopleTable?pk=' + id)
                        .success(function (res) {
                        })
                        .error(function (res) {
                            alert("删除用户表数据出错");
                        });
                }
            })
            .error(function (res) {
                alert("网络出错");
            });

        // var confirm = $mdDialog.confirm()
        //     .title('Are you sure?')
        //     .content('Are you sure want to delete this?')
        //     .ok('Yes')
        //     .cancel('No')
        //     .targetEvent($event);
    }
    function getTable1ByPK(pk) {    //根据主键获取表一数据
        $http.get($scope.testUrl + 'getTable1ByPK?pk=' + pk)
            .success(function (res) {
                var rawDatas = [].concat(res);
                $scope.curTable1 = rawDatas[0];
                //console.log($scope.curTable1.name);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getAllTable1Datas(page) {  //得到表一全部数据
        $http.get($scope.testUrl + 'getTable1Count?city=' + $scope.cityName)
            .success(function (res) {
                $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
                //alert(res[0]["count(*)"]);
            })
            .error(function (res) {
                alert("网络出错");
            });
        // if (page == $scope.totalPages - 1) {    //添加完毕时显示最后一页
        //     page = $scope.totalPages;
        // }
        $scope.currPage = page;
        $http.get($scope.testUrl + 'getAllTable1Datas?page=' + page + '&city=' + $scope.cityName)
            .success(function (res) {
                //console.log(res);
                $scope.table1Datas = [].concat(res);
                $scope.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 };
                for (let i = 0; i < $scope.table1Datas.length; i++) {
                    if ($scope.table1Datas[i].area != null) {
                        $scope.table1Total.area = $scope.table1Total.area + $scope.table1Datas[i].area;
                    }
                    if ($scope.table1Datas[i].land != null) {
                        $scope.table1Total.land = $scope.table1Total.land + $scope.table1Datas[i].land;
                    }
                    if ($scope.table1Datas[i].nonland != null) {
                        $scope.table1Total.nonland = $scope.table1Total.nonland + $scope.table1Datas[i].nonland;
                    }
                    if ($scope.table1Datas[i].quantity != null) {
                        $scope.table1Total.quantity = $scope.table1Total.quantity + $scope.table1Datas[i].quantity;
                    }
                }
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function getUserDatas() {
        $http.get($scope.testUrl + 'getUserTable')
            .success(function (res) {
                $scope.userDatas = [].concat(res);
            })
            .error(function (res) {
                alert("网络出错");
            });
    }
    function manageUser() {
        $scope.isManageUser = 1;
        getUserDatas();
    }
    function manageTable() {
        $scope.isManageUser = 0;
        $scope.cityLevel = '0';
        $scope.cityName = '';
    }
    function isShowCity1(index) {  //第一层展开
        if ($scope.citys1[index].flag == false)
            $scope.citys1[index].flag = true;
        else
            $scope.citys1[index].flag = false;
        $scope.cityName = $scope.citys1[index].name;
        $scope.cityLevel = '1';
        $scope.tableIndex = '0';
        $scope.isManageUser = 0;
        getC2List();
        //console.log("$scope.citys1[index].flag:"+$scope.citys1[index].flag);
    }
    function isShowCity2(index) {  //第二层展开
        // if ($scope.citys2[index].flag == false)
        //     $scope.citys2[index].flag = true;
        // else
        //     $scope.citys2[index].flag = false;
        $scope.cityName = $scope.citys2[index].name;
        $scope.cityLevel = '2';
        $scope.tableIndex = '0';
        $scope.isManageUser = 0;
        getC3List();
    }
    function isShowCity3(index) {  //第三层展开
        // if ($scope.citys3[index].flag == false)
        //     $scope.citys3[index].flag = true;
        // else
        //     $scope.citys3[index].flag = false;
        $scope.cityName = $scope.citys3[index].name;
        $scope.cityLevel = '3';
        $scope.tableIndex = '0';
        $scope.isManageUser = 0;
        getC4List();
        //console.log("$scope.cityLevel:"+$scope.cityLevel);
    }
    function selectItem(item) {    //第四层选择
        //console.log("cityName:" + item);
        $scope.cityName = item;
        $scope.cityLevel = '4';
        $scope.tableIndex = '0';
        $scope.isManageUser = 0;
    }
    function selectTable(index) {   //表格选择
        $scope.tableIndex = index;
        //console.log($scope.tableIndex);
        switch ($scope.tableIndex) {
            case '1':
                getAllTable1Datas(1);//得到初始表一数据
                break;
            case '2':
                getPeopleList();
                break;
            case '3':
                getPeopleList();
                break;
            case '4':
                getPeopleList();
                break;
            case '5':
                getAllTable5Datas(1);
                break;
            case '7':
                getAllTable7Datas();
                break;
            case '9':
                getAllTable9Datas();
                break;
            case '10':
                getAllTable101Datas();
                break;
            case '11':
                getAllTable11Datas();
                break;
            case '12':
                getAllTable12Datas();
                break;
            case '42':
                getAllTable42Datas(1);
                break;
            case '43':
                getAllTable43Datas(1);
                break;
            case '71':
                getAllTable71Datas(1);
                break;
            case '91':
                getAllTable91Datas();
                break;
            case '92':
                getAllTable92Datas();
                break;
            case '93':
                getAllTable93Datas();
                break;
            case '101':
                getAllTable101Datas();
                break;
            default:
                break;
        }
    }
    function outputExcel() {        //导出表格
        switch ($scope.tableIndex) {
            case '1':
                outputExcel1();
                break;
            case '2':
                outputExcel2();
                break;
            case '3':
                outputExcel3();
                break;
            case '4':
                outputExcel4();
                break;
            case '5':
                outputExcel5();
                break;
            case '7':
                outputExcel7();
                break;
            case '9':
                outputExcel9();
                break;
            case '10':
                outputExcel10();
                break;
            case '11':
                outputExcel11();
                break;
            case '12':
                outputExcel12();
                break;
            case '42':
                outputExcel42();
                break;
            case '43':
                outputExcel43();
                break;
            case '71':
                outputExcel71();
                break;
            case '91':
                outputExcel91();
                break;
            case '92':
                outputExcel92();
                break;
            case '93':
                outputExcel93();
                break;
            case '101':
                outputExcel101();
                break;
            case '411':
                outputExcel411();
                break;
            case '412':
                outputExcel412();
                break;
            case '413':
                outputExcel413();
                break;
            default:
                console.log("no this table..");
        }
    }
    function output2Excel(num) {
        switch (num) {
            case 11:
                outputExcel111();
                break;
            case 12:
                outputExcel112();
                break;
            case 13:
                outputExcel113();
                break;
            case 21:
                outputExcel121();
                break;
            case 22:
                outputExcel122();
                break;
            case 23:
                outputExcel123();
                break;
            default:
                console.log("no this table..");
        }
    }
    //
    function outputExcel121() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—2 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 13;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['镇（乡、街办）', '征地面积(亩)', '房屋(m2)', '构筑物(亩、m、m2、m3、个、口、套)'];
        for (let i = 0; i < 4; i++) {
            if (i > 1) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 5;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 2; i++) {
            row2.addCell();
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        for (let i = 0; i < 12; i++) {
            var cell3 = row2.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['c4', 'area', 'familys', 't1', 't2', 't3', 't4', 'total',
            'a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
        for (let i = 0; i < $scope.table12DatasP1.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table12DatasP1[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 1; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table12TotalP1[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版';
        cellOver1.hMerge = 13;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 14; i++) {
            if (i == 0 || i == 1) {
                sheet.col(i).width = 13;
            }
            else if (i == 11) {
                sheet.col(i).width = 8;
            }
            else {
                sheet.col(i).width = 5;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '--表1-2--第1页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel122() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—2 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 13;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        //第二页
        const rowLine2 = sheet.addRow();
        const cellLine21 = rowLine2.addCell();
        cellLine21.value = "工程名称：川南城际铁路 线   标段 第2页 共3页";
        cellLine21.hMerge = 13;
        border(cellLine21, 0, 0, 1, 0);
        //多级表头
        const row21 = sheet.addRow();
        const cell1 = row21.addCell();
        cell1.value = '镇（乡、街办）';
        cell1.vMerge = 1;
        cell1.style.align.v = 'center';
        border(cell1, 0, 0, 1, 0);
        const cell21 = row21.addCell();
        cell21.value = '构筑物(亩、m、m2、m3、个、口、套)';
        cell21.hMerge = 12;
        cell21.style.align.h = 'center';
        border(cell21, 0, 0, 1, 0);

        const row22 = sheet.addRow();
        for (let i = 0; i < 1; i++) {
            row22.addCell();
        }
        for (let i = 12; i < 25; i++) {
            var cell3 = row22.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content2 = ['c4', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
            'a8', 'a9', 'a10', 'a11', 'a12', 'a13'];
        for (let i = 0; i < $scope.table12DatasP2.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content2.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table12DatasP2[i][table1Content2[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal2 = sheet.addRow();
        const cellT22 = rowTotal2.addCell();
        cellT22.value = "合计";
        border(cellT22, 0, 0, 1, 0);
        for (let i = 1; i < table1Content2.length; i++) {
            const cellT3 = rowTotal2.addCell();
            cellT3.value = $scope.table12TotalP2[table1Content2[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版';
        cellOver1.hMerge = 13;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 14; i++) {
            if (i == 0) {
                sheet.col(i).width = 10;
            }
            else if (i == 5 || i == 11 || i == 12) {
                sheet.col(i).width = 9;
            }
            else {
                sheet.col(i).width = 5;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '--表1-2--第2页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel123() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—2 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 16;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        //第三页
        const rowLine3 = sheet.addRow();
        const cellLine31 = rowLine3.addCell();
        cellLine31.value = "工程名称：川南城际铁路 线   标段 第3页 共3页";
        cellLine31.hMerge = 16;
        border(cellLine31, 0, 0, 1, 0);
        //多级表头
        const row31 = sheet.addRow();
        const cell13 = row31.addCell();
        cell13.value = '镇(乡、街办)';
        cell13.vMerge = 1;
        cell13.style.align.v = 'center';
        border(cell13, 0, 0, 1, 0);
        const cell31 = row31.addCell();
        cell31.value = '构筑物(亩、m、m2、m3、个、口、套)';
        cell31.hMerge = 15;
        cell31.style.align.h = 'center';
        border(cell31, 0, 0, 1, 0);

        const row32 = sheet.addRow();
        for (let i = 0; i < 1; i++) {
            row32.addCell();
        }
        for (let i = 25; i < table1Head2.length; i++) {
            var cell3 = row32.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content3 = ['c4', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
            'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14', 'a15', 'a16'];
        for (let i = 0; i < $scope.table12DatasP3.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content3.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table12DatasP3[i][table1Content3[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal3 = sheet.addRow();
        const cellT32 = rowTotal3.addCell();
        cellT32.value = "合计";
        border(cellT32, 0, 0, 1, 0);
        for (let i = 1; i < table1Content3.length; i++) {
            const cellT3 = rowTotal3.addCell();
            cellT3.value = $scope.table12TotalP3[table1Content3[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版';
        cellOver1.hMerge = 16;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇(乡、街办)主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 3;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 3; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 17; i++) {
            if (i == 0) {
                sheet.col(i).width = 9;
            }
            else if (i == 2 || i == 3 || i == 6) {
                sheet.col(i).width = 8;
            }
            else if (i == 1 || i == 8 || i == 13 || i == 14 || i == 15) {
                sheet.col(i).width = 5;
            }
            else {
                sheet.col(i).width = 4;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '--表1-2--第3页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel111() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—1 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 13;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['村(社区)', '征地面积(亩)', '房屋(m2)', '构筑物(亩、m、m2、m3、个、口、套)'];
        for (let i = 0; i < 4; i++) {
            if (i > 1) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 5;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 2; i++) {
            row2.addCell();
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        for (let i = 0; i < 12; i++) {
            var cell3 = row2.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['c4', 'area', 'familys', 't1', 't2', 't3', 't4', 'total',
            'a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
        for (let i = 0; i < $scope.table11DatasP1.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table11DatasP1[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 1; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table11TotalP1[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版。';
        cellOver1.hMerge = 13;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 14; i++) {
            if (i == 0 || i == 1) {
                sheet.col(i).width = 13;
            }
            else if (i == 11) {
                sheet.col(i).width = 8;
            }
            else {
                sheet.col(i).width = 5;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '--表1-1--第1页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel112() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—1 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 13;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        //第二页
        const rowLine2 = sheet.addRow();
        const cellLine21 = rowLine2.addCell();
        cellLine21.value = "工程名称：川南城际铁路 线   标段 第2页 共3页";
        cellLine21.hMerge = 13;
        border(cellLine21, 0, 0, 1, 0);
        //多级表头
        const row21 = sheet.addRow();
        const cell1 = row21.addCell();
        cell1.value = '村(社区)';
        cell1.vMerge = 1;
        cell1.style.align.v = 'center';
        border(cell1, 0, 0, 1, 0);
        const cell21 = row21.addCell();
        cell21.value = '构筑物(亩、m、m2、m3、个、口、套)';
        cell21.hMerge = 12;
        cell21.style.align.h = 'center';
        border(cell21, 0, 0, 1, 0);

        const row22 = sheet.addRow();
        for (let i = 0; i < 1; i++) {
            row22.addCell();
        }
        for (let i = 12; i < 25; i++) {
            var cell3 = row22.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content2 = ['c4', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
            'a8', 'a9', 'a10', 'a11', 'a12', 'a13'];
        for (let i = 0; i < $scope.table11DatasP2.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content2.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table11DatasP2[i][table1Content2[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal2 = sheet.addRow();
        const cellT22 = rowTotal2.addCell();
        cellT22.value = "合计";
        border(cellT22, 0, 0, 1, 0);
        for (let i = 1; i < table1Content2.length; i++) {
            const cellT3 = rowTotal2.addCell();
            cellT3.value = $scope.table11TotalP2[table1Content2[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版。';
        cellOver1.hMerge = 13;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 14; i++) {
            if (i == 0) {
                sheet.col(i).width = 10;
            }
            else if (i == 5 || i == 11 || i == 12) {
                sheet.col(i).width = 9;
            }
            else {
                sheet.col(i).width = 5;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '--表1-1--第2页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel113() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统迁建(构)筑物数量汇总表";
        lines[1] = "建协1—1 " + $scope.cityName;
        lines[2] = "工程名称：川南城际铁路 线   标段 第1页 共3页";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 16;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        var table1Head2 = [['户数'], ['框架'], ['砖混'], ['砖瓦'], ['土木'], ['小计'], ["院坝", "a1"], ["围墙", "a2"], ["灶头", "a3"], ["粪（水）池", "a4"], ["水缸", "a5"]
            , ["粮仓", "a6"], ["堡坎", "a1"], ["坟墓", "a2"], ["沼气池", "a3"], ["简易棚", "a4"], ["金属棚架", "a5"], ["水井", "a6"],
        ["水窖", "a7"], ["钢管", "a8"], ["胶管", "a9"], ["烤烟房", "a10"], ["公路或机耕道", "a11"], ["卫星接收器", "a12"], ["太阳能", "a13"],
        ["水泥管", "a1"], ["水泥梯步", "a2"], ["围墙大门", "a3"], ["电杆", "a4"], ["电线", "a5"], ["水泥碗柜", "a6"],
        ["闸阀", "a7"], ["PVC管", "a8"], ["沟渠", "a9"], ["鱼池", "a10"], ["大棚", "a11"], ["花台", "a12"], ["洗衣台", "a13"]
            , ["砖瓦窑", "a14"], ["石灰窑", "a14"], ["畜圈", "a16"]];
        //第三页
        const rowLine3 = sheet.addRow();
        const cellLine31 = rowLine3.addCell();
        cellLine31.value = "工程名称：川南城际铁路 线   标段 第3页 共3页";
        cellLine31.hMerge = 16;
        border(cellLine31, 0, 0, 1, 0);
        //多级表头
        const row31 = sheet.addRow();
        const cell13 = row31.addCell();
        cell13.value = '村(社区)';
        cell13.vMerge = 1;
        cell13.style.align.v = 'center';
        border(cell13, 0, 0, 1, 0);
        const cell31 = row31.addCell();
        cell31.value = '构筑物(亩、m、m2、m3、个、口、套)';
        cell31.hMerge = 15;
        cell31.style.align.h = 'center';
        border(cell31, 0, 0, 1, 0);

        const row32 = sheet.addRow();
        for (let i = 0; i < 1; i++) {
            row32.addCell();
        }
        for (let i = 25; i < table1Head2.length; i++) {
            var cell3 = row32.addCell();
            cell3.value = table1Head2[i][0];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content3 = ['c4', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
            'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14', 'a15', 'a16'];
        for (let i = 0; i < $scope.table11DatasP3.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content3.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table11DatasP3[i][table1Content3[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal3 = sheet.addRow();
        const cellT32 = rowTotal3.addCell();
        cellT32.value = "合计";
        border(cellT32, 0, 0, 1, 0);
        for (let i = 1; i < table1Content3.length; i++) {
            const cellT3 = rowTotal3.addCell();
            cellT3.value = $scope.table11TotalP3[table1Content3[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。结合地验交—4表对每个村（社区）分别填出汇总数据，并汇总本镇（乡、街办）数据。本表由镇（乡、街办）一级填制。本表签字盖章后扫描为电子版。';
        cellOver1.hMerge = 16;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）主管部门: （章) ", "负责人", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 3;
            if (i == 3) {
                cellOver.hMerge = 4;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 3; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 17; i++) {
            if (i == 0) {
                sheet.col(i).width = 9;
            }
            else if (i == 2 || i == 3 || i == 6) {
                sheet.col(i).width = 8;
            }
            else if (i == 1 || i == 8 || i == 13 || i == 14 || i == 15) {
                sheet.col(i).width = 5;
            }
            else {
                sheet.col(i).width = 4;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '--表1-1--第3页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel413() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "铁路建设项目征地、拆迁补偿费清册";
        lines[1] = "地验交—4—1 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 8;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['户名', '凭证编号', '补偿类别', '单位', '数量', '单价(元)', '金额(元)', '领款人（单位）签字盖章', '备注'];
        for (let i = 0; i < 9; i++) {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.style.align.v = 'center';
            border(cell1, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['name', '', '土地', 'm²', 'quantity', 'price', 'total'];
        for (let i = 0; i < $scope.table413Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                border(cellContent, 0, 0, 1, 0);
                if (j == 0 || j > 3) {
                    cellContent.value = $scope.table413Datas[i][table1Content[j]];
                }
                else {
                    cellContent.value = table1Content[j];
                }
            }
            for (let j = 0; j < 2; j++) {
                cellContents = rowContent.addCell();
                border(cellContents, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['t1', 't2'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = '';
            border(cellT3, 0, 0, 1, 0);
            rowTotal.addCell();
        }
        for (let i = 0; i < 1; i++) {
            cellTs = rowTotal.addCell();
            cellTs.value = '';
            border(cellTs, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以户为单位由镇（乡、街办）填写，凭证编号指同被拆迁户签订的协议、付款凭证的财务账编号，补偿类别为土地、';
        cellOver1.hMerge = 8;
        border(cellOver1, 0, 0, 1, 0);
        const rowOver2 = sheet.addRow();
        const cellOver2 = rowOver2.addCell();
        cellOver2.value = '青苗、地面建筑物等，或汇总为“补偿款”。本表签字盖章后同相关附件（协议、付款凭证原件）扫描为电子版。';
        cellOver2.hMerge = 8;
        border(cellOver2, 0, 0, 1, 0);
        var tableOver = ["村（社区）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 1;
            if (i == 3) {
                cellOver.hMerge = 2;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 1; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 9; i++) {
            sheet.col(i).width = 10;
        }
        //导出
        var excelRoot = $scope.cityName + $scope.table413Total.city4Name + '--表4-1土地--第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel412() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "铁路建设项目征地、拆迁补偿费清册";
        lines[1] = "地验交—4—1 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 8;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['户名', '凭证编号', '补偿类别', '单位', '数量', '单价(元)', '金额(元)', '领款人（单位）签字盖章', '备注'];
        for (let i = 0; i < 9; i++) {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.style.align.v = 'center';
            border(cell1, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['name', '', '地面建筑物', 'm²', 'area1', 'price', 'total'];
        for (let i = 0; i < $scope.table412Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                border(cellContent, 0, 0, 1, 0);
                if (j == 0 || j > 3) {
                    cellContent.value = $scope.table412Datas[i][table1Content[j]];
                }
                else {
                    cellContent.value = table1Content[j];
                }
            }
            for (let j = 0; j < 2; j++) {
                cellContents = rowContent.addCell();
                border(cellContents, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['t1', 't2'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table412Total[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
            rowTotal.addCell();
        }
        for (let i = 0; i < 1; i++) {
            cellTs = rowTotal.addCell();
            cellTs.value = '';
            border(cellTs, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以户为单位由镇（乡、街办）填写，凭证编号指同被拆迁户签订的协议、付款凭证的财务账编号，补偿类别为土地、';
        cellOver1.hMerge = 8;
        border(cellOver1, 0, 0, 1, 0);
        const rowOver2 = sheet.addRow();
        const cellOver2 = rowOver2.addCell();
        cellOver2.value = '青苗、地面建筑物等，或汇总为“补偿款”。本表签字盖章后同相关附件（协议、付款凭证原件）扫描为电子版。';
        cellOver2.hMerge = 8;
        border(cellOver2, 0, 0, 1, 0);
        var tableOver = ["村（社区）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 1;
            if (i == 3) {
                cellOver.hMerge = 2;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 1; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 9; i++) {
            sheet.col(i).width = 10;
        }
        //导出
        var excelRoot = $scope.cityName + $scope.table412Total.city4Name + '--表4-1地面建筑物--第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel411() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "铁路建设项目征地、拆迁补偿费清册";
        lines[1] = "地验交—4—1 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 8;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['户名', '凭证编号', '补偿类别', '单位', '数量', '单价(元)', '金额(元)', '领款人（单位）签字盖章', '备注'];
        for (let i = 0; i < 9; i++) {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.style.align.v = 'center';
            border(cell1, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['name', '', '青苗', '亩', 'quantity', 'price', 'total'];
        for (let i = 0; i < $scope.table411Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                border(cellContent, 0, 0, 1, 0);
                if (j == 0 || j > 3) {
                    cellContent.value = $scope.table411Datas[i][table1Content[j]];
                }
                else {
                    cellContent.value = table1Content[j];
                }
            }
            for (let j = 0; j < 2; j++) {
                cellContents = rowContent.addCell();
                border(cellContents, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['t1', 't2'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table411Total[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
            rowTotal.addCell();
        }
        for (let i = 0; i < 1; i++) {
            cellTs = rowTotal.addCell();
            cellTs.value = '';
            border(cellTs, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以户为单位由镇（乡、街办）填写，凭证编号指同被拆迁户签订的协议、付款凭证的财务账编号，补偿类别为土地、';
        cellOver1.hMerge = 8;
        border(cellOver1, 0, 0, 1, 0);
        const rowOver2 = sheet.addRow();
        const cellOver2 = rowOver2.addCell();
        cellOver2.value = '青苗、地面建筑物等，或汇总为“补偿款”。本表签字盖章后同相关附件（协议、付款凭证原件）扫描为电子版。';
        cellOver2.hMerge = 8;
        border(cellOver2, 0, 0, 1, 0);
        var tableOver = ["村（社区）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 1;
            if (i == 3) {
                cellOver.hMerge = 2;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 1; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 9; i++) {
            sheet.col(i).width = 10;
        }
        //导出
        var excelRoot = $scope.cityName + $scope.table411Total.city4Name + '--表4-1青苗--第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel42() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "铁路建设项目征地、拆迁补偿费清册";
        lines[1] = "地验交—4—2 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 8;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['村(社区)', '凭证编号', '补偿类别', '单位', '数量', '单价(元)', '金额(元)', '领款人（单位）\n签字盖章', '备注'];
        for (let i = 0; i < 9; i++) {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.style.align.v = 'center';
            border(cell1, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['c4', '', 'type', 'unit', 'quantity', 'price', 'total'];
        for (let i = 0; i < $scope.table42Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                if (j != 1) {
                    cellContent.value = $scope.table42Datas[i][table1Content[j]];
                }
                border(cellContent, 0, 0, 1, 0);
            }
            for (let j = 0; j < 2; j++) {
                cellContents = rowContent.addCell();
                border(cellContents, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['t1', 't2'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table42Total[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
            rowTotal.addCell();
        }
        for (let i = 0; i < 1; i++) {
            cellTs = rowTotal.addCell();
            cellTs.value = '';
            border(cellTs, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以村（社区）为单位由镇（乡、街办）一级填写，依据各村（社区）报来的地验交—4—1表进行填制。凭证编号指付款凭证的财务账编';
        cellOver1.hMerge = 8;
        border(cellOver1, 0, 0, 1, 0);
        const rowOver2 = sheet.addRow();
        const cellOver2 = rowOver2.addCell();
        cellOver2.value = '号，补偿类别为村为单位的“补偿款”总额、土地补偿款等由镇（乡、街办）补偿到村（社区）的各类费用。本表签字盖章后同相关附件（各村报送资料）扫描为电子版。';
        cellOver2.hMerge = 8;
        border(cellOver2, 0, 0, 1, 0);
        var tableOver = ["镇（乡、街办）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 1;
            if (i == 3) {
                cellOver.hMerge = 2;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 1; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 9; i++) {
            sheet.col(i).width = 10;
        }
        //导出
        var excelRoot = $scope.cityName + '--表4-2--第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel43() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "铁路建设项目征地、拆迁补偿费清册";
        lines[1] = "地验交—4—3 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 8;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['被拆迁单位名称', '凭证编号', '补偿类别', '单位', '数量', '单价(元)', '金额(元)', '签字盖章', '备注'];
        for (let i = 0; i < 9; i++) {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.style.align.v = 'center';
            border(cell1, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['name', 'id', 'type', 'unit', 'quantity', 'price', 'total'];
        for (let i = 0; i < $scope.table43Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table43Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
            for (let k = 0; k < 2; k++) {
                const cellContents = rowContent.addCell();
                cellContents.value = '';
                border(cellContents, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['t1', 't2'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table43Total[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
            rowTotal.addCell();
        }
        for (let k = 0; k < 1; k++) {
            const cellrowTotal = rowTotal.addCell();
            cellrowTotal.value = '';
            border(cellrowTotal, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以户（企业单位）为单位由县（区）一级填写。凭证编号指付款凭证的财务账编号，补偿类别为“补偿款”总额、土地补偿款等各类费用。本表签字盖章后同相关附件（各村报送资料）扫描为电子版。';
        cellOver1.hMerge = 8;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["县（区）主管部门（单位）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 3; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 1;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 1; i++) {
                rowOver.addCell();
            }
        }
        const cellOverl = rowOver.addCell();
        cellOverl.value = tableOver[3];
        cellOverl.hMerge = 2;
        border(cellOverl, 0, 0, 1, 0);
        //设置列宽度
        for (let i = 0; i < 9; i++) {
            if (i == 0 || i == 1) {
                sheet.col(i).width = 15;
            }
            else {
                sheet.col(i).width = 8;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '--表4-3--第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel5() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路拆迁厂矿企事业单位数量汇总表";
        lines[1] = "建协5 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + "共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 10;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '被拆迁单位名称', '地址（所属地、街道名称及门牌号）', '占地面积（亩）', '厂矿企事业单位的拆迁主要项目（㎡）', '说明'];
        for (let i = 0; i < 6; i++) {
            if (i == 4) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 5;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        var table1Head2 = ['住房', '办公', '铺面', '厂房', '其它', '小计'];
        for (let i = 0; i < 6; i++) {
            var cell3 = row2.addCell();
            cell3.value = table1Head2[i];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['id', 'name', 'address', 'area', 'a1', 'a2', 'a3', 'a4', 'a5', 'total', 'doc'];
        for (let i = 0; i < $scope.table5Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table5Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "";
        border(cellT1, 0, 0, 1, 0);
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 1; i++) {
            rowTotal.addCell();
        }
        var table1Content = ['area', 'a1', 'a2', 'a3', 'a4', 'a5', 'total'];
        for (let i = 0; i < table1Content.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = $scope.table5Total[table1Content[i]];
            border(cellT3, 0, 0, 1, 0);
        }
        const cellT3s = rowTotal.addCell();
        cellT3s.value = '';
        border(cellT3s, 0, 0, 1, 0);
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表以各方现场核对签认的勘验表汇总，构筑物种类多时可以增加续表。本表由县（区）一级填写，填写内容为国有土地\n征地拆迁。本表签字盖章后同相关附件（协议、付款凭证原件）扫描为电子版';
        cellOver1.hMerge = 10;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["县（区）主管部门（单位）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            if (i == 3) {
                cellOver.hMerge = 1;
            }
            else {
                cellOver.hMerge = 2;
            }
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 11; i++) {
            if (i == 1) {
                sheet.col(i).width = 15;
            }
            else if (i == 2) {
                sheet.col(i).width = 25;
            }
            else if (i == 3) {
                sheet.col(i).width = 10;
            }
            else {
                sheet.col(i).width = 5;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表5-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel101() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路征地拆迁投资完成汇总表";
        lines[1] = "建协10-1 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 10;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 7; i++) {
            if (i > 2) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 3; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['unit', 'a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let i = 0; i < $scope.table101Datas.length; i++) {
            const rowContent = sheet.addRow();
            const cellContent1 = rowContent.addCell();
            cellContent1.value = $scope.table101NumDatas[i];
            border(cellContent1, 0, 0, 1, 0);
            const cellContent2 = rowContent.addCell();
            cellContent2.value = $scope.table101NameDatas[i];
            border(cellContent2, 0, 0, 1, 0);
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table101Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        for (let j = 0; j < 11; j++) {
            const rowContent2 = sheet.addRow();
            var cellrowContent = rowContent2.addCell();
            cellrowContent.value = '';
            cellrowContent.hMerge = 10;
            border(cellrowContent, 0, 0, 1, 0);
        }
        // const rowContent2 = sheet.addRow();
        // const rowContent3 = sheet.addRow();
        // const rowContent4 = sheet.addRow();
        // const rowContent5 = sheet.addRow();
        // const rowContent6 = sheet.addRow();
        // const rowContent7 = sheet.addRow();
        // const rowContent8 = sheet.addRow();
        // const rowContent9 = sheet.addRow();
        // const rowContent10 = sheet.addRow();
        // const rowContent11 = sheet.addRow();
        // const rowContent12 = sheet.addRow();
        const rowContent13 = sheet.addRow();
        var cell91 = rowContent13.addCell();
        cell91.value = '';
        border(cell91, 0, 0, 1, 0);
        var cell92 = rowContent13.addCell();
        cell92.value = '合计';
        border(cell92, 0, 0, 1, 0);
        for (let i = 0; i < 1; i++) {
            rowContent13.addCell();
        }
        var table2Content = ['a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let j = 0; j < table2Content.length; j++) {
            const cellContent9 = rowContent13.addCell();
            cellContent9.value = $scope.table101Total[table2Content[j]];
            border(cellContent9, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由市铁建办汇总本区域内国有土地、集体土地征地费用。';
        cellOver1.hMerge = 10;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["主管部门: （章) ", "负责人：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            if (i == 3) {
                cellOver.hMerge = 1;
            }
            else {
                cellOver.hMerge = 2;
            }

            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 11; i++) {
            if (i == 0 || i == 2) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '--表10-1.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel10() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路征地拆迁投资完成汇总表";
        lines[1] = "建协10 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '单价', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 8; i++) {
            if (i > 3) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        const rowContent1 = sheet.addRow();
        var cell5 = rowContent1.addCell();
        cell5.value = '一';
        border(cell5, 0, 0, 1, 0);
        var cell6 = rowContent1.addCell();
        border(cell6, 0, 0, 1, 0);
        cell6.value = '征收国有、集体土地补偿安置费用';
        for (let i = 0; i < 2; i++) {
            rowContent1.addCell();
        }
        var table1Content = ['a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent = rowContent1.addCell();
            cellContent.value = $scope.table101Total[table1Content[j]];
            border(cellContent, 0, 0, 1, 0);
        }
        for (let j = 0; j < 11; j++) {
            const rowContent2 = sheet.addRow();
            var cellrowContent = rowContent2.addCell();
            cellrowContent.value = '';
            cellrowContent.hMerge = 11;
            border(cellrowContent, 0, 0, 1, 0);
        }


        // const rowContent3 = sheet.addRow();
        // const rowContent4 = sheet.addRow();
        // const rowContent5 = sheet.addRow();
        // const rowContent6 = sheet.addRow();
        // const rowContent7 = sheet.addRow();
        // const rowContent8 = sheet.addRow();
        // const rowContent9 = sheet.addRow();
        // const rowContent10 = sheet.addRow();
        // const rowContent11 = sheet.addRow();
        // const rowContent12 = sheet.addRow();
        const rowContent13 = sheet.addRow();
        var cell91 = rowContent13.addCell();
        cell91.value = '二';
        border(cell91, 0, 0, 1, 0);
        var cell92 = rowContent13.addCell();
        cell92.value = '合计';
        border(cell92, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            rowContent13.addCell();
        }
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent9 = rowContent13.addCell();
            cellContent9.value = $scope.table101Total[table1Content[j]];
            border(cellContent9, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由市铁建办汇总本区域内国有土地、集体土地征地费用。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["主管部门: （章) ", "分管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0 || i == 2 || i == 3) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 24;
            }
            else {
                sheet.col(i).width = 6;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表10.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel9() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路征地拆迁投资完成计价表";
        lines[1] = "建协9 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '单价', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 8; i++) {
            if (i > 3) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        const rowContent1 = sheet.addRow();
        var cell5 = rowContent1.addCell();
        cell5.value = '一';
        border(cell5, 0, 0, 1, 0);
        var cell6 = rowContent1.addCell();
        cell6.value = '征收国有土地补偿安置费用';
        border(cell6, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            // rowContent1.addCell();
            cell6 = rowContent1.addCell();
            cell6.value = '';
            border(cell6, 0, 0, 1, 0);
        }
        var table1Content = ['a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent = rowContent1.addCell();
            cellContent.value = $scope.t9Data1[table1Content[j]];
            border(cellContent, 0, 0, 1, 0);
        }
        const rowContent2 = sheet.addRow();
        cell6 = rowContent2.addCell();
        cell6.value = '';
        cell6.hMerge = 11;
        border(cell6, 0, 0, 1, 0);
        const rowContent3 = sheet.addRow();
        cell6 = rowContent3.addCell();
        cell6.value = '';
        cell6.hMerge = 11;
        border(cell6, 0, 0, 1, 0);
        const rowContent4 = sheet.addRow();
        cell6 = rowContent4.addCell();
        cell6.value = '';
        cell6.hMerge = 11;
        border(cell6, 0, 0, 1, 0);
        const rowContent5 = sheet.addRow();
        var cell51 = rowContent5.addCell();
        cell51.value = '二';
        border(cell51, 0, 0, 1, 0);
        var cell52 = rowContent5.addCell();
        cell52.value = '征收集体土地补偿安置费用';
        border(cell52, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            // rowContent5.addCell();
            cell6 = rowContent5.addCell();
            cell6.value = '';
            border(cell6, 0, 0, 1, 0);
        }
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent5 = rowContent5.addCell();
            cellContent5.value = $scope.t9Data2[table1Content[j]];
            border(cellContent5, 0, 0, 1, 0);
        }
        const rowContent6 = sheet.addRow();
        cell6 = rowContent6.addCell();
        cell6.value = '';
        cell6.hMerge = 11;
        border(cell6, 0, 0, 1, 0);
        const rowContent7 = sheet.addRow();
        var cell71 = rowContent7.addCell();
        cell71.value = '三';
        border(cell71, 0, 0, 1, 0);
        var cell72 = rowContent7.addCell();
        cell72.value = '工作经费';
        border(cell72, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            // rowContent7.addCell();
            cell6 = rowContent7.addCell();
            cell6.value = '';
            border(cell6, 0, 0, 1, 0);
        }
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent7 = rowContent7.addCell();
            cellContent7.value = $scope.t9Data3[table1Content[j]];
            border(cellContent7, 0, 0, 1, 0);
        }
        const rowContent8 = sheet.addRow();
        cell6 = rowContent8.addCell();
        cell6.value = '';
        cell6.hMerge = 11;
        border(cell6, 0, 0, 1, 0);
        const rowContent9 = sheet.addRow();
        var cell91 = rowContent9.addCell();
        cell91.value = '四';
        border(cell91, 0, 0, 1, 0);
        var cell92 = rowContent9.addCell();
        cell92.value = '税费等其他费用';
        border(cell92, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            // rowContent9.addCell();
            cell6 = rowContent9.addCell();
            cell6.value = '';
            border(cell6, 0, 0, 1, 0);
        }
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent9 = rowContent9.addCell();
            cellContent9.value = $scope.t9Data4[table1Content[j]];
            border(cellContent9, 0, 0, 1, 0);
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "五";
        border(cellT1, 0, 0, 1, 0);
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            // rowTotal.addCell();
            cell6 = rowTotal.addCell();
            cell6.value = '';
            border(cell6, 0, 0, 1, 0);
        }
        var totalLine = [];
        for (let j = 0; j < table1Content.length; j++) {
            totalLine[j] = $scope.t9Data1[table1Content[j]] + $scope.t9Data2[table1Content[j]] + $scope.t9Data3[table1Content[j]] + $scope.t9Data4[table1Content[j]];
        }
        for (let i = 0; i < totalLine.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = totalLine[i];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由市铁建办汇总本区域内国有土地、集体土地征地费用。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["主管部门: （章) ", "分管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0 || i == 2 || i == 3) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表9.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel91() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路（集体土地）征地拆迁投资完成计价表";
        lines[1] = "建协9-1 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '单价', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 8; i++) {
            if (i > 3) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        const rowContent1 = sheet.addRow();
        var cell5 = rowContent1.addCell();
        cell5.value = '一';
        border(cell5, 0, 0, 1, 0);
        var cell6 = rowContent1.addCell();
        cell6.value = '征地补偿及拆迁安置费用';
        cell6.hMerge = 10;
        border(cell6, 0, 0, 1, 0);
        var table1Content = ['unit', 'price', 'a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let i = 0; i < $scope.table91Datas.length; i++) {
            const rowContent = sheet.addRow();
            const cellContent1 = rowContent.addCell();
            cellContent1.value = $scope.table91NumDatas[i];
            border(cellContent1, 0, 0, 1, 0);
            const cellContent2 = rowContent.addCell();
            cellContent2.value = $scope.table91NameDatas[i];
            border(cellContent2, 0, 0, 1, 0);
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table91Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "三";
        border(cellT1, 0, 0, 1, 0);
        const cellT2 = rowTotal.addCell();
        cellT2.value = "以上合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table91Total.a1;
        totalLine[1] = $scope.table91Total.b1;
        totalLine[2] = $scope.table91Total.a2;
        totalLine[3] = $scope.table91Total.b2;
        totalLine[4] = $scope.table91Total.a3;
        totalLine[5] = $scope.table91Total.b3;
        totalLine[6] = $scope.table91Total.a4;
        totalLine[7] = $scope.table91Total.b4;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = totalLine[i];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由县（区）一级填制，根据表内费用类别据实填制后报市一级单位。本表签字盖章后扫描为电子版。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["县（区）主管部门（单位）: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0 || i == 2 || i == 3) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表9-1.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel92() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路（集体土地）征地拆迁投资完成计价表";
        lines[1] = "建协9-2 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '单价', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 8; i++) {
            if (i > 3) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        const rowContent1 = sheet.addRow();
        var cell5 = rowContent1.addCell();
        cell5.value = '一';
        border(cell5, 0, 0, 1, 0);
        var cell6 = rowContent1.addCell();
        cell6.value = '征地补偿及拆迁安置费用';
        cell6.hMerge = 10;
        border(cell6, 0, 0, 1, 0);
        var table1Content = ['unit', 'price', 'a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let i = 0; i < $scope.table92Datas.length; i++) {
            const rowContent = sheet.addRow();
            const cellContent1 = rowContent.addCell();
            cellContent1.value = $scope.table91NumDatas[i];
            border(cellContent1, 0, 0, 1, 0);
            const cellContent2 = rowContent.addCell();
            cellContent2.value = $scope.table91NameDatas[i];
            border(cellContent2, 0, 0, 1, 0);
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table92Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "三";
        border(cellT1, 0, 0, 1, 0);
        const cellT2 = rowTotal.addCell();
        cellT2.value = "以上合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table92Total.a1;
        totalLine[1] = $scope.table92Total.b1;
        totalLine[2] = $scope.table92Total.a2;
        totalLine[3] = $scope.table92Total.b2;
        totalLine[4] = $scope.table92Total.a3;
        totalLine[5] = $scope.table92Total.b3;
        totalLine[6] = $scope.table92Total.a4;
        totalLine[7] = $scope.table92Total.b4;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = totalLine[i];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由市铁建办根据各县（区）所填制建协表—9—1汇总填制。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["市政府主管部门: （章) ", "分管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            border(cellOver, 0, 0, 1, 0);
            cellOver.hMerge = 2;
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0 || i == 2 || i == 3) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表9-2.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel93() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路（国有土地）征地拆迁投资完成计价表";
        lines[1] = "建协9-3 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['序号', '项目及费用名称', '单位', '单价', '本月完成(元)', '本季完成(元)', '本年完成(元)', '开累完成(元)'];
        for (let i = 0; i < 8; i++) {
            if (i > 3) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 1;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 4; i++) {
            var cell3 = row2.addCell();
            cell3.value = '数量';
            border(cell3, 0, 0, 1, 0);
            var cell4 = row2.addCell();
            cell4.value = '价值';
            border(cell4, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ['unit', 'price', 'a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4'];
        for (let i = 0; i < $scope.table93Datas.length; i++) {
            const rowContent = sheet.addRow();
            const cellContent1 = rowContent.addCell();
            cellContent1.value = $scope.table93NumDatas[i];
            border(cellContent1, 0, 0, 1, 0);
            const cellContent2 = rowContent.addCell();
            cellContent2.value = $scope.table93NameDatas[i];
            border(cellContent2, 0, 0, 1, 0);
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table93Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "四";
        border(cellT1, 0, 0, 1, 0);
        const cellT2 = rowTotal.addCell();
        cellT2.value = "合计";
        border(cellT2, 0, 0, 1, 0);
        for (let i = 0; i < 2; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table93Total.a1;
        totalLine[1] = $scope.table93Total.b1;
        totalLine[2] = $scope.table93Total.a2;
        totalLine[3] = $scope.table93Total.b2;
        totalLine[4] = $scope.table93Total.a3;
        totalLine[5] = $scope.table93Total.b3;
        totalLine[6] = $scope.table93Total.a4;
        totalLine[7] = $scope.table93Total.b4;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT3 = rowTotal.addCell();
            cellT3.value = totalLine[i];
            border(cellT3, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由各县（区）汇总本区域内国有土地征地费用';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["主管单位（部门）: （章) ", "分管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0 || i == 2 || i == 3) {
                sheet.col(i).width = 4;
            }
            else if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表9-3.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel71() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统征统迁完成数量统计表";
        lines[1] = "建协71 工程名称：川南城际铁路 线   标段";
        lines[2] = $scope.cityName + " 年 月 日 共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            border(cellLine, 0, 0, 1, 0);
            if (i == 0) {
                cellLine.style.align.h = 'center';
            }
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['镇(乡、街办)', '起讫里程', '统征统迁数量', '实际完成数量'];
        for (let i = 0; i < 4; i++) {
            if (i > 1) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 4;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 2;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 2; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 2; i++) {
            var cell3 = row2.addCell();
            cell3.value = '用地';
            cell3.hMerge = 2;
            cell3.style.align.h = 'center';
            border(cell3, 0, 0, 1, 0);
            row2.addCell();
            row2.addCell();
            var cell4 = row2.addCell();
            cell4.value = '拆迁';
            cell4.hMerge = 1;
            cell4.style.align.h = 'center';
            border(cell4, 0, 0, 1, 0);
            row2.addCell();
        }
        const row3 = sheet.addRow();
        var tableHead2 = ['国有土地（亩）', '集体土地（亩）', '合计（亩）', '户数', '房屋面积'];
        for (let i = 0; i < 2; i++) {
            row3.addCell();
        }
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 5; i++) {
                const cell5 = row3.addCell();
                cell5.value = tableHead2[i];
                border(cell5, 0, 0, 1, 0);
            }
        }
        //表内容
        var table1Content = ['c3', 'line', 'a1', 'b1', 't1', 'f1', 'm1', 'a2', 'b2', 't2', 'f2', 'm2'];
        for (let i = 0; i < $scope.table71Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table71Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "本页合计";
        cellT1.hMerge = 1;
        border(cellT1, 0, 0, 1, 0);
        for (let i = 0; i < 1; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table71Total.a1;
        totalLine[1] = $scope.table71Total.b1;
        totalLine[2] = $scope.table71Total.t1;
        totalLine[3] = $scope.table71Total.f1;
        totalLine[4] = $scope.table71Total.m1;
        totalLine[5] = $scope.table71Total.a2;
        totalLine[6] = $scope.table71Total.b2;
        totalLine[7] = $scope.table71Total.t2;
        totalLine[8] = $scope.table71Total.f2;
        totalLine[9] = $scope.table71Total.m2;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT2 = rowTotal.addCell();
            cellT2.value = totalLine[i];
            border(cellT2, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由县（区）一级填制，统征统迁数量一栏中填写本线在本区域所需征拆总量。本表签字盖章后扫描为电子版。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["县(区)主管部门(单位):(章)", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            if (i == 0) {
                sheet.col(i).width = 10;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表7-1-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel7() {
        const file = new xlsx.File();
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "新建铁路统征统迁完成数量统计表";
        lines[1] = "建协7 工程名称：川南城际铁路 线   标段";
        for (let i = 0; i < 2; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 11;
            cellLine.style.align.h = 'center';
            border(cellLine, 0, 0, 1, 0);
        }
        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['县（区）', '起讫里程', '统征统迁数量', '实际完成数量'];
        for (let i = 0; i < 4; i++) {
            if (i > 1) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 4;
                cell2.style.align.h = 'center';
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 2;
                cell1.style.align.v = 'center';
                border(cell1, 0, 0, 1, 0);
            }
        }
        const row2 = sheet.addRow();
        for (let i = 0; i < 2; i++) {
            row2.addCell();
        }
        for (let i = 0; i < 2; i++) {
            var cell3 = row2.addCell();
            cell3.value = '用地';
            cell3.hMerge = 2;
            cell3.style.align.h = 'center';
            border(cell3, 0, 0, 1, 0);
            row2.addCell();
            row2.addCell();
            var cell4 = row2.addCell();
            cell4.value = '拆迁';
            cell4.hMerge = 1;
            cell4.style.align.h = 'center';
            border(cell4, 0, 0, 1, 0);
            row2.addCell();
        }
        const row3 = sheet.addRow();
        var tableHead2 = ['国有土地（亩）', '集体土地（亩）', '合计（亩）', '户数', '房屋面积'];
        for (let i = 0; i < 2; i++) {
            row3.addCell();
        }
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 5; i++) {
                const cell5 = row3.addCell();
                cell5.value = tableHead2[i];
                border(cell5, 0, 0, 1, 0);
            }
        }
        //表内容
        var table1Content = ['c2', 'line', 'a1', 'b1', 't1', 'f1', 'm1', 'a2', 'b2', 't2', 'f2', 'm2'];
        for (let i = 0; i < $scope.table7Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table7Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "本页合计";
        cellT1.hMerge = 1;
        border(cellT1, 0, 0, 1, 0);
        for (let i = 0; i < 1; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table7Total.a1;
        totalLine[1] = $scope.table7Total.b1;
        totalLine[2] = $scope.table7Total.t1;
        totalLine[3] = $scope.table7Total.f1;
        totalLine[4] = $scope.table7Total.m1;
        totalLine[5] = $scope.table7Total.a2;
        totalLine[6] = $scope.table7Total.b2;
        totalLine[7] = $scope.table7Total.t2;
        totalLine[8] = $scope.table7Total.f2;
        totalLine[9] = $scope.table7Total.m2;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT2 = rowTotal.addCell();
            cellT2.value = totalLine[i];
            border(cellT2, 0, 0, 1, 0);
        }
        //表尾
        const rowOver1 = sheet.addRow();
        const cellOver1 = rowOver1.addCell();
        cellOver1.value = '备注：本表由市铁建办依据各县（区）填写的建协表—7—1填制，统征统迁数量一栏中填写本线在本区域所需征拆总量。';
        cellOver1.hMerge = 11;
        border(cellOver1, 0, 0, 1, 0);
        var tableOver = ["市政府主管单位: （章) ", "主管领导：", "复核：", "经办人："];
        const rowOver = sheet.addRow();
        for (let i = 0; i < 4; i++) {
            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i];
            cellOver.hMerge = 2;
            border(cellOver, 0, 0, 1, 0);
            for (let i = 0; i < 2; i++) {
                rowOver.addCell();
            }
        }
        //设置列宽度
        for (let i = 0; i < 12; i++) {
            sheet.col(i).width = 7;
        }
        //导出
        var excelRoot = $scope.cityName + '-表7-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel4() {
        console.log("excel4...")
        const file = new xlsx.File();
        const style = new xlsx.Style();
        style.align.h = 'center';
        style.align.v = 'center';
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "建设项目名称：川南城际铁路 线   标段";
        lines[1] = "铁路建设项目拆迁农村建（构）筑物补偿清册";
        lines[2] = $scope.cityName + " 年 月 日 共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 19;
            border(cellLine, 0, 0, 1, 0);
            if (i == 1)
                cellLine.style = style;
        }
        //多级表头
        const row1 = sheet.addRow();
        var cell1 = null;
        var table2Heads = ["铁路里程范围", $scope.current.rail, "户主姓名", $scope.current.name,
            "身份证号码", $scope.current.id, "家庭人口", $scope.current.family, "安置人口", $scope.current.people];
        for (let i = 0; i < 5; i++) {
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2];
            cell1.hMerge = 1;
            border(cell1, 0, 0, 1, 0);
            cell1 = row1.addCell();
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2 + 1];
            cell1.hMerge = 1;
            border(cell1, 0, 0, 1, 0);
            cell1 = row1.addCell();
        }

        const row2 = sheet.addRow();
        var cell2 = row2.addCell();
        cell2.value = "拆迁建筑物补偿费（元）";
        cell2.hMerge = 7;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);
        for (let i = 0; i < 7; i++) {
            row2.addCell();
        }
        cell2 = row2.addCell();
        cell2.value = "构筑物补偿费（元）";
        cell2.hMerge = 5;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);
        for (let i = 0; i < 5; i++) {
            row2.addCell();
        }
        cell2 = row2.addCell();
        cell2.value = "其他补偿（元）";
        cell2.hMerge = 5;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);

        const row3 = sheet.addRow();
        var table4Head = ["序号", "拆迁面积（平方米）", "单价", "补偿金额", "序号", "构筑物名称",
            "单位", "单价", "数量", "补偿金额", "序号", "过渡费", "搬迁费", "拆迁奖励", "建房补助"];
        for (let i = 0; i < table4Head.length; i++) {
            if (i == 1) {
                const cell2 = row3.addCell();
                cell2.value = table4Head[i];
                cell2.hMerge = 4;
                cell2.style = style;
                border(cell2, 0, 0, 1, 0);
                row3.addCell();
                row3.addCell();
                row3.addCell();
                row3.addCell();
            }
            else {
                const cell1 = row3.addCell();
                cell1.value = table4Head[i];
                cell1.vMerge = 1;
                cell1.style = style;
                border(cell1, 0, 0, 1, 0);
            }
        }
        const cell1s = row3.addCell();
        cell1s.value = '';
        cell1s.vMerge = 1;
        border(cell1s, 0, 0, 1, 0);
        const row4 = sheet.addRow();
        row4.addCell();
        var table4Head2 = ["框架结构", "砖混结构", "砖木结构", "土木结构", "简易结构"];
        for (let i = 0; i < table4Head2.length; i++) {
            const cell4 = row4.addCell();
            cell4.value = table4Head2[i];
            border(cell4, 0, 0, 1, 0);
            //cell3.style = style;
        }
        //表内容
        var table4Content = ["index", "t1", "t2", "t3", "t4", "t5", "price", "total",
            "index", "arcName", "unit", "price2", "quantity", "total2", "index", "o1", "02", "o3", "o4"];
        for (let i = 0; i < $scope.table4Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table4Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table4Datas[i][table4Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
            const cellContents = rowContent.addCell();
            cellContents.value = '';
            border(cellContents, 0, 0, 1, 0);
        }
        //表尾
        var tableOver = ["乡镇人民政府（公章）： ", "被拆迁人（签字/章）：", "结算人（签字）：",
            "审核人（签字）："];
        for (let i = 0; i < 2; i++) {
            const rowOver = sheet.addRow();

            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i * 2];
            cellOver.hMerge = 9;
            border(cellOver, 0, 0, 1, 0);

            for (let i = 0; i < 9; i++) {
                rowOver.addCell();
            }
            const cellOver2 = rowOver.addCell();
            cellOver2.value = tableOver[i * 2 + 1];
            cellOver2.hMerge = 9;
            border(cellOver2, 0, 0, 1, 0);
        }
        //设置列宽度
        for (let i = 0; i < 19; i++) {
            if (i == 9) {
                sheet.col(i).width = 9;
            }
            else if (i > 0 && i < 6) {
                sheet.col(i).width = 7;
            }
            else if (i == 7 || i == 13 || i == 17 || i == 18) {
                sheet.col(i).width = 7;
            }
            else if (i == 15 || i == 16) {
                sheet.col(i).width = 6;
            }
            else {
                sheet.col(i).width = 5;
            }

        }
        //导出
        var excelRoot = $scope.cityName + '-表4-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
    }
    //
    function outputExcel3() {
        console.log("excel3...")
        const file = new xlsx.File();
        const style = new xlsx.Style();
        //style.fill.patternType = 'solid';
        //style.fill.fgColor = '00FF0000';
        //style.fill.bgColor = 'FF000000';
        style.align.h = 'center';
        style.align.v = 'center';
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "建设项目名称：川南城际铁路 线   标段";
        lines[1] = "铁路建设项目拆迁农村建（构）筑物登记清册";
        lines[2] = $scope.cityName + " 年 月 日 共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 10;
            border(cellLine, 0, 0, 1, 0);
            if (i == 1)
                cellLine.style = style;
        }
        //多级表头
        const row1 = sheet.addRow();
        var cell1 = null;
        var table2Heads = ["铁路里程范围", $scope.current.rail, "户主姓名",
            $scope.current.name, "身份证号码", $scope.current.id];
        for (let i = 0; i < 3; i++) {
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2];
            border(cell1, 0, 0, 1, 0);
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2 + 1];
            border(cell1, 0, 0, 1, 0);
        }
        cell1 = row1.addCell();
        cell1.value = "家庭人口";
        cell1.hMerge = 1;
        border(cell1, 0, 0, 1, 0);
        cell1 = row1.addCell();
        cell1 = row1.addCell();
        cell1.value = $scope.current.family;
        cell1.hMerge = 1;
        border(cell1, 0, 0, 1, 0);
        cell1 = row1.addCell();
        cell1 = row1.addCell();
        cell1.value = "户主签名";
        cell1.vMerge = 2;
        cell1.style = style;
        border(cell1, 0, 0, 1, 0);

        const row2 = sheet.addRow();
        var cell2 = row2.addCell();
        cell2.value = "拆迁房屋";
        cell2.hMerge = 6;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);
        for (let i = 0; i < 6; i++) {
            row2.addCell();
        }
        cell2 = row2.addCell();
        cell2.value = "拆迁其他建（构）筑物";
        cell2.hMerge = 2;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);

        const row3 = sheet.addRow();
        var cell3 = null;
        var table2Heads2 = ["房屋顺序", "长(米)", "宽(米)", "高(米)", "建筑面积", "房屋性质", "房屋类别", "项目类别", "单位", "数量"];
        for (let i = 0; i < 10; i++) {
            cell3 = row3.addCell();
            cell3.value = table2Heads2[i];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table4Content = ["index", "length", "width", "high", "area",
            "type1", "type2", "prj", "unit", "quantity"];
        console.log(JSON.stringify($scope.table3Datas));
        for (let i = 0; i < $scope.table3Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table4Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table3Datas[i][table4Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
            const cellContents = rowContent.addCell();
            cellContents.value = '';
            border(cellContents, 0, 0, 1, 0);
        }
        //表尾
        var tableOver = ["乡镇人民政府签字（公章）： ", "县（区）铁建办签字（公章）", "铁路建设业主单位签字（公章）：",
            "设计单位签字（公章）：", "监理单位签字（公章）：", "铁路施工单位签字（公章）："];
        for (let i = 0; i < 3; i++) {
            const rowOver = sheet.addRow();

            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i * 2];
            cellOver.hMerge = 4;
            border(cellOver, 0, 0, 1, 0);

            for (let i = 0; i < 4; i++) {
                rowOver.addCell();
            }
            const cellOver2 = rowOver.addCell();
            cellOver2.value = tableOver[i * 2 + 1];
            cellOver2.hMerge = 5;
            border(cellOver2, 0, 0, 1, 0);
        }
        //设置列宽度
        for (let i = 0; i < 11; i++) {
            if (i == 5 || i == 6 || i == 7) {
                sheet.col(i).width = 10;
            }
            else {
                sheet.col(i).width = 7;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表3-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
    }
    //
    function outputExcel2() {
        console.log("excel2...")
        const file = new xlsx.File();
        const style = new xlsx.Style();
        // style.fill.patternType = 'solid';
        // style.fill.fgColor = '00FF0000';
        // style.fill.bgColor = 'FF000000';
        style.align.h = 'center';
        style.align.v = 'center';
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "建设项目名称：川南城际铁路 线   标段";
        lines[1] = "铁路建设项目（征）用集体土地面积、青苗及附着物补偿清册";
        lines[2] = $scope.cityName + " 年 月 日 共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            cellLine.value = lines[i];
            cellLine.hMerge = 9;
            border(cellLine, 0, 0, 1, 0);
            if (i == 1)
                cellLine.style = style;
        }
        //多级表头
        const row1 = sheet.addRow();
        var cell1 = null;
        var table2Heads = ["铁路里程范围", $scope.current.rail, "户主姓名",
            $scope.current.name, "身份证号码", $scope.current.id];
        for (let i = 0; i < 3; i++) {
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2];
            border(cell1, 0, 0, 1, 0);
            cell1 = row1.addCell();
            cell1.value = table2Heads[i * 2 + 1];
            border(cell1, 0, 0, 1, 0);
            cell1.hMerge = 1;
            cell1 = row1.addCell();
        }
        cell1 = row1.addCell();
        cell1.value = '';
        border(cell1, 0, 0, 1, 0);

        const row2 = sheet.addRow();
        var cell2 = row2.addCell();
        cell2.value = "青苗及附着物补偿";
        cell2.hMerge = 4;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);
        for (let i = 0; i < 4; i++) {
            row2.addCell();
        }
        cell2 = row2.addCell();
        cell2.value = "青苗及附着物补偿";
        cell2.hMerge = 4;
        cell2.style = style;
        border(cell2, 0, 0, 1, 0);

        const row3 = sheet.addRow();
        var cell3 = null;
        var table2Heads2 = ["类别", "单位", "数量", "标准", "补偿金额"];
        for (let i = 0; i < 5; i++) {
            cell3 = row3.addCell();
            cell3.value = table2Heads2[i];
            border(cell3, 0, 0, 1, 0);
        }
        for (let i = 0; i < 5; i++) {
            cell3 = row3.addCell();
            cell3.value = table2Heads2[i];
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table2Content = ["prj", "unit", "quantity", "price", "total",
            "prj2", "unit2", "quantity2", "price2", "total2"];
        for (let i = 0; i < $scope.table2Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table2Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table2Datas[i][table2Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
        }
        //合计行
        const rowTotal = sheet.addRow();
        var cellT1 = rowTotal.addCell();
        cellT1.value = "小计";
        border(cellT1, 0, 0, 1, 0);
        for (let i = 0; i < 3; i++) {
            rowTotal.addCell();
        }
        cellT1 = rowTotal.addCell();
        cellT1.value = $scope.table2Total.total;
        border(cellT1, 0, 0, 1, 0);
        for (let i = 0; i < 4; i++) {
            rowTotal.addCell();
        }
        cellT1 = rowTotal.addCell();
        cellT1.value = $scope.table2Total.total2;
        border(cellT1, 0, 0, 1, 0);
        //表尾
        var tableOver = ["乡镇人民政府（公章）： ", "被拆迁人（签字/章）：", "结算人（签字）：",
            "审核人（签字）："];
        for (let i = 0; i < 2; i++) {
            const rowOver = sheet.addRow();

            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i * 2];
            cellOver.hMerge = 4;
            border(cellOver, 0, 0, 1, 0);

            for (let i = 0; i < 4; i++) {
                rowOver.addCell();
            }
            const cellOver2 = rowOver.addCell();
            cellOver2.value = tableOver[i * 2 + 1];
            cellOver2.hMerge = 4;
            border(cellOver2, 0, 0, 1, 0);
        }
        //设置列宽度
        for (let i = 0; i < 10; i++) {

            sheet.col(i).width = 9;

        }
        //导出
        var excelRoot = $scope.cityName + '-表2-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });

        // var excelRoot = 'table/table2/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    //
    function outputExcel1() {
        const file = new xlsx.File();
        const style = new xlsx.Style();
        // style.fill.patternType = 'solid';
        // style.fill.fgColor = '00FF0000';
        // style.fill.bgColor = 'FF000000';
        style.align.h = 'center';
        style.align.v = 'center';
        const sheet = file.addSheet('Sheet1');
        //表上面内容
        var lines = [];
        lines[0] = "建设项目名称：川南城际铁路 线   标段";
        lines[1] = "铁路建设项目（征）用集体土地面积、青苗及附着物登记清册";
        lines[2] = $scope.cityName + " 年 月 日 共 " + $scope.totalPages + "页 第" + $scope.currPage + "页";
        for (let i = 0; i < 3; i++) {
            const rowLine = sheet.addRow();
            const cellLine = rowLine.addCell();
            if (i == 1) {
                rowLine.setHeightCM(1.4);
                cellLine.style = style;
            }
            cellLine.value = lines[i];
            cellLine.hMerge = 12;
            border(cellLine, 0, 0, 1, 0);
        }

        //多级表头
        const row1 = sheet.addRow();
        var table1Head = ['姓名', '身份证号码', '家庭人口', '安置人口', '铁路里程范围', '用地性质', '用地面积（亩）', '青苗及附着物补偿', '户主签名', '小计', '耕地', '非耕地', '项目', '单位', '数量'];
        for (let i = 0; i < 9; i++) {
            if (i == 6 || i == 7) {
                const cell2 = row1.addCell();
                cell2.value = table1Head[i];
                cell2.hMerge = 2;
                cell2.style = style;
                border(cell2, 0, 0, 1, 0);
                row1.addCell();
                row1.addCell();
            }
            else {
                const cell1 = row1.addCell();
                cell1.value = table1Head[i];
                cell1.vMerge = 1;
                cell1.style = style;
                border(cell1, 0, 0, 1, 0);
            }
        }
        // const cells1 = row1.addCell();
        // cells1.value = '';
        // border(cells1, 0, 0, 1, 0);
        const row2 = sheet.addRow();
        for (let i = 0; i < 6; i++) {
            row2.addCell();
        }
        for (let i = 9; i < 15; i++) {
            const cell3 = row2.addCell();
            cell3.value = table1Head[i];
            cell3.style = style;
            border(cell3, 0, 0, 1, 0);
        }
        //表内容
        var table1Content = ["name", "id", "family", "people", "rail", "type", "area",
            "land", "nonland", "prj", "unit", "quantity"];
        for (let i = 0; i < $scope.table1Datas.length; i++) {
            const rowContent = sheet.addRow();
            for (let j = 0; j < table1Content.length; j++) {
                const cellContent = rowContent.addCell();
                cellContent.value = $scope.table1Datas[i][table1Content[j]];
                border(cellContent, 0, 0, 1, 0);
            }
            const cellContents = rowContent.addCell();
            cellContents.value = '';
            border(cellContents, 0, 0, 1, 0);
        }
        //合计行
        const rowTotal = sheet.addRow();
        const cellT1 = rowTotal.addCell();
        cellT1.value = "本页合计";
        border(cellT1, 0, 0, 1, 0);
        cellT1.hMerge = 1;
        for (let i = 0; i < 5; i++) {
            rowTotal.addCell();
        }
        var totalLine = [];
        totalLine[0] = $scope.table1Total.area;
        totalLine[1] = $scope.table1Total.land;
        totalLine[2] = $scope.table1Total.nonland;
        totalLine[3] = null;
        totalLine[4] = null;
        totalLine[5] = $scope.table1Total.quantity;
        for (let i = 0; i < totalLine.length; i++) {
            const cellT2 = rowTotal.addCell();
            cellT2.value = totalLine[i];
            border(cellT2, 0, 0, 1, 0);
        }
        const cellT2s = rowTotal.addCell();
        cellT2s.value = '';
        border(cellT2s, 0, 0, 1, 0);
        //表尾
        var tableOver = ["乡镇人民政府签字（公章）： ", "县（区）铁建办签字（公章）", "铁路建设业主单位签字（公章）：",
            "设计单位签字（公章）：", "监理单位签字（公章）：", "铁路施工单位签字（公章）："];
        for (let i = 0; i < 3; i++) {
            const rowOver = sheet.addRow();

            const cellOver = rowOver.addCell();
            cellOver.value = tableOver[i * 2];
            cellOver.hMerge = 6;
            border(cellOver, 0, 0, 1, 0);

            for (let i = 0; i < 6; i++) {
                rowOver.addCell();
            }
            const cellOver2 = rowOver.addCell();
            cellOver2.value = tableOver[i * 2 + 1];
            cellOver2.hMerge = 5;
            border(cellOver2, 0, 0, 1, 0);
        }
        //设置列宽度
        for (let i = 0; i < 13; i++) {
            if (i == 1) {
                sheet.col(i).width = 18;
            }
            else {
                sheet.col(i).width = 6;
            }
        }
        //导出
        var excelRoot = $scope.cityName + '-表1-第' + $scope.currPage + '页.xlsx';
        file
            .saveAs('blob')
            .then(function (content) {
                saveAs(content, excelRoot);
            });
        // var excelRoot = 'table/table1/' + $scope.cityName + $scope.currPage + '.xlsx';
        // file
        //     .saveAs()
        //     .pipe(fs.createWriteStream(excelRoot));
    }
    function border(cell, top, left, bottom, right) {
        // const light = 'ffded9d4';
        const light = 'ff7e6a54';
        const dark = 'ff7e6a54';
        cell.style.border.top = 'thin';
        cell.style.border.topColor = dark;
        cell.style.border.left = 'thin';
        cell.style.border.leftColor = dark;
        cell.style.border.bottom = 'thin';
        cell.style.border.bottomColor = dark;
        cell.style.border.right = 'thin';
        cell.style.border.rightColor = dark;
        // cell.style.border.top = 'thin';
        // cell.style.border.topColor = top ? dark : light;
        // cell.style.border.left = 'thin';
        // cell.style.border.leftColor = left ? dark : light;
        // cell.style.border.bottom = 'thin';
        // cell.style.border.bottomColor = bottom ? dark : light;
        // cell.style.border.right = 'thin';
        // cell.style.border.rightColor = right ? dark : light;
    }
}