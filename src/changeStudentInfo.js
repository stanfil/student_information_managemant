/**
 * Created by ggbond on 17-7-31.
 */

function changeStudentInfo(input) {
    let redis = require('redis');
    let client = redis.createClient();
    let studentInfo;
    client.get("studentInfo",function (err,reply) {
        studentInfo = JSON.parse(reply);
        let student = {
            "name" : input.name,
            "studentNumber" : input.studentNumber,
            "nation" : input.nation,
            "klass" : input.klass,
            "grades" : {
                "chinese" : input.chinese,
                "math" : input.math,
                "english" : input.english,
                "programming" : input.programming
            }
        };
        let index = studentInfo.map(i => i.studentNumber).indexOf(student.studentNumber);
        let sum = 0;
        for(let key in student.grades){
            sum += parseInt(student.grades[key]);
        }
        student.grades.summary = sum;
        student.grades.average = sum/4;
        studentInfo.splice(index,1,student);
        client.set("studentInfo",JSON.stringify(studentInfo));
    });
}

module.exports = changeStudentInfo;