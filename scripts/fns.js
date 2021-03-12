"use strict"

function checkpw(pw) {
    return /^.{8,15}$/i.test(pw)
    &&/^.*[A-Z]+.*$/.test(pw)
    &&/^.*[a-z]+.*$/.test(pw)
    &&/^.*\d.*\d.*$/.test(pw) 
}
function clearob(ob) {
    return ob.forEach(element => {
        element="";
    });
}
function modifylocaltree() {
    
}

function folderPost(ob,username) {

    let fp=new XMLHttpRequest;
    fp.open("post","http://z3773e6368.qicp.vip/user/getf",true);
    // fp.setRequestHeader("Authentication",window.localStorage.getItem("token"));
    fp.setRequestHeader("content-type","application/json");
    fp.withCredentials=true;
    fp.onreadystatechange=function() {
        if(fp.readyState==4 && fp.status== 200) {
            return JSON.parse(fp.response)                            
        } else {
            app.$message.error('网络或其他未知错误！请稍后重试');
            // console.log(fp.responseText);
        }
    }
    console.log(app.filelist);
    fp.send(JSON.stringify({
        "username":username,
        "fid":app.filelist[ob.name].fid
    }));
}
function picPost(ob) {
    let picp=new XMLHttpRequest;
    picp.open("get","http://z3773e6368.qicp.vip/user/getf?fid="+ob.name,true);
    // picp.setRequestHeader("Authentication",window.localStorage.getItem("token"));
    picp.withCredentials=true;
    picp.setRequestHeader("content-type","application/json");
    picp.withCredentials=true;
    picp.onreadystatechange=function() {
        if(picp.readyState==4 && picp.status== 200) {
            return JSON.parse(picp.response)                            
        } else {
            // console.log(picp.response);
            app.$message.error('网络或其他未知错误！请稍后重试')
        }
    }
    picp.send();
}

function dlfnc(picname) {
    /* let dl=new XMLHttpRequest;
    dl.open("get","http://z3773e6368.qicp.vip/user/download?picturename="+picname,true);
    dl.withCredentials=true;
    dl.responseType="blob";
    dl.onreadystatechange=function() {
        if(dl.readyState==4 && dl.status == 200) {
            let blob=dl.responseType;
            let reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onload = function(e) {
                var a = document.createElement('a');
                a.download = filename;
                a.href = e.target.result;
                document.querySelector("body").append(a);
                a.click();
                document.querySelector(a).remove();
            this.$message({
                message:"下载成功！",
                type:"success"
            });
            }
        }
    }
    dl.send(); */
   window.open("http://z3773e6368.qicp.vip/user/download?picturename="+picname); 
}

// function dlfnc(filename) {
//     let dl = new XMLHttpRequest;
//     dl.open("open","http://z3773e6368.qicp.vip/user/download?picturename="+filename);
//     dl.setRequestHeader("content-type","application/json");
//     dl.responseType="blob";
//     dl.onload = function () {
//         if (this.status === 200) {
//             let blob = this.response;
//             let reader = new FileReader();
//             reader.readAsDataURL(blob);
//             reader.onload = function (e) {
//                 let link = document.createElement('link');
//                 link.download = fileName;
//                 link.href = e.target.result;
//                 document.querySelector("body").append(link);
//                 link.click();
//                 document.querySelector(link).remove();
//             }
//         }
//     };
//     dl.send();
// }
// dlfnc("haha.JPG");


function createFrame() {
    let table=document.createElement("table");
    document.querySelector("#app > section > section > aside > div > div.el-card__body").append(table);
    let line1=document.createElement("tr");
    table.append(line1);
    for (let i=0;i<7;i++) {
        let ca=document.createElement("th");
        ca.textContent=i;
        line1.append(ca);
    }
}
function analyseInput() {
    let date=new Date();
    let yearnow=String(date.getFullYear());
    let monthnow=String(date.getMonth());
    let datefix = new Date(yearnow,monthnow,"1");
    let daynow=datefix.getDay();
    let getri=new Date(yearnow,String(+monthnow+1),"0");
    let count=getri.getDate();
    return [daynow,count];
}
function writeIn(list) {
    let line2=document.createElement("tr");
    document.querySelector("table").append(line2);
    for(let i=0;i<list[0];i++) {
        let td=document.createElement("td");
        document.querySelector("table tr+tr").append(td);     
    }
    for(let i=1;i<=7-list[0];i++) {
        let td=document.createElement("td");
        td.textContent=i;
        document.querySelector("table tr+tr").append(td);
    }
    let cache=7-list[0];
    for(let i=1;i<(list[1]-7)/7+1;i++) {
        let newtr=document.createElement("tr");
        document.querySelector("table").append(newtr);
        for(let i=0;i<7;i++) {
            let newtd= document.createElement("td");
            newtd.textContent=cache+i+1;
            newtr.append(newtd);
        }
        cache+=7;
     }
    for(let i=0;i<35-list[1]-list[0];i++) {
    document.querySelectorAll("td")[list[1]+list[0]].remove()
    }
}
function markToday() {
    let date=new Date();
    let day=date.getDate();
    document.querySelectorAll("td")[analyseInput()[0]+day-1].style.backgroundColor="rgb(238, 197, 196)";
}
function missile() {
    createFrame();
    writeIn(analyseInput());
    markToday();
}
function modifyf(flist) {
    let arr=[];
    for (let index = 0; index < flist.length; index++) {
        let element = flist[index];
        let ele={
            type:"folder",
            name:element.filename,
            size:"0KB",
            fid:element.fid,
            id:element.id
        }
        arr.push(ele);
    }
    return arr
}
function modifyp(plist) {
    let arr=[];
    for (let index = 0; index < plist.length; index++) {
        let element = plist[index];
        let ele={
            type:"photo",
            name:element,
            size:"0KB"
        }
        arr.push(ele);
    }
    return arr
}
function getUid () {
    let uid = [];
    var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (var i = 0; i < 36; i++) {
      uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    uid[14] = "4"
    uid[19] = hexDigits.substr((uid[19] & 0x3) | 0x8, 1)
    uid[8] = uid[13] = uid[18] = uid[23] = "-"
    let fuid = uid.join("")
    return fuid
  }
export { checkpw,clearob,modifylocaltree,folderPost,picPost,dlfnc,missile,modifyf,modifyp,getUid };