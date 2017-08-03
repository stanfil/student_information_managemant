/**
 * Created by ggbond on 17-7-27.
 */
'use strict';

let addStudentInfo = require('./addStudentInfo.js');
let searchStudentInfo = require('./searchStudentInfo.js');
let changeStudentInfo = require('./changeStudentInfo.js');
let deleteStudentInfo = require('./deleteStudentInfo.js');
let express = require('express');
let redis = require('redis');
let bodyParser = require('body-parser');  //parse payload

let app = express();
let client = redis.createClient();

let jsonParser = bodyParser.json();
let textParser = bodyParser.text();
let urlencodedParser = bodyParser.urlencoded({extended:true});
// let rawParser = bodyParser.raw();


// client.del("studentInfo");
client.get("studentInfo",function (err, reply) {
   console.log(reply);
});
// app.use(express.static("public"));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.get('/',function (req, res) {
//     res.sendFile(__dirname+'/public/studentInfoManagement.html');
// });
app.post("/student",urlencodedParser,function (req, res) {
    console.log(req.body);
    let response = addStudentInfo.checkForm(req.body);
    if(response.checkForm === false){
        res.status(400).send(response.payload);
        console.log(response.payload);
    }else{
        console.log(response.payload);
        res.status(200).send(response.payload);
    }
});

app.get('/students',function(req, res){
    if(req.query.ids===""){
        res.status(400).send("学号不能为空！");
    }else{
        let idArray = req.query.ids.split("，");
        let response = searchStudentInfo(idArray);
        res.send(response);
        // console.log(response);
    }
});

app.put('/students',urlencodedParser,function (req, res) {
    // console.log(req.body);
    changeStudentInfo(req.body);
    res.status(200).send("该学生信息已保存");
});

app.delete("/students",urlencodedParser,function (req, res) {
    if(req.body.ids === ''){
        res.status(400).send("学号不能为空！");
    }else{
        deleteStudentInfo(req.body.ids);
        res.send("学生信息已成功删除");
    }
});

app.listen(3000,function () {
    console.log('Example app listening on port 3000!');
});