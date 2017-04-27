function TreeIndexController($scope, $http) {
    console.log("载入TreeIndexController");
    //框架参数
    $scope.cityName = "";
    $scope.cityLevel = '1';
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
    $scope.c4CuuList = [];
    $scope.c4List = new Array();
    $scope.c4List["内江市东兴区高桥街道办"] = ["内江市东兴区高桥街道办陡坎村", "内江市东兴区高桥街道办赛峨村"];
    $scope.currPage = 1;
    $scope.totalPages = 1;
    //框架函数
    $scope.isShowCity1 = isShowCity1;
    $scope.isShowCity2 = isShowCity2;
    $scope.isShowCity3 = isShowCity3;
    $scope.selectItem = selectItem;
    $scope.selectTable = selectTable;
    //表一相关
    $scope.curTable1 = {}; //表一当前添加数据
    $scope.autoID = 0;       //表一当前行数
    $scope.table1Datas = []; //表一所有数据
    $scope.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 }; //表一合计
    $scope.getAllTable1Datas = getAllTable1Datas;//增删改查
    $scope.getTable1ByPK = getTable1ByPK;
    $scope.deleteTable1 = deleteTable1;
    $scope.saveTable1Data = saveTable1Data;
    //分页
    $scope.getNextPage = getNextPage;

    /* 
     * 内部函数
     */
    function getNextPage(flag) {//分页
        var page = 0;
        switch (flag) {
            case 0: //首页
                page = 1;
                $scope.currPage = page;
                alert("已经是首页！");
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
                $scope.currPage = page;
                alert("已经是尾页！");
                break;
            default:
                console.log("no datas..");
        }
        switch ($scope.tableIndex) {
            case '1':
                getAllTable1Datas(page);//得到初始表一数据
                break;
            // case '2':
            //     showTable2Data($scope.searchName.id, page);
            //     break;
            // case '3':
            //     getAllTable3Datas($scope.searchName.id, page);
            //     break;
            // case '4':
            //     getAllTable4Datas($scope.searchName.id, page);
            //     break;
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
            var urlTable2 = 'id=' + $scope.curTable1.id + '&prj=' + $scope.curTable1.prj +
                '&unit=' + $scope.curTable1.unit + '&quantity=' + $scope.curTable1.quantity;
            //添加表一
            var urlPara = '';
            var t1Para = ['name', 'id', 'family', 'people', 'rail', 'type',
                'area', 'land', 'nonland', 'prj', 'unit', 'quantity', 'city'];
            for (let i = 0; i < t1Para.length; i++) {
                if ($scope.curTable1[t1Para[i]] == null)
                    $scope.curTable1[t1Para[i]] = '';
                urlPara = urlPara + t1Para[i] + '=' + $scope.curTable1[t1Para[i]] + '&';
            }
            $http.get('http://localhost:8081/addTable1?' + urlPara)
                .success(function (res) {
                    //console.log(JSON.stringify(res));
                    urlTable2 = urlTable2 + '&fID=' + res.insertId + '&price=0';//取到表一自增id
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
                    alert("添加用户表数据出错");
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
    function deleteTable1(pk) { //删除表一
        $http.get('http://localhost:8081/deleteTable1?pk=' + pk)
            .success(function (res) {
                //重新加载表1
                getAllTable1Datas(1);
            })
            .error(function (res) {
                alert("删除表一数据出错");
            });
        $http.get('http://localhost:8081/deleteTable2?pk=' + pk)
            .success(function (res) {
            })
            .error(function (res) {
                alert("删除表二数据出错");
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
    };
    function isShowCity1(index) {  //第一层展开
        if ($scope.citys1[index].flag == false)
            $scope.citys1[index].flag = true;
        else
            $scope.citys1[index].flag = false;
        $scope.cityName = $scope.citys1[index].name;
        $scope.cityLevel = '1';
        $scope.tableIndex = '0';
        //console.log("$scope.citys1[index].flag:"+$scope.citys1[index].flag);
    }
    function isShowCity2(index) {  //第二层展开
        if ($scope.citys2[index].flag == false)
            $scope.citys2[index].flag = true;
        else
            $scope.citys2[index].flag = false;
        $scope.cityName = $scope.citys2[index].name;
        $scope.cityLevel = '2';
        $scope.tableIndex = '0';
    }
    function isShowCity3(index) {  //第三层展开
        if ($scope.citys3[index].flag == false)
            $scope.citys3[index].flag = true;
        else
            $scope.citys3[index].flag = false;
        $scope.cityName = $scope.citys3[index].name;
        $scope.c4CuuList = $scope.c4List[$scope.cityName];
        $scope.cityLevel = '3';
        $scope.tableIndex = '0';
        //console.log("$scope.citys3[index].flag:"+$scope.citys3[index].flag);
    }
    function selectItem(item) {    //第四层选择
        //console.log("cityName:" + item);
        $scope.cityName = item;
        $scope.cityLevel = '4';
        $scope.tableIndex = '0';
    }
    function selectTable(index) {   //表格选择
        $scope.tableIndex = index;
        switch ($scope.tableIndex) {
            case '1':
                getAllTable1Datas(1);//得到初始表一数据
                break;
            //     case '2':
            //         getPeopleList();
            //         break;
            //     case '3':
            //         getPeopleList();
            //         break;
            //     case '4':
            //         getPeopleList();
            //         break;
            //     case '11':
            //         getAllTable11Datas();//1-1表数据汇总
            //         break;
            //     case '12':
            //         getAllTable12Datas();//1-2表数据汇总
            //         break;
            //     case '42':
            //         getAllTable42Datas();//4-2表数据汇总
            //         break;
            //     case '43':
            //         getAllTable43Datas($scope.cityName);//4-3表数据初始化
            //         break;
            default:
                console.log("no this table..");
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
    function outputExcel2() {
        const fs = require('fs');
        const xlsx = require('better-xlsx');

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


        var excelRoot = 'table/table2/' + $scope.cityName + $scope.currPage + '.xlsx';

        file
            .saveAs()
            .pipe(fs.createWriteStream(excelRoot));
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
        var excelRoot = 'table1-' + $scope.cityName + $scope.currPage + '.xlsx';
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
    //     //具体表格参数
    //     $scope.paras = {
    //         "crop": "0", "ss": "0", "tree": "0", "b1": "0", "b2": "0", "b3": "0",
    //         "b4": "0", "b5": "0", "a1": "0", "a2": "0"
    //     }; //价格参数
    //     $scope.current = null;   //当前户主
    //     $scope.peopleLists = []; //所有户主的列表
    //     $scope.table2Datas = []; //表二所有数据
    //     $scope.filterText = null //搜索关键字
    //     $scope.curTable3 = null; //表三当前添加数据
    //     $scope.table3Datas = []; //表三所有数据
    //     $scope.table4Datas = []; //表四所有数据
    //     $scope.table41Datas = []; //表4-1所有数据
    //     $scope.table42Datas = []; //表4-1所有数据
    //     $scope.table43Datas = []; //表4-1所有数据
    //     $scope.curTable43 = null; //表4-3当前添加数据
    //     $scope.table11Datas = []; //表1-1所有数据
    //     $scope.table12Datas = []; //表1-2所有数据
    //     $scope.buildingNames = ["框架", "砖混", "砖木", "土木", "简易", "其它"];
    //     $scope.Table2Type = [];   //记录表二价格标准
    //     $scope.searchName = null;

    //     $scope.saveTable1Data = saveTable1Data;              //表一保存数据、people表保存数据
    //     $scope.showTable2Data = showTable2Data;              //表二点击左侧列表选择户主后显示详细信息
    //     $scope.filter = filterCustomer;                      //表二搜索
    //     $scope.saveTable3Data = saveTable3Data;              //表三保存数据
    //     $scope.getAllTable3Datas = getAllTable3Datas;        //根据户主ID获取表三数据
    //     $scope.getAllTable4Datas = getAllTable4Datas;        //根据户主ID获取表四数据
    //     $scope.getAllTable41Datas = getAllTable41Datas;      //根据村名获取4-1数据
    //     $scope.saveTable43Data = saveTable43Data;            //表4-3保存数据
    //     // $scope.changePara = changePara;                      //更改价格参数
    //     $scope.search = search;                              //点击搜索结果
    //     // $scope.changePrice = changePrice;                    //更改价格
    //     $scope.getTable1ByPK = getTable1ByPK;
    //     $scope.getTable3ByPK = getTable3ByPK;
    //     $scope.getTable4ByPK = getTable4ByPK;
    //     $scope.deleteTable1 = deleteTable1;
    //     $scope.updateTable2 = updateTable2;                   //更改表二价格标准   
    //     $scope.outputExcel = outputExcel;                     //导出excel                 
    //     $scope.getNextPage = getNextPage;                     //分页


    //     //得到各参数
    //     getAllParas();

    //     function updateTable2($event) {
    //         for (var i = 0; i < $scope.table2Datas.length; i++) {
    //             // $scope.table2Datas[i].price = $scope.Table2Type[i].type1;
    //             // $scope.table2Datas[i].price2 = $scope.Table2Type[i].type2;
    //             // $scope.table2Datas[i].total = $scope.table2Datas[i].quantity * $scope.table2Datas[i].price;
    //             // $scope.table2Datas[i].total2 = $scope.table2Datas[i].quantity2 * $scope.table2Datas[i].price2;
    //             //TODO 更新数据库
    //             if ($scope.Table2Type[i] != null) {
    //                 if ($scope.Table2Type[i].type1 != null) {
    //                     //更改数据库中所有该种类的价格
    //                     DataService.updateTable2($scope.table2Datas[i].prj, $scope.Table2Type[i].type1).then(function (affectedRows) {
    //                         $mdDialog.show(
    //                             $mdDialog
    //                                 .alert()
    //                                 .clickOutsideToClose(true)
    //                                 .title('Success')
    //                                 .content('Data update Successfully!')
    //                                 .ok('Ok')
    //                                 .targetEvent($event)
    //                         );
    //                     });
    //                 }
    //                 if ($scope.Table2Type[i].type2 != null) {
    //                     //更改数据库中所有该种类的价格
    //                     DataService.updateTable2($scope.table2Datas[i].prj2, $scope.Table2Type[i].type2).then(function (datas) {
    //                     });
    //                 }
    //             }
    //         }
    //         $scope.Table2Type = [];

    //         //重新加载表二
    //         showTable2Data($scope.searchName.id, $scope.currPage);
    //     }



    //     function getTable3ByPK(pk) {
    //         console.log(pk);
    //         DataService.getTable3ByPK(pk).then(function (datas) {
    //             var rawDatas = [].concat(datas);
    //             $scope.curTable3 = rawDatas[0];
    //             console.log($scope.curTable3.id);
    //         });
    //     }

    //     function getTable4ByPK(pk) {
    //         console.log(pk);
    //         DataService.getTable4ByPK(pk).then(function (datas) {
    //             var rawDatas = [].concat(datas);
    //             $scope.curTable4 = rawDatas[0];
    //             console.log($scope.curTable4s.id);
    //         });
    //     }

    //     // //更改价格参数
    //     // function changePrice() {
    //     //     $scope.cityLevel = '0';

    //     // }

    //     // function changePara() {
    //     //     //更新参数表
    //     //     DataService.updateParas($scope.paras).then(function (datas) {
    //     //     });
    //     //     //更新表二
    //     //     DataService.updateTable2crop($scope.paras.crop).then(function (datas) {
    //     //     });
    //     //     DataService.updateTable2ss($scope.paras.crop).then(function (datas) {
    //     //     });
    //     //     DataService.updateTable2ss($scope.paras.crop).then(function (datas) {
    //     //     });
    //     //     //更新表四
    //     //     DataService.updateTable4($scope.paras).then(function (datas) {
    //     //     });

    //     // }

    //     //得到表1-2全部数据
    //     function getAllTable12Datas() {
    //         // var currC4List = $scope.c4List[$scope.cityName];//该镇下所有村的数组
    //         // for (var i = 0; i < currC4List.length; i++) {
    //         //     DataService.getAllTable3Datas(currC4List[i]).then(function (datas) {
    //         //     //TODO:表三增加村字段，再汇总数据
    //         //     $scope.table11Datas.city4 = currC4List[i];

    //         // });
    //         // }
    //     }

    //     //得到表1-1全部数据
    //     function getAllTable11Datas() {
    //         var currC4List = $scope.c4List[$scope.cityName];//该镇下所有村的数组
    //         for (var i = 0; i < currC4List.length; i++) {
    //             DataService.getAllTable3Datas(currC4List[i]).then(function (datas) {
    //                 //TODO:表三增加村字段，再汇总数据
    //                 $scope.table11Datas.city4 = currC4List[i];

    //             });
    //         }
    //     }

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

    //     //得到表4-2全部数据
    //     function getAllTable42Datas() {
    //         var currC4List = $scope.c4List[$scope.cityName];//该镇下所有村的数组
    //         for (var i = 0; i < currC4List.length; i++) {
    //             DataService.getAllTable41Datas(currC4List[i]).then(function (datas) {
    //                 $scope.table41Datas = [].concat(datas);
    //                 $scope.table42Datas.name = currC4List[i];
    //                 //TODO:补偿类别固定则直接从数据库取和

    //             });
    //         }
    //     }

    //     //得到表4-1全部数据
    //     function getAllTable41Datas(city4Name) {
    //         DataService.getAllTable41Datas(city4Name).then(function (datas) {
    //             $scope.table41Datas = [].concat(datas);
    //         });
    //     }

    //     //得到表四全部数据
    //     function getAllTable4Datas(id) {
    //         DataService.getAllTable4Datas(id).then(function (datas) {
    //             var rawT4Datas = [].concat(datas);
    //             for (var i = 0; i < rawT4Datas.length; i++) {
    //                 $scope.table4Datas[i] = rawT4Datas[i];
    //                 $scope.table4Datas[i].total = $scope.table4Datas[i].area1 * $scope.table4Datas[i].price;
    //                 $scope.table4Datas[i].total2 = $scope.table4Datas[i].quantity * $scope.table4Datas[i].price2;
    //             };
    //         });

    //     }

    //     //添加表三数据
    //     function saveTable3Data($event) {
    //         //相应添加到表四
    //         var currTable4 = {};
    //         currTable4.index = $scope.curTable3.index;
    //         currTable4.type1 = $scope.curTable3.type2;
    //         currTable4.area1 = $scope.curTable3.area;
    //         switch ($scope.curTable3.type2) {
    //             case "框架":
    //                 currTable4.t1 = $scope.curTable3.area;
    //                 //currTable4.price = $scope.paras.b1;
    //                 break;
    //             case "砖混":
    //                 currTable4.t2 = $scope.curTable3.area;
    //                 //currTable4.price = $scope.paras.b2;
    //                 break;
    //             case "砖木":
    //                 currTable4.t3 = $scope.curTable3.area;
    //                 //currTable4.price = $scope.paras.b3;
    //                 break;
    //             case "土木":
    //                 currTable4.t4 = $scope.curTable3.area;
    //                 //currTable4.price = $scope.paras.b4;
    //                 break;
    //             default:
    //                 currTable4.t5 = $scope.paras.tree;
    //             //currTable4.price = $scope.paras.b5;
    //         }
    //         switch ($scope.curTable3.prj) {
    //             case "院坝":
    //                 currTable4.price2 = $scope.paras.a1;
    //                 break;
    //             default:
    //                 currTable4.price2 = $scope.paras.a2;
    //         }
    //         currTable4.arcName = $scope.curTable3.prj;
    //         currTable4.unit = $scope.curTable3.unit;
    //         currTable4.quantity = $scope.curTable3.quantity;
    //         //更新
    //         if ($scope.curTable3 != null && $scope.curTable3.autoID != null) {
    //             DataService.updateTable3($scope.curTable3).then(function (affectedRows) {
    //                 $mdDialog.show(
    //                     $mdDialog
    //                         .alert()
    //                         .clickOutsideToClose(true)
    //                         .title('Success')
    //                         .content('Data Updated Successfully!')
    //                         .ok('Ok')
    //                         .targetEvent($event)
    //                 );
    //             });
    //             DataService.updateTable4ByT3(currTable4).then(function (affectedRows) {
    //             });
    //         }
    //         //添加
    //         else {
    //             $scope.curTable3.id = $scope.current.id;
    //             $scope.curTable3.city = $scope.cityName;

    //             DataService.createTable3($scope.curTable3).then(function (affectedRows) {
    //                 currTable4.fID = affectedRows;
    //                 DataService.createTable4(currTable4).then(function (affectedRows) {
    //                 });
    //                 $mdDialog.show(
    //                     $mdDialog
    //                         .alert()
    //                         .clickOutsideToClose(true)
    //                         .title('Success')
    //                         .content('Data Added Successfully!')
    //                         .ok('Ok')
    //                         .targetEvent($event)
    //                 );
    //             });
    //         }

    //         $scope.curTable3 = {};
    //         getAllTable3Datas($scope.current.id, 1);
    //     }

    //     //得到表三全部数据
    //     function getAllTable3Datas(id, page) {
    //         DataService.getTable1ById(id).then(function (datas) {
    //             $scope.current = datas[0];
    //         });//取表头信息
    //         DataService.getAllTable3Datas(id, page).then(function (datas) {
    //             $scope.table3Datas = [].concat(datas);
    //             //console.log("length:"+$scope.table3Datas.length);
    //         });//取表格信息
    //     }

    //     //搜索户主
    //     function filterCustomer() {
    //         if ($scope.filterText == null || $scope.filterText == "") {
    //             getPeopleList();
    //         }
    //         else {
    //             DataService.getNameListByName($scope.cityName, $scope.filterText).then(function (customers) {
    //                 $scope.peopleLists = [].concat(customers);
    //                 $scope.current = customers[0];
    //             });
    //         }
    //         //直接显示搜索结果第一的具体信息
    //         showTable2Data($scope.current.id, 1);
    //         getAllTable3Datas($scope.current.id, 1);
    //         getAllTable4Datas($scope.current.id, 1);
    //     }

    //     //选择一个户主显示表二
    //     function showTable2Data(id, page) {
    //         $scope.table2Datas = []

    //         DataService.getTable1ById(id).then(function (datas) {
    //             $scope.current = datas[0];
    //         });//取表头信息
    //         DataService.gettable2Datas(id, page).then(function (datas) {
    //             //console.log("length:"+datas.length);
    //             //表特殊处理
    //             var rawDatas = [].concat(datas);
    //             $scope.table2Total = { "total": 0, "total2": 0 };
    //             for (var i = 0; i < rawDatas.length; i++) {
    //                 if (2 * i + 1 > rawDatas.length)
    //                     break;
    //                 $scope.table2Datas[i] = rawDatas[2 * i];
    //                 $scope.table2Datas[i].total = $scope.table2Datas[i].quantity * $scope.table2Datas[i].price;
    //                 $scope.table2Total.total = $scope.table2Total.total + $scope.table2Datas[i].total;

    //                 if (2 * i + 1 >= rawDatas.length)
    //                     break;
    //                 $scope.table2Datas[i].prj2 = rawDatas[2 * i + 1].prj;
    //                 $scope.table2Datas[i].unit2 = rawDatas[2 * i + 1].unit;
    //                 $scope.table2Datas[i].quantity2 = rawDatas[2 * i + 1].quantity;
    //                 $scope.table2Datas[i].price2 = rawDatas[2 * i + 1].price;
    //                 $scope.table2Datas[i].total2 = $scope.table2Datas[i].quantity2 * $scope.table2Datas[i].price2;
    //                 $scope.table2Total.total2 = $scope.table2Total.total2 + $scope.table2Datas[i].total2;
    //             }
    //         });//表信息
    //     }

    //     //得到户主列表
    //     function getPeopleList() {
    //         DataService.getPeopleList($scope.cityName).then(function (datas) {
    //             $scope.peopleLists = [].concat(datas);
    //         });
    //     }


    //         DataService.getDatas($scope.cityName, page).then(function (datas) {
    //             $scope.table1Datas = [].concat(datas);
    //             $scope.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 };
    //             for (let i = 0; i < $scope.table1Datas.length; i++) {
    //                 if ($scope.table1Datas[i].area != null) {
    //                     $scope.table1Total.area = $scope.table1Total.area + $scope.table1Datas[i].area;
    //                 }
    //                 if ($scope.table1Datas[i].land != null) {
    //                     $scope.table1Total.land = $scope.table1Total.land + $scope.table1Datas[i].land;
    //                 }
    //                 if ($scope.table1Datas[i].nonland != null) {
    //                     $scope.table1Total.nonland = $scope.table1Total.nonland + $scope.table1Datas[i].nonland;
    //                 }
    //                 if ($scope.table1Datas[i].quantity != null) {
    //                     $scope.table1Total.quantity = $scope.table1Total.quantity + $scope.table1Datas[i].quantity;
    //                 }
    //             }
    //         });
    //     }


    //     function search() {
    //         $scope.currPage = 1;
    //         //console.log("searchID:"+$scope.searchName.id);
    //         switch ($scope.tableIndex) {
    //             case '2':
    //                 showTable2Data($scope.searchName.id, 1);
    //                 break;
    //             case '3':
    //                 getAllTable3Datas($scope.searchName.id, 1);
    //                 break;
    //             case '4':
    //                 getAllTable4Datas($scope.searchName.id, 1);
    //                 break;
    //             default:
    //                 console.log("no datas..");
    //         }
    //     }

    //     function getAllParas() {
    //         DataService.getAllParas().then(function (datas) {
    //             $scope.paras.crop = datas[0].crop;
    //             $scope.paras.ss = datas[0].ss;
    //             $scope.paras.tree = datas[0].tree;
    //             $scope.paras.b1 = datas[0].b1;
    //             $scope.paras.b2 = datas[0].b2;
    //             $scope.paras.b3 = datas[0].b3;
    //             $scope.paras.b4 = datas[0].b4;
    //             $scope.paras.b5 = datas[0].b5;
    //             $scope.paras.a1 = datas[0].a1;
    //             $scope.paras.a2 = datas[0].a2;
    //         });
    //     }
