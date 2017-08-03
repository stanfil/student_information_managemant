/**
 * Created by ggbond on 17-7-28.
 */

$(document).ready(function () {
    //module add
    $("#addStudentInfo").click(function () {
        let payload = {
            "name": document.getElementById("inputName").value,
            "studentNumber": document.getElementById("inputId").value,
            "nation": document.getElementById("inputNation").value,
            "klass": document.getElementById("inputClass").value,
            "chinese": document.getElementById("inputChinese").value,
            "math": document.getElementById("inputMath").value,
            "english": document.getElementById("inputEnglish").value,
            "programming": document.getElementById("inputProgramming").value
        };

        $.ajax({
            url:"http://127.0.0.1:3000/student",
            type:"POST",
            data:payload,
            crossDomain:true,
            cache:false,
            dataType:"text",
            success:function(data){
                alert(data);
            },
            error:function(data){
                alert(data);
            }
        });
    });

    //module search
    $("#searchBtn").click(function () {
        $.ajax({
            url:"http://127.0.0.1:3000/students"+`?ids=${document.getElementById("ids-search").value}`,
            type:"GET",
            crossDomain:true,
            cache:false,
            success:function(data){
                buildMymodal(data);
            },
            error:function(data){
                alert(data.responseText);
            }
        });

    });
    $("#myModal").on('hide.bs.modal', function () {
        $(".table-content").remove();
        $("#ave-mid").text('');
    });

    //module change
    $("#changeBtn").click(function () {
        $.ajax({
            url:"http://127.0.0.1:3000/students"+`?ids=${document.getElementById("id-change").value}`,
            type:"GET",
            crossDomain:true,
            cache:false,
            success:function(data){
                buildMymodal2(data);
            },
            error:function(data){
                alert(data.responseText);
            }
        });
    });
    $("#save").click(function () {
        let payload = {
            "name": $("#name").val(),
            "studentNumber": $("#sn").val(),
            "nation": $("#nation").val(),
            "klass": $("#class").val(),
            "chinese": $("#chinese").val(),
            "math": $("#math").val(),
            "english": $("#english").val(),
            "programming": $("#programming").val()
        };
        $.ajax({
            url:"http://127.0.0.1:3000/students",
            type:"PUT",
            data:payload,
            crossDomain:true,
            dataType:"text",
            cache:false,
            success:function(data){
                console.log(data);
                alert(data);
            },
            error: function (data) {
                alert("failed");
            }
            // error:function(data){
            //
            // }
        });
    });


    //module delete
    $("#deleteBtn").click(function () {
        $.ajax({
            url:"http://127.0.0.1:3000/students",
            type:"DELETE",
            data:{
                "ids" : $("#ids-delete").val()
            },
            crossDomain:true,
            cache:false,
            success:function(data){
                console.log(data);
                alert(data.responseText);
            },
            error:function(data){
                alert(data.responseText);
            }
        });
    });

});

function buildMymodal(table) {
    for(let i=0;i<table.length;i++){
        let tr = document.createElement("tr");
        tr.setAttribute("class","table-content");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        let td8 = document.createElement("td");
        let td9 = document.createElement("td");

        td1.innerHTML=(i+1);
        td2.innerHTML=(table[i].name);
        td3.innerHTML=(table[i].studentNumber);
        td4.innerHTML=(table[i].grades["chinese"]);
        td5.innerHTML=(table[i].grades["math"]);
        td6.innerHTML=(table[i].grades["english"]);
        td7.innerHTML=(table[i].grades["programming"]);
        td8.innerHTML=(table[i].grades["average"]);
        td9.innerHTML=(table[i].grades["summary"]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        $("#transcript").append(tr);
    }
    let sumArr = table.map(i => i.grades["summary"]);
    sumArr.sort((a,b)=>{return a-b});
    let ave = 0;
    for(let i of sumArr){
        ave += i;
    }
    ave/=sumArr.length;
    let mid;
    if(sumArr.length%2===0){
        mid = sumArr[sumArr.length/2]+sumArr[sumArr.length/2-1];
        mid /= 2;
    }else{
        mid = sumArr[(sumArr.length-1)/2];
    }

    $("#ave-mid").append(`总分平均分：${ave.toFixed(2)}`)
        .append(document.createElement("br"))
        .append(`总分中位数：${mid.toFixed(2)}`);

    $("#myModal").modal();

}

function buildMymodal2(table) {
    if(table.length===0){
        alert("系统中没有该学生信息");
        return;
    }else {
        $("#name").val(table[0].name);
        $("#sn").val(table[0].studentNumber);
        $("#nation").val(table[0].nation);
        $("#class").val(table[0].klass);
        $("#chinese").val(table[0].grades["chinese"]);
        $("#math").val(table[0].grades["math"]);
        $("#english").val(table[0].grades["english"]);
        $("#programming").val(table[0].grades["programming"]);
    }
    $("#myModal2").modal();
}