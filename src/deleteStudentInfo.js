/**
 * Created by ggbond on 17-7-31.
 */

let redis = require('redis');
let client = redis.createClient();
let studentInfo;
client.get("studentInfo",function (err,reply) {
    studentInfo = JSON.parse(reply);
});

function deleteStudentInfo(input) {
    let idArray = input.split("，");
    for(let id of idArray){
        let index = studentInfo.map(i => i.studentNumber).indexOf(id);
        if(index !== -1){
            studentInfo.splice(index,1);
        }
    }
    client.set("studentInfo",JSON.stringify(studentInfo));
}

module.exports = deleteStudentInfo;