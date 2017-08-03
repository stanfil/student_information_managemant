/**
 * Created by ggbond on 17-7-31.
 */
'use strict';
let redis = require('redis');
let client = redis.createClient();
let studentInfo;
client.get("studentInfo",function (err,reply) {
    studentInfo = JSON.parse(reply);
});


function searchStudentInfo(idArray) {
    let table = [];
    for(let id of idArray){
        let index = studentInfo.map(i => i.studentNumber).indexOf(id);
        if(index!==-1){
            table.push(studentInfo[index]);
        }
    }
    return table;
}

module.exports = searchStudentInfo;