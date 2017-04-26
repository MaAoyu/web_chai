var mysql = require('mysql');

angular.module("auto-biz-user")
        .service('DataService', function ($q) {
            
            // Creates MySql database connection
            var connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "143555",
                database: "db"
            });
            var self = this;

            return {
                getAllParas: getAllParas,       //获取参数
                // updateParas: updateParas,       //更新参数
                // updateTable2crop: updateTable2crop,     //更新表二crop价格
                // updateTable2ss: updateTable2ss,         //更新表二ss价格
                // updateTable2tree: updateTable2tree,     //更新表二tree价格
                getDatas: getDatas,             //取表一数据
                create: createData,             //添加表一
                addTablePeople: addTablePeople, //添加people表
                addTable2: addTable2,
                getPeopleList: getPeopleList,   //得到户主列表
                getTable1ById: getTable1ById,
                gettable2Datas: gettable2Datas,
                getNameListByName: getNameListByName,
                createTable3: createTable3,
                createTable4: createTable4,
                getAllTable3Datas: getAllTable3Datas,
                getAllTable4Datas: getAllTable4Datas,
                addTable41: addTable41,          //添加表4-1
                getAllTable41Datas: getAllTable41Datas,
                saveTable43Data: saveTable43Data,
                getAllTable43Datas: getAllTable43Datas,
                getTable1ByPK: getTable1ByPK,
                getTable3ByPK: getTable3ByPK,
                getTable4ByPK: getTable4ByPK,
                updateTable1: updateTable1,
                updateTable2: updateTable2,         //价格更新
                updateTable2ByT1: updateTable2ByT1, //表一关联更新
                updateTable3: updateTable3,
                updateTable4ByT3: updateTable4ByT3,  //表三关联更新
                getPeopleByName: getPeopleByName,
                getTable1Count: getTable1Count,     //表一行数
                deleteTable1: deleteTable1,
                deleteTable2: deleteTable2
            };

            function deleteTable2(id) {
                var deferred = $q.defer();
                var query = "DELETE FROM table2 WHERE fID = ?";
                connection.query(query, [id], function (err, res) {
                    if (err) deferred.reject(err);
                    //console.log(res);
                    deferred.resolve(res.affectedRows);
                });
                return deferred.promise;
            }

            function deleteTable1(id) {
                var deferred = $q.defer();
                var query = "DELETE FROM table1 WHERE autoID = ?";
                connection.query(query, [id], function (err, res) {
                    if (err) deferred.reject(err);
                    //console.log(res);
                    deferred.resolve(res.affectedRows);
                });
                return deferred.promise;
            }

            function getTable1Count() {
                var deferred = $q.defer();
                var query = "SELECT count(*) FROM table1";
                connection.query(query, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            //todo
            function updateTable4(paras) {
                var deferred = $q.defer();
                var query = "UPDATE table4 SET price = ? WHERE type1 = '土木'";
                connection.query(query, [paras.b4], function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            // function updateTable2crop(crop) {
            //     var deferred = $q.defer();
            //     var query = "UPDATE table2 SET price = ? WHERE prj = '农作物'";
            //     connection.query(query, [crop], function (err, res) {
            //         if (err) deferred.reject(err);
            //         deferred.resolve(res);
            //     });
            //     return deferred.promise;
            // }
            // function updateTable2ss(ss) {
            //     var deferred = $q.defer();
            //     var query = "UPDATE table2 SET price = ? WHERE prj = '农用设施'";
            //     connection.query(query, [ss], function (err, res) {
            //         if (err) deferred.reject(err);
            //         deferred.resolve(res);
            //     });
            //     return deferred.promise;
            // }
            // function updateTable2tree(tree) {
            //     var deferred = $q.defer();
            //     var query = "UPDATE table2 SET price = ? WHERE prj = '树木'";
            //     connection.query(query, [tree], function (err, res) {
            //         if (err) deferred.reject(err);
            //         deferred.resolve(res);
            //     });
            //     return deferred.promise;
            // }

            // function updateParas(paras) {
            //     var deferred = $q.defer();
            //     var query = "UPDATE para SET ? WHERE id = 1";
            //     connection.query(query, paras, function (err, res) {
            //         if (err) deferred.reject(err);
            //         deferred.resolve(res);
            //     });
            //     return deferred.promise;
            // }


            function updateTable4ByT3(currTable4) {
                var deferred = $q.defer();
                var query = "UPDATE table4 SET ? WHERE fID =" + currTable4.fID;
                connection.query(query, currTable4, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            function updateTable2ByT1(id, prj, unit, quantity, fid) {
                var deferred = $q.defer();
                var query = "UPDATE table2 SET id = ?,prj=?,unit=?,quantity = ? WHERE fID = ?";
                connection.query(query, [id, prj, unit, quantity, fid], function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            function updateTable2(prj, price) {
                var deferred = $q.defer();
                var query = "UPDATE table2 SET price = ? WHERE prj = ?";
                connection.query(query, [price, prj], function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            function updateTable1(data1) {
                var deferred = $q.defer();
                var query = "UPDATE table1 SET ? WHERE autoID = " + data1.autoID;
                connection.query(query, data1, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            function updateTable3(data3) {
                var deferred = $q.defer();
                var query = "UPDATE table3 SET ? WHERE autoID = " + data3.autoID;
                connection.query(query, data3, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            }

            function getAllParas() {
                var deferred = $q.defer();
                var query = "SELECT * FROM para where id = 1";
                connection.query(query, function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getTable1ByPK(pk) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table1 where autoID = ?";
                connection.query(query, [pk], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getTable3ByPK(pk) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table3 where autoID = ?";
                connection.query(query, [pk], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getTable4ByPK(pk) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table4 where autoID = ?";
                connection.query(query, [pk], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getPeopleByName(name) {
                var deferred = $q.defer();
                var query = "SELECT * FROM people where name = ?";
                connection.query(query, [name], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getAllTable43Datas(c2) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table43 where city = ?";
                connection.query(query, [c2], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function saveTable43Data(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO table43 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function getAllTable41Datas(c4) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table41 where city = ?";
                connection.query(query, [c4], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getAllTable4Datas(id, page) {
                var deferred = $q.defer();
                var limit1 = 10 * (page - 1);
                var query = "SELECT * FROM table4 where id = ? limit ?,10";
                connection.query(query, [id, limit1], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getAllTable3Datas(id, page) {
                var deferred = $q.defer();
                var limit1 = 10 * (page - 1);
                var query = "SELECT * FROM table3 where id = ? limit ?,10";
                connection.query(query, [id, limit1], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function createTable4(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO table4 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function createTable3(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO table3 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function getNameListByName(city, name) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table1 WHERE city = ? and name LIKE  '" + name + "%'";
                connection.query(query, [city, name], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }


            function getPeopleList(city) {
                var deferred = $q.defer();
                var query = "SELECT * FROM people where city = ?";
                connection.query(query, [city], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getDatas(city, page) {
                var deferred = $q.defer();
                var limit1 = 10 * (page - 1);
                var query = "SELECT * FROM table1 where city = ? limit ?,10";
                connection.query(query, [city, limit1], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function gettable2Datas(id, page) {
                var deferred = $q.defer();
                var limit1 = 10 * (page - 1);
                var query = "SELECT * FROM table2 where id = ? limit ?,10";
                connection.query(query, [id, limit1], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function getTable1ById(id) {
                var deferred = $q.defer();
                var query = "SELECT * FROM table1 where id = ?";
                connection.query(query, [id], function (err, rows) {
                    if (err) deferred.reject(err);
                    deferred.resolve(rows);
                });
                return deferred.promise;
            }

            function createData(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO table1 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function addTablePeople(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO people SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function addTable41(data) {
                var deferred = $q.defer();
                var query = "INSERT INTO table41 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

            function addTable2(data) {
                var deferred = $q.defer();
                //console.log(JSON.stringify(data));
                var query = "INSERT INTO table2 SET ?";
                connection.query(query, data, function (err, res) {
                    if (err) deferred.reject(err);
                    //console.log(JSON.stringify(query));
                    deferred.resolve(res.insertId);
                });
                return deferred.promise;
            }

        })
