function TreeIndexController($scope, $http, user) {
    console.log("载入TreeIndexController");
    //框架参数
    // $scope.userName = user.name;
    // $scope.userCity1 = user.city1;
    // $scope.userCity2 = user.city2;
    // $scope.userCity3 = user.city3;
    $scope.userName = 'admin';
    $scope.userCity1 = 1;
    $scope.userCity2 = 0;
    $scope.userCity3 = 1;
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
    //分页
    $scope.getNextPage = getNextPage;
    //导出excel
    $scope.outputExcel = outputExcel;
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
    $scope.buildingNames = ["框架", "砖混", "砖木", "土木", "简易", "其它"];//表三建筑物类别
    $scope.getTable3ByPK = getTable3ByPK;
    $scope.saveTable3Data = saveTable3Data;
    $scope.deleteTable3 = deleteTable3;
    //表四相关
    $scope.curTable4 = {};  //表四当前编辑数据
    $scope.table4Datas = []; //表四所有数据
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
    $scope.table411Total = { "city4Name": '', "t1": 0, "t2": 0 };
    $scope.table412Datas = [];
    $scope.table412Total = { "city4Name": '', "t1": 0, "t2": 0 };
    $scope.c4CurrList = [];
    $scope.getC4List = getC4List; //根据镇名获取下属村列表
    $scope.getAllTable411Datas = getAllTable411Datas;      //根据村名获取4-1青苗数据
    $scope.getAllTable412Datas = getAllTable412Datas;      //根据村名获取4-1建筑物数据
    //表4-2相关
    $scope.table42Datas = [];
    $scope.table42Total = { "t1": 0, "t2": 0 };
    $scope.getAllTable42Datas = getAllTable42Datas;      //获取4-2数据
    //表1-1相关
    $scope.table11DatasP1 = []; //第一页
    $scope.table11TotalP1 = {};
    $scope.table11DatasP2 = []; //第二页
    $scope.table11TotalP2 = {};
    $scope.table11DatasP3 = []; //第三页
    $scope.table11TotalP3 = {};
    $scope.getAllTable11Datas = getAllTable11Datas;      //获取1-1数据
    //表1-2相关
    $scope.countC3 = 0;
    $scope.c3CurrList = [];
    $scope.table12DatasP1 = []; //第一页
    $scope.table12TotalP1 = {};
    $scope.table12DatasP2 = []; //第二页
    $scope.table12TotalP2 = {};
    $scope.table12DatasP3 = []; //第三页
    $scope.table12TotalP3 = {};
    $scope.getAllTable12Datas = getAllTable12Datas;      //获取1-1数据



    /* 
     * 内部函数
     */
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
        var realCityName = $scope.cityName;
        var countc3 = 0;
        var countc4 = 0;
        $scope.c4CurrList=[];

        $http.get('page/project/conf/city4.json').success(function (data) {
            for (var i = 0; i < $scope.c3CurrList.length; i++) {
                if(i==0){
                    $scope.c4CurrList = data[$scope.c3CurrList[i]];
                    console.log(JSON.stringify($scope.c4CurrList));
                }
                else{
                    $scope.c4CurrList.push(data[$scope.c3CurrList[i]]);
                    console.log(JSON.stringify($scope.c4CurrList));
                }
            }
        });
        console.log(JSON.stringify($scope.c4CurrList));


        $scope.cityName = realCityName;
    }

        
            
//                 for (var j = 0; j < $scope.c4CurrList.length; j++) {//1.遍历所有村

//             $http.get('http://localhost:8081/getTable1SumArea?city=' + $scope.cityName + $scope.c4CurrList[j])
//                 .success(function (res) {
//                     //var rawT4Datas = [].concat(res);
//                     res[0].c4 = $scope.cityName;
//                     $scope.table12DatasP1.push(res[0]);
//                     console.log(JSON.stringify($scope.table12DatasP1))
//                 })
//                 .error(function (res) {
//                     alert("网络出错");
//                 });
        
//     }
// });

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
        $http.get('http://localhost:8081/getTable1Area?city=' + $scope.cityName + $scope.c4CurrList[i])
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
                $http.get('http://localhost:8081/getTable3Bycity?city=' + $scope.cityName + new11.c4)
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
                                case "砖木":
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
function getAllTable42Datas() {
    $scope.table42Total = { "t1": 0, "t2": 0 };
    $scope.table42Datas = [];
    var count1 = 0;
    var count2 = 0;
    for (var i = 0; i < $scope.c4CurrList.length; i++) {//1.遍历所有村
        $http.get('http://localhost:8081/getAllTable411Datas2?city=' + $scope.cityName + $scope.c4CurrList[i])
            .success(function (res) {                       //2.青苗 
                var new42 = new Object();
                new42.c4 = $scope.c4CurrList[count1];
                new42.type = "青苗";
                new42.unit = "亩";
                new42.quantity = 0;
                new42.total = 0;
                var rawT4Datas = [].concat(res);
                for (var i = 0; i < rawT4Datas.length; i++) {
                    rawT4Datas[i].quantity = rawT4Datas[i].quantity * 1;
                    rawT4Datas[i].total = rawT4Datas[i].quantity * rawT4Datas[i].price;
                    new42.price = rawT4Datas[i].price;
                    new42.quantity = new42.quantity + rawT4Datas[i].quantity;
                    new42.total = new42.total + rawT4Datas[i].total;
                };
                $scope.table42Datas.push(new42);
                count1++;
                //console.log(JSON.stringify($scope.table42Datas));
                $scope.table42Total.t1 = $scope.table42Total.t1 + new42.quantity;
                $scope.table42Total.t2 = $scope.table42Total.t2 + new42.total;
            })
            .error(function (res) {
                alert("网络出错");
            });
        $http.get('http://localhost:8081/getAllTable412Datas2?city=' + $scope.cityName + $scope.c4CurrList[i])
            .success(function (res) {   //3.地面建筑物  地面建筑物单价不一致
                var new42 = new Object();
                new42.c4 = $scope.c4CurrList[count2];
                new42.type = "地面建筑物";
                new42.unit = "m²";
                new42.quantity = 0;
                new42.total = 0;
                var rawT4Datas = [].concat(res);
                for (var i = 0; i < rawT4Datas.length; i++) {
                    rawT4Datas[i].area1 = rawT4Datas[i].area1 * 1;
                    rawT4Datas[i].total = rawT4Datas[i].area1 * rawT4Datas[i].price;
                    new42.quantity = new42.quantity + rawT4Datas[i].area1;
                    new42.total = new42.total + rawT4Datas[i].total;
                };
                $scope.table42Datas.push(new42);
                count2++;
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
function getAllTable412Datas(city4Name, page) {    //根据村名获取表4-1－2全部数据
    $scope.currPage = page;
    $scope.table412Total.city4Name = city4Name;
    city4Name = $scope.cityName + city4Name;
    $http.get('http://localhost:8081/getTable412Count?city=' + city4Name)//1.取到总页数
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getAllTable412Datas?city=' + city4Name + '&page=' + page)//2.表内容
        .success(function (res) {
            //console.log(JSON.stringify(res));
            var rawT4Datas = [].concat(res);
            $scope.table412Total.t1 = 0;
            $scope.table412Total.t2 = 0;
            $scope.table412Datas = [];
            for (var i = 0; i < rawT4Datas.length; i++) {
                $scope.table412Datas[i] = rawT4Datas[i];
                $scope.table412Datas[i].area1 = $scope.table412Datas[i].area1 * 1;
                $scope.table412Datas[i].total = $scope.table412Datas[i].area1 * $scope.table412Datas[i].price;
                $scope.table412Total.t1 = $scope.table412Total.t1 + $scope.table412Datas[i].area1;
                $scope.table412Total.t2 = $scope.table412Total.t2 + $scope.table412Datas[i].total;
            };
        })
        .error(function (res) {
            alert("网络出错");
        });
}
function getAllTable411Datas(city4Name, page) {    //根据村名获取表4-1－1全部数据
    $scope.currPage = page;
    $scope.table411Total.city4Name = city4Name;
    city4Name = $scope.cityName + city4Name;
    $http.get('http://localhost:8081/getTable411Count?city=' + city4Name)//1.取到总页数
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getAllTable411Datas?city=' + city4Name + '&page=' + page)//2.表内容
        .success(function (res) {
            //console.log(JSON.stringify(res));
            var rawT4Datas = [].concat(res);
            $scope.table411Total.t1 = 0;
            $scope.table411Total.t2 = 0;
            $scope.table411Datas = [];
            for (var i = 0; i < rawT4Datas.length; i++) {
                $scope.table411Datas[i] = rawT4Datas[i];
                $scope.table411Datas[i].quantity = $scope.table411Datas[i].quantity * 1;
                $scope.table411Datas[i].total = $scope.table411Datas[i].quantity * $scope.table411Datas[i].price;
                $scope.table411Total.t1 = $scope.table411Total.t1 + $scope.table411Datas[i].quantity;
                $scope.table411Total.t2 = $scope.table411Total.t2 + $scope.table411Datas[i].total;
            };
        })
        .error(function (res) {
            alert("网络出错");
        });
}
function getUserByName(name) {
    $http.get('http://localhost:8081/getUserByName?pk=' + name)
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
    $http.get('http://localhost:8081/updateUser?' + url)
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
    $http.get('http://localhost:8081/deleteUser?pk=' + name)
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
    var url = 'name=' + $scope.newUser.name + '&password=' + $scope.newUser.password + '&city1=' + $scope.newUser.city1 +
        '&city2=' + $scope.newUser.city2 + '&city3=' + $scope.newUser.city3;
    $http.get('http://localhost:8081/addUser?' + url)
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
    $http.get('http://localhost:8081/updateTable4?' + urlPara)
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
    $http.get('http://localhost:8081/getTable4ByPK?pk=' + pk)
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
    $http.get('http://localhost:8081/getTable4Count?id=' + id)//1.取到总页数
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getTable1ById?id=' + id)//2.取表头信息
        .success(function (res) {
            $scope.current = res[0];
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/gettable4Datas?id=' + id + '&page=' + page)//3.取表信息
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
}
function deleteTable3(pk) { //删除表三
    $http.get('http://localhost:8081/deleteTable3?pk=' + pk)//1.删除表三
        .success(function (res) {
            getAllTable3Datas($scope.current.id, $scope.currPage);
        })
        .error(function (res) {
            alert("删除表三数据出错");
        });
    $http.get('http://localhost:8081/deleteTable4?pk=' + pk)//2.删除表四
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
        $http.get('http://localhost:8081/updateTable3?' + urlPara)//4.1更新表三
            .success(function (res) {
                alert("更新表三成功！");
            })
            .error(function (res) {
                alert("更新表三数据出错");
            });
        urlPara2 = urlPara2 + 'autoID=' + $scope.curTable3.autoID;
        console.log(urlPara2);
        $http.get('http://localhost:8081/updateTable4ByT3?' + urlPara2)//4.2更新表四
            .success(function (res) {
            })
            .error(function (res) {
                alert("更新表四数据出错");
            });
    }
    //5.添加
    else {
        $http.get('http://localhost:8081/getT4PriceByPrj?prj=' + currTable4.type1)
            .success(function (res) {//5.1 根据type1得到表四price
                if (res.length != 0)
                    urlPara2 = urlPara2 + 'price=' + res[0]["price"];
                else
                    urlPara2 = urlPara2 + 'price=0';
            })
            .error(function (res) {
                urlPara2 = urlPara2 + 'price=0';
            });
        $http.get('http://localhost:8081/getT4Price2ByPrj?prj=' + currTable4.arcName)
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
        $http.get('http://localhost:8081/addTable3?' + urlPara)//5.3 添加表三 
            .success(function (res) {
                //console.log(JSON.stringify(res));
                urlPara2 = urlPara2 + '&id=' + $scope.current.id + '&fID=' + res.insertId
                    + '&city=' + $scope.cityName + '&name=' + $scope.current.name;    //取到表三自增id
                $http.get('http://localhost:8081/addTable4?' + urlPara2) //5.4 添加表四
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
    }
    //重载表单
    $scope.curTable3 = {};
    getAllTable3Datas($scope.current.id, $scope.currPage);
}
function getTable3ByPK(pk) {    //选择要编辑的数据
    //console.log(pk);
    $http.get('http://localhost:8081/getTable3ByPK?pk=' + pk)
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
    $http.get('http://localhost:8081/getTable3Count?id=' + id)//1.取到总页数
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getTable1ById?id=' + id)//2.取表头信息
        .success(function (res) {
            $scope.current = res[0];
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/gettable3Datas?id=' + id + '&page=' + page)//3.取表信息
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
            $http.get('http://localhost:8081/updateTable2?prj=' + $scope.table2Datas[i].prj + '&type=' + $scope.Table2Type1[i])
                .success(function (res) {
                    alert("更改成功！");
                })
                .error(function (res) {
                    alert("网络出错");
                });
        }
        if ($scope.Table2Type2[i] != null) {
            $http.get('http://localhost:8081/updateTable2?prj=' + $scope.table2Datas[i].prj2 + '&type=' + $scope.Table2Type2[i])
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
    $http.get('http://localhost:8081/getTable2Count?id=' + id)//1.取到总页数
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getTable1ById?id=' + id)//2.取表头信息
        .success(function (res) {
            $scope.current = res[0];
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/gettable2Datas?id=' + id + '&page=' + page)//3.取表信息
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
        $http.get('http://localhost:8081/getNameListByName?city=' + $scope.cityName + '&text=' + filterText)
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
    $http.get('http://localhost:8081/getPeopleList?city=' + $scope.cityName)
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
            if ($scope.currPage = page) {
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
        case '411':
            getAllTable411Datas($scope.table411Total.city4Name, page);
            break;
        case '412':
            getAllTable412Datas($scope.table412Total.city4Name, page);
            break;
        default:
            console.log("no datas..");
    }
}
function saveTable1Data() {   //添加表一数据
    //更新
    if ($scope.curTable1 != null && $scope.curTable1.autoID != null) {
        var urlPara = '';
        var t1Para = ['name', 'family', 'people', 'rail', 'type',
            'area', 'land', 'nonland', 'prj', 'unit', 'quantity', 'autoID'];
        for (let i = 0; i < t1Para.length; i++) {
            urlPara = urlPara + t1Para[i] + '=' + $scope.curTable1[t1Para[i]] + '&';
        }
        //console.log(urlPara);
        $http.get('http://localhost:8081/updateTable1?' + urlPara)
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
        $http.get('http://localhost:8081/updateTable2ByT1?' + urlPara2)
            .success(function (res) {
                // alert("更新表成功！");
            })
            .error(function (res) {
                alert("更新表二数据出错");
            });

        $scope.curTable1 = {};
        getAllTable1Datas(1);
    }
    //添加
    else {
        $scope.curTable1.city = $scope.cityName;
        //添加表一、表二，表二pID外键对应表一主键 id prj unit quantity fID price
        var urlTable2 = 'city=' + $scope.cityName + '&name=' + $scope.curTable1.name + '&id=' + $scope.curTable1.id + '&prj=' + $scope.curTable1.prj +
            '&unit=' + $scope.curTable1.unit + '&quantity=' + $scope.curTable1.quantity;
        //根据prj得到表二price
        $http.get('http://localhost:8081/getPriceByPrj?prj=' + $scope.curTable1.prj)
            .success(function (res) {
                if (res.length != 0)
                    urlTable2 = urlTable2 + '&price=' + res[0]["price"];
                else
                    urlTable2 = urlTable2 + '&price=0';
            })
            .error(function (res) {
                urlTable2 = urlTable2 + '&price=0';
            });
        //添加表一
        var urlPara = '';
        var t1Para = ['name', 'id', 'family', 'people', 'rail', 'type',
            'area', 'land', 'nonland', 'prj', 'unit', 'quantity', 'city'];
        for (let i = 0; i < t1Para.length; i++) {
            if ($scope.curTable1[t1Para[i]] == null)
                $scope.curTable1[t1Para[i]] = '';
            urlPara = urlPara + t1Para[i] + '=' + $scope.curTable1[t1Para[i]] + '&';
        }
        console.log(urlPara);
        $http.get('http://localhost:8081/addTable1?' + urlPara)
            .success(function (res) {
                urlTable2 = urlTable2 + '&fID=' + res.insertId;//取到表一自增id
                //添加表二
                $http.get('http://localhost:8081/addTable2?' + urlTable2)
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
        $http.get('http://localhost:8081/addTablePeople?' + urlPeople)
            .success(function (res) {
            })
            .error(function (res) {
                // alert("添加用户表数据出错");
            });
        //重载表单
        $scope.curTable1 = {};
        getAllTable1Datas(1);
        //添加4-1表TODO
        // $scope.curTable41.name = $scope.curTable1.name;
        // $scope.curTable41.type = $scope.curTable1.prj;
        // $scope.curTable41.unit = $scope.curTable1.unit;
        // $scope.curTable41.quantity = $scope.curTable1.quantity;
        // $scope.curTable41.city = $scope.curTable1.city;
        // DataService.addTable41($scope.curTable41).then(function (affectedRows) {
        // });
    }
}
function deleteTable1(pk, id) { //删除表一
    $http.get('http://localhost:8081/deleteTable1?pk=' + pk)//1.删除表一
        .success(function (res) {
            //重新加载表1
            getAllTable1Datas(1);
        })
        .error(function (res) {
            alert("删除表一数据出错");
        });
    $http.get('http://localhost:8081/deleteTable2?pk=' + pk)//2.删除表二
        .success(function (res) {
        })
        .error(function (res) {
            alert("删除表二数据出错");
        });
    $http.get('http://localhost:8081/getTable2Count?id=' + id)//3.删除用户表
        .success(function (res) {
            console.log(res[0]["count(*)"] == 0);
            if (res[0]["count(*)"] == 0) { //此人在表一没有记录则删除用户表数据
                $http.get('http://localhost:8081/deletePeopleTable?pk=' + id)
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
    $http.get('http://localhost:8081/getTable1ByPK?pk=' + pk)
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
    $scope.currPage = page;
    $http.get('http://localhost:8081/getTable1Count')
        .success(function (res) {
            $scope.totalPages = Math.ceil(res[0]["count(*)"] / 10);
        })
        .error(function (res) {
            alert("网络出错");
        });
    $http.get('http://localhost:8081/getAllTable1Datas?page=' + page + '&city=' + $scope.cityName)
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
    $http.get('http://localhost:8081/getUserTable')
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
        case '42':
            getAllTable42Datas();
            break;
        case '11':
            getAllTable11Datas();
            break;
        case '12':
            getAllTable12Datas();
            break;
        //     case '42':
        //         getAllTable42Datas();//4-2表数据汇总
        //         break;
        //     case '43':
        //         getAllTable43Datas($scope.cityName);//4-3表数据初始化
        //         break;
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
        default:
            console.log("no this table..");
    }
}
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
        cell1 = row1.addCell();
        cell1 = row1.addCell();
        cell1.value = table2Heads[i * 2 + 1];
        cell1.hMerge = 1;
        cell1 = row1.addCell();
    }

    const row2 = sheet.addRow();
    var cell2 = row2.addCell();
    cell2.value = "拆迁建筑物补偿费（元）";
    cell2.hMerge = 7;
    cell2.style = style;
    for (let i = 0; i < 7; i++) {
        row2.addCell();
    }
    cell2 = row2.addCell();
    cell2.value = "构筑物补偿费（元）";
    cell2.hMerge = 5;
    cell2.style = style;
    for (let i = 0; i < 5; i++) {
        row2.addCell();
    }
    cell2 = row2.addCell();
    cell2.value = "其他补偿（元）";
    cell2.hMerge = 5;
    cell2.style = style;

    const row3 = sheet.addRow();
    var table4Head = ["序号", "拆迁面积（平方米）", "单价", "补偿金额", "序号", "构筑物名称",
        "单位", "单价", "数量", "补偿金额", "序号", "过渡费", "搬迁费", "拆迁奖励", "建房补助"];
    for (let i = 0; i < table4Head.length; i++) {
        if (i == 1) {
            const cell2 = row3.addCell();
            cell2.value = table4Head[i];
            cell2.hMerge = 4;
            cell2.style = style;
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
        }
    }
    const row4 = sheet.addRow();
    row4.addCell();
    var table4Head2 = ["框架结构", "砖混结构", "砖木结构", "土木结构", "简易结构"];
    for (let i = 0; i < table4Head2.length; i++) {
        const cell4 = row4.addCell();
        cell4.value = table4Head2[i];
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
        }
    }
    //表尾
    var tableOver = ["乡镇人民政府（公章）： ", "被拆迁人（签字/章）：", "结算人（签字）：",
        "审核人（签字）："];
    for (let i = 0; i < 2; i++) {
        const rowOver = sheet.addRow();

        const cellOver = rowOver.addCell();
        cellOver.value = tableOver[i * 2];
        cellOver.hMerge = 4;

        for (let i = 0; i < 4; i++) {
            rowOver.addCell();
        }
        const cellOver2 = rowOver.addCell();
        cellOver2.value = tableOver[i * 2 + 1];
        cellOver2.hMerge = 4;
    }
    //导出
    var excelRoot = '表4-' + $scope.cityName + $scope.currPage + '.xlsx';
    file
        .saveAs('blob')
        .then(function (content) {
            saveAs(content, excelRoot);
        });
}
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
        cell1 = row1.addCell();
        cell1.value = table2Heads[i * 2 + 1];
    }
    cell1 = row1.addCell();
    cell1.value = "家庭人口";
    cell1.hMerge = 1;
    cell1 = row1.addCell();
    cell1 = row1.addCell();
    cell1.value = $scope.current.family;
    cell1.hMerge = 1;
    cell1 = row1.addCell();
    cell1 = row1.addCell();
    cell1.value = "户主签名";
    cell1.vMerge = 2;
    cell1.style = style;

    const row2 = sheet.addRow();
    var cell2 = row2.addCell();
    cell2.value = "拆迁房屋";
    cell2.hMerge = 6;
    cell2.style = style;
    for (let i = 0; i < 6; i++) {
        row2.addCell();
    }
    cell2 = row2.addCell();
    cell2.value = "拆迁其他建（构）筑物";
    cell2.hMerge = 2;
    cell2.style = style;

    const row3 = sheet.addRow();
    var cell3 = null;
    var table2Heads2 = ["房屋顺序", "长(米)", "宽(米)", "高(米)", "建筑面积", "房屋性质", "房屋类别", "项目类别", "单位", "数量"];
    for (let i = 0; i < 10; i++) {
        cell3 = row3.addCell();
        cell3.value = table2Heads2[i];
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
        }
    }
    //表尾
    var tableOver = ["乡镇人民政府签字（公章）： ", "县（区）铁建办签字（公章）", "铁路建设业主单位签字（公章）：",
        "设计单位签字（公章）：", "监理单位签字（公章）：", "铁路施工单位签字（公章）："];
    for (let i = 0; i < 3; i++) {
        const rowOver = sheet.addRow();

        const cellOver = rowOver.addCell();
        cellOver.value = tableOver[i * 2];
        cellOver.hMerge = 6;

        for (let i = 0; i < 6; i++) {
            rowOver.addCell();
        }
        const cellOver2 = rowOver.addCell();
        cellOver2.value = tableOver[i * 2 + 1];
        cellOver2.hMerge = 6;
    }
    //导出
    var excelRoot = '表3-' + $scope.cityName + $scope.currPage + '.xlsx';
    file
        .saveAs('blob')
        .then(function (content) {
            saveAs(content, excelRoot);
        });
}
function outputExcel2() {
    console.log("excel2...")
    const file = new xlsx.File();
    const style = new xlsx.Style();
    style.fill.patternType = 'solid';
    style.fill.fgColor = '00FF0000';
    style.fill.bgColor = 'FF000000';
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
        cell1 = row1.addCell();
        cell1.value = table2Heads[i * 2 + 1];
        cell1.hMerge = 1;
        cell1 = row1.addCell();
    }

    const row2 = sheet.addRow();
    var cell2 = row2.addCell();
    cell2.value = "青苗及附着物补偿";
    cell2.hMerge = 4;
    cell2.style = style;
    for (let i = 0; i < 4; i++) {
        row2.addCell();
    }
    cell2 = row2.addCell();
    cell2.value = "青苗及附着物补偿";
    cell2.hMerge = 4;
    cell2.style = style;

    const row3 = sheet.addRow();
    var cell3 = null;
    var table2Heads2 = ["类别", "单位", "数量", "标准", "补偿金额"];
    for (let i = 0; i < 5; i++) {
        cell3 = row3.addCell();
        cell3.value = table2Heads2[i];
    }
    for (let i = 0; i < 5; i++) {
        cell3 = row3.addCell();
        cell3.value = table2Heads2[i];
    }
    //表内容
    var table2Content = ["prj", "unit", "quantity", "price", "total",
        "prj2", "unit2", "quantity2", "price2", "total2"];
    for (let i = 0; i < $scope.table2Datas.length; i++) {
        const rowContent = sheet.addRow();
        for (let j = 0; j < table2Content.length; j++) {
            const cellContent = rowContent.addCell();
            cellContent.value = $scope.table2Datas[i][table2Content[j]];
        }
    }
    //合计行
    const rowTotal = sheet.addRow();
    var cellT1 = rowTotal.addCell();
    cellT1.value = "小计";
    for (let i = 0; i < 3; i++) {
        rowTotal.addCell();
    }
    cellT1 = rowTotal.addCell();
    cellT1.value = $scope.table2Total.total;
    for (let i = 0; i < 4; i++) {
        rowTotal.addCell();
    }
    cellT1 = rowTotal.addCell();
    cellT1.value = $scope.table2Total.total2;
    //表尾
    var tableOver = ["乡镇人民政府（公章）： ", "被拆迁人（签字/章）：", "结算人（签字）：",
        "审核人（签字）："];
    for (let i = 0; i < 2; i++) {
        const rowOver = sheet.addRow();

        const cellOver = rowOver.addCell();
        cellOver.value = tableOver[i * 2];
        cellOver.hMerge = 4;

        for (let i = 0; i < 4; i++) {
            rowOver.addCell();
        }
        const cellOver2 = rowOver.addCell();
        cellOver2.value = tableOver[i * 2 + 1];
        cellOver2.hMerge = 4;
    }
    //导出
    var excelRoot = '表2-' + $scope.cityName + $scope.currPage + '.xlsx';
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
function outputExcel1() {
    const file = new xlsx.File();
    const style = new xlsx.Style();
    style.fill.patternType = 'solid';
    style.fill.fgColor = '00FF0000';
    style.fill.bgColor = 'FF000000';
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
        cellLine.value = lines[i];
        cellLine.hMerge = 12;
        if (i == 1)
            cellLine.style = style;
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
            row1.addCell();
            row1.addCell();
        }
        else {
            const cell1 = row1.addCell();
            cell1.value = table1Head[i];
            cell1.vMerge = 1;
            cell1.style = style;
        }
    }
    const row2 = sheet.addRow();
    for (let i = 0; i < 6; i++) {
        row2.addCell();
    }
    for (let i = 9; i < 15; i++) {
        const cell3 = row2.addCell();
        cell3.value = table1Head[i];
        //cell3.style = style;
    }
    //表内容
    var table1Content = ["name", "id", "family", "people", "rail", "type", "area",
        "land", "nonland", "prj", "unit", "quantity"];
    for (let i = 0; i < $scope.table1Datas.length; i++) {
        const rowContent = sheet.addRow();
        for (let j = 0; j < table1Content.length; j++) {
            const cellContent = rowContent.addCell();
            cellContent.value = $scope.table1Datas[i][table1Content[j]];
        }
    }
    //合计行
    const rowTotal = sheet.addRow();
    const cellT1 = rowTotal.addCell();
    cellT1.value = "本页合计";
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
    }
    //表尾
    var tableOver = ["乡镇人民政府签字（公章）： ", "县（区）铁建办签字（公章）", "铁路建设业主单位签字（公章）：",
        "设计单位签字（公章）：", "监理单位签字（公章）：", "铁路施工单位签字（公章）："];
    for (let i = 0; i < 3; i++) {
        const rowOver = sheet.addRow();

        const cellOver = rowOver.addCell();
        cellOver.value = tableOver[i * 2];
        cellOver.hMerge = 6;

        for (let i = 0; i < 6; i++) {
            rowOver.addCell();
        }
        const cellOver2 = rowOver.addCell();
        cellOver2.value = tableOver[i * 2 + 1];
        cellOver2.hMerge = 6;
    }
    //导出
    var excelRoot = '表1-' + $scope.cityName + $scope.currPage + '.xlsx';
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
}
    //     $scope.saveTable43Data = saveTable43Data;            //表4-3保存数据

    //     //得到表4-3全部数据
    //     function getAllTable43Datas(city2Name) {
    //         DataService.getAllTable43Datas(city2Name).then(function (datas) {
    //             $scope.table43Datas = [].concat(datas);
    //         });
    //     }

    //     //添加表4-3数据
    //     function saveTable43Data($event) {
    //         $scope.curTable43.city = $scope.cityName;
    //         DataService.saveTable43Data($scope.curTable43).then(function (affectedRows) {
    //             $mdDialog.show(
    //                 $mdDialog
    //                     .alert()
    //                     .clickOutsideToClose(true)
    //                     .title('Success')
    //                     .content('Data Added Successfully!')
    //                     .ok('Ok')
    //                     .targetEvent($event)
    //             );
    //         });
    //         $scope.curTable43 = {};
    //         getAllTable43Datas($scope.cityName);
    //     }


