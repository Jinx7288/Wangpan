import { folderPost,dlfnc,missile,modifyf,modifyp,getUid } from "./fns.js";

let app=new Vue({
    el:"#app",
    data:{
            userState:false,
            filelist:[],
            piclist:[],
            pagenow:1,
            currentFolder:"0",
            dialogVisble:false,
            cfVisble:false,
            cfcache:"",
            pathlist:["初级目录"],
            date:new Date,
            upfilelist:[]
        },
    computed:{
        cacheList:function() {
            return modifyf(this.filelist).concat(modifyp(this.piclist))
        },
        userInfo:function() {
            return {
                headUrl:'resources/Images/default-head.webp',
                userId: window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")).username : "" 
            }
        },
    },
    mounted:function() {
        missile();
        let that = this;
        let user=JSON.parse(window.localStorage.getItem("user"));
        if (user) {
            let getFirstF=new XMLHttpRequest;
            getFirstF.open("get","http://z3773e6368.qicp.vip/user/getf?username="+user.username+"&fid=0",true);
            getFirstF.onreadystatechange=function() {
                if(getFirstF.readyState==4 && getFirstF.status==200) {
                    that.filelist=JSON.parse(getFirstF.response);
                } else {
                    that.$message.error("未知错误！")
                }
            };
            getFirstF.send();  
        } else {
            // window.location.href="index.html";
            this.$message.error("用户未登录！");
        }
    },
    methods:{
        logOut:function() {
            window.location.href="index.html";
            let signout=new XMLHttpRequest;
            let that=this;
            signout.open("get","http://z3773e6368.qicp.vip/user/signout",true);
            signout.onreadystatechange=function(){
                if(signout.readyState==4 && signout.status==200) {
                   if(signout.responseText=="ok") {
                        that.$message({
                            message:"用户已注销",
                            type:"success"
                        })
                   } else {
                       console.log(signout.responseText);
                   }
                }
            }
            signout.send();
            window.localStorage.removeItem("user");
        },
        openFolder:function(index,list) {
            let tem=JSON.stringify(list[index]);
            this.filelist=folderPost(tem);
            this.piclist=picPost(tem);
            that.pathlist.push(tem.name);
            this.pagenow=1; 
        },
        backtofolder:function(str) {
            
        },
        createFolderToggle:function() {
            this.cfVisble=true;
        },
        createFolder:function() {
            if(this.cfcache!=="") {
            let cf=new XMLHttpRequest;
            let id=getUid();
            let that=this;
            cf.open("post","http://z3773e6368.qicp.vip/user/cfile",true);
            cf.setRequestHeader("content-type","application/json");
            cf.onreadystatechange=function() {
                if(cf.readyState==4 && cf.status==200) {
                    if(cf.response=="ok") {
                        that.$message({
                            message:"创建成功！",
                            type:"success"
                        }),
                        that.filelist.push({
                           Uid:id,
                           fid:that.cfcache,
                           username:that.userId,
                           filename:that.cfcache
                        })
                        that.cfcache="";
                    } else {
                        that.$message.error(cf.response);
                    }
                }
            }
            cf.send(JSON.stringify({
                Uid:id,
                fid:cf.cache,
                username:that.userInfo.userId,
                filename:that.cfcache
            }))
            } else {
                this.$message.error("文件夹名不能为空！");
            }
        },
        download:function(index,list) {
            let tem=list[index];
            dlfnc(tem.name);
        },
        delete:function(index,list) {
            let tem=list[index];
            let that=this;
            let del=new XMLHttpRequest;
            del.open("get","http://z3773e6368.qicp.vip/user/delete?picturename="+tem.picturename,true);
            del.onreadystatechange=function() {
                if(del.readyState==4 && del.status==200) {
                    that.$message({
                        message:"删除成功!",
                        type:"success"
                    })
                    that.cacheList[index].remove();
                } else {
                    that.$message.error(del.response);
                }
            }
        },
        upload:function() {
            this.dialogVisble=true;
        },
        verify:function() {

        },
        uploadPost:function() {
            let formdata= new FormData;
            let that=this;
            let id=getUid();
            formdata.append("uid",id);
            formdata.append("username",this.userId);
            formdata.append("filedata",this.upfilelist[0].raw);
            let uppost=new XMLHttpRequest;
            uppost.open("post","http://z3773e6368.qicp.vip/user/upload");
            uppost.setRequestHeader("content-type","multipart/form-data");
            uppost.onreadystatechange=function() {
                if (uppost.readyState==4 && uppost.status==200) {
                    if (uppost.responseText=="ok") {
                        that.$message({
                            message:"上传成功！",
                            type:"success"
                        })
                        that.cachelist.push({
                          type:"photo",
                          name: id,
                          size:"0KB" 
                        });
                    } else {
                        that.$message.error(uppost.response);
                    }
                }
            }        
        }       
    }
})

// Mock.mock(
//     'server/openfolder.java',
//     'post',
//     [
//         {
//             "type":"folder",
//             "name":"@cname(4,7)"
//         },
//         {
//             "type":"folder",
//             "name":"@cname(4,7)"
//         },
//         {
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },
//         {
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         },{
//             "type":"photo",
//             "name":"@cname(4,7)"
//         }
//     ]
// )