/**
 * Created by ggbond on 17-7-24.
 */
'use strict';

let redis = require('redis');
let client = redis.createClient();
let studentInfo;
client.get("studentInfo",function (err,reply) {
    if(reply===null){
        client.set("studentInfo","[]");
        studentInfo = [];
    }else{
        studentInfo = JSON.parse(reply);
    }
});

//checkForm
function checkForm(student){
    let res = {
        "checkForm": true,
        "payload": ""
    };

    if(studentInfo.map(i => i.studentNumber).indexOf(student.studentNumber)!==-1){
        res.checkForm = false;
        res.payload = "该学生信息已存在！若要修改，请点击修改标签。";
        return res;
    }
    let flag = true;
    if(student.name===''){
        flag = false;
    }else if(student.studentNumber===''){
        flag = false;
    }else if(student.nation===''){
        flag = false;
    }else if(student.klass===''){
        flag = false;
    }else if(!checkGrade(student.chinese)){
        flag = false;
    }else if(!checkGrade(student.math)){
        flag = false;
    }else if(!checkGrade(student.english)){
        flag = false;
    }else if(!checkGrade(student.programming)){
        flag = false;
    }
    if(flag){
        addStudentInfo(student);
        res.checkForm = true;
        res.payload = "学生信息已添加";
    }else{
        res.checkForm = false;
        res.payload = "请按正确的格式输入!";
    }
    return res;
}

function checkGrade(str) {
    let isGrade = true;
    let num = parseInt(str)
    if(num<0||num>100){
        isGrade = false;
    }
    return isGrade;
}

//addStudentInfo

function addStudentInfo(student) {
    studentInfo.push({
        "name": student.name,
        "studentNumber": student.studentNumber,
        "nation": student.nation,
        "klass": student.klass,
        "grades":{}
    });
    studentInfo[studentInfo.length-1].grades["chinese"]=parseInt(student.chinese);
    studentInfo[studentInfo.length-1].grades["math"]=parseInt(student.math);
    studentInfo[studentInfo.length-1].grades["english"]=parseInt(student.english);
    studentInfo[studentInfo.length-1].grades["programming"]=parseInt(student.programming);

    let sum = 0;
    sum += parseInt(student.chinese);
    sum += parseInt(student.math);
    sum += parseInt(student.english);
    sum += parseInt(student.programming);
    studentInfo[studentInfo.length-1].grades["average"]=sum/4;
    studentInfo[studentInfo.length-1].grades["summary"]=sum;
    client.set("studentInfo",JSON.stringify(studentInfo));
}


module.exports = {
    checkForm
};