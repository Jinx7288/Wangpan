import { folderPost,picPost,dlfnc,missile,modifyf,modifyp,getUid } from "./fns.js";
axios.defaults.withCredentials=true;


let app=new Vue({
    el:"#app",
    data:{
            userState:false,
            filelist:[],
            filelistcache:[],
            piclist:[],
            piclistcache:[],
            pagenow:1,
            currentFolder:0,
            dialogVisble:false,
            cfVisble:false,
            cfcache:'',
            pathlist:["初级目录"],
            date:new Date,
            upfilelist:[],
        },
    computed:{
        primaryif:function() {
            return this.pathlist.length==1 ? true : false
        },
        cacheList:function() {
            try {
            return modifyf(this.filelist).concat(modifyp(this.piclist))
            } catch(e) {

            }
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
           /*  let getFirstF=new XMLHttpRequest;
            getFirstF.open("get","http://z3773e6368.qicp.vip/user/getf?username="+user.username+"&fid=0",true);
            getFirstF.withCredentials=true;
            getFirstF.onreadystatechange=function() {
                if(getFirstF.readyState==4 && getFirstF.status==200) {
                    that.filelist=JSON.parse(getFirstF.response);
                }
            };
            getFirstF.send(null); */  
            axios.get("http://z3773e6368.qicp.vip/user/getf?username="+user.username+"&fid=0").then(function(res){
                if(res.data) {
                    that.filelist=res.data
                } else {
                    that.$message.error("未知错误！");
                }
                }); 
        } else {
            this.$message.error("用户未登录！");
            setTimeout(window.location.href="index.html",3000);
        }
    },
    methods:{
        logOut:function() {
            let that=this;
            /* let signout=new XMLHttpRequest;
            signout.open("get","http://z3773e6368.qicp.vip/user/signout",true);
            signout.withCredentials=true;
            signout.onreadystatechange=function(){
                if(signout.readyState==4 && signout.status==200) {
                   if(signout.responseText=="ok") {
                        that.$message({
                            message:"用户已注销",
                            type:"success"
                        });
                        window.localStorage.removeItem("user");
                        window.location.href="index.html";
                   } else {
                       console.log(signout.responseText);
                   }
                }
            }
            signout.send(); */
            axios.get("http://z3773e6368.qicp.vip/user/signout").then(function(res){
                if(res.data=="ok") {
                    that.$message({
                        message:"用户已注销",
                        type:"success"
                    });
                    window.localStorage.removeItem("user");
                    setTimeout(()=>(window.location.href="index.html"),1500)
                } else {
                    that.$message.error("未知错误！");
                }
                }); 
        },
        openFolder:function(index,list) {
            let tem=JSON.parse(JSON.stringify(list[index]));
            // app.filelist=folderPost(tem,app.userInfo.userId);
            /* let fp=new XMLHttpRequest;
            fp.open("get","http://z3773e6368.qicp.vip/user/getf?username="+app.userInfo.userId+"&fid="+tem.fid,true);
            // fp.setRequestHeader("Authentication",window.localStorage.getItem("token"));
            fp.withCredentials=true;
            fp.setRequestHeader("content-type","application/json");
            fp.onreadystatechange=function() {
                if(fp.readyState==4 && fp.status== 200) {
                   app.filelist=JSON.parse(fp.response)                            
                } else {
                    // console.log(fp.responseText);
                }
            } 
            fp.send(); */
            axios.get("http://z3773e6368.qicp.vip/user/getf?username="+app.userInfo.userId+"&fid="+tem.id).then(function(res){
                 try{
                    app.filelistcache.push(app.filelist);
                    app.filelist=res.data;
                    console.log(app.filelistcache);
                    // console.log(app.filelistcache);
                 }   catch(e) {
                    app.$message.error(res.data);
                 }            
            });
            // app.piclist=picPost(tem);
            /* let picp=new XMLHttpRequest;
            picp.open("get","http://z3773e6368.qicp.vip/user/getp?id="+tem.fid,true);
            // picp.setRequestHeader("Authentication",window.localStorage.getItem("token"));
            picp.withCredentials=true;
            picp.setRequestHeader("content-type","application/json");
            picp.withCredentials=true;
            picp.onreadystatechange=function() {
                if(picp.readyState==4 && picp.status== 200) {
                   app.piclist=JSON.parse(picp.response)                            
                } else {
                    // console.log(picp.response);
                }
            }
            picp.send(); */
            axios.get("http://z3773e6368.qicp.vip/user/getp?id="+tem.id).then(function(res){
                try{
                    app.piclistcache.push(app.piclist);
                    app.piclist=res.data;
                    // console.log(app.piclistcache);
                } catch(e) {
                    app.$message.error(res.data);
                }
            })
            app.pathlist.push(tem.name);
            // console.log(app.pathlist);
            app.currentFolder=tem;
            console.log(JSON.parse(JSON.stringify(app.currentFolder)));
            app.pagenow=1;
        },
        backtofolder:function() {
          /*   try {
                this.filelist=this.lastfilelist[this.lastfilelist.length-1];
                this.pathlist.pop();
                this.lastfilelist.pop();
            } catch(e) {
                app.$message.error("已无上级！");
            } */
            this.filelist=this.filelistcache[this.filelistcache.length-1];
            this.piclist=this.piclistcache[this.piclistcache.length-1];
            this.pathlist.pop();
            this.filelistcache.pop();
            this.piclistcache.pop();
        },
        createFolderToggle:function() {
            this.cfVisble=true;
        },
        createFolder:function() {
            if(this.cfcache!="") {
            let cid=getUid();
            let that=this;
           /*  let cf=new XMLHttpRequest;
            cf.open("post","http://z3773e6368.qicp.vip/user/cfile",true);
            cf.withCredentials=true;
            cf.setRequestHeader("content-type","application/json");
            cf.onreadystatechange=function() {
                if(cf.readyState==4 && cf.status==200) {
                    if(cf.response=="ok") {
                        that.$message({
                            message:"创建成功！",
                            type:"success"
                        }),
                        that.filelist.push({
                           id:cid,
                           fid:that.currentFolder==0?0:that.currentFolder.name,
                           username:that.userInfo.userId,
                           filename:that.cfcache
                        })
                        that.cfcache="";
                    } else {
                        that.$message.error(cf.response);
                    }
                }
            }
            cf.send(JSON.stringify({
                id:cid,
                fid:that.currentFolder.id,
                username:that.userInfo.userId,
                filename:that.cfcache
            })) */
            axios.post(
                "http://z3773e6368.qicp.vip/user/cfile",
                {
                    id:cid,
                    fid:that.currentFolder==0?0:that.currentFolder.id,
                    username:that.userInfo.userId,
                    filename:that.cfcache
                },
                {
                    "content-type":"application/json"
                }).then(function(res){
                    if(res.data=="ok") {
                        that.$message({
                            message:"创建成功",
                            type:"success"
                        })
                        that.filelist.push({
                            id:cid,
                            fid:that.currentFolder==0?0:that.currentFolder.id,
                            username:that.userInfo.userId,
                            filename:that.cfcache
                        })
                         that.cfcache="";
                    } else {
                        that.$message.error("创建失败")
                    }
                })
            
            } else {
                this.$message.error("文件夹名不能为空！");
            }
        },
        download:function(index,list) {
            let tem=list[index];
            dlfnc(tem.name);
        },
        deletesth:function(index,list) {
            let tem=list[index];
            let that=this;
            /* let del=new XMLHttpRequest;
            del.open("get","http://z3773e6368.qicp.vip/user/delete?picturename="+tem.name,true);
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
            del.send(); */
            if(tem.type=="photo") {
                axios.get("http://z3773e6368.qicp.vip/user/deletep?picturename="+tem.name).then(function(res){
                    if(res.data=="ok") {
                        that.$message({
                            message:"删除成功",
                            type:"success"
                        });
                    that.piclist.splice(index,1);
                    } else {
                        that.$message.error("未知错误！");
                    }
                    }); 
            } else {
                axios.get("http://z3773e6368.qicp.vip/user/deletec?id="+tem.id).then(function(res){
                    if(res.data=="ok") {
                        that.$message({
                            message:"删除成功",
                            type:"success"
                        });
                    that.filelist.splice(index,1);
                    } else {
                        that.$message.error("未知错误！");
                    }
                    }); 
            }
        },
        upload:function() {
            this.dialogVisble=true;
        },
        verify:function() {

        },
        uploadPoststh:function() {

            let formdata= new FormData;
            let that=this;
            formdata.append("id",that.currentFolder.id);
            formdata.append("username",that.userInfo.userId);
            formdata.append("upload",that.upfilelist[0].raw);
            console.log(that.upfilelist[0].raw);
            let uppost=new XMLHttpRequest;
            uppost.open("post","http://z3773e6368.qicp.vip/user/upload");
            // uppost.setRequestHeader("content-type","multipart/form-data");
            uppost.withCredentials=true;
            uppost.onreadystatechange=function() {
                if (uppost.readyState==4 && uppost.status==200) {
                    if (uppost.responseText=="ok") {
                        that.$message({
                            message:"上传成功！",
                            type:"success"
                        });
                        // that.piclist.push("待审核文件");
                        axios.get("http://z3773e6368.qicp.vip/user/getf?username="+app.userInfo.userId+"&fid="+that.currentFolder.id).then(function(res){
                            try{
                               app.filelist=res.data;
                               // console.log(app.filelistcache);
                            }   catch(e) {
                               app.$message.error(res.data);
                            }            
                       });
                        axios.get("http://z3773e6368.qicp.vip/user/getp?id="+tem.id).then(function(res){
                            try{
                                app.piclist=res.data;
                                // console.log(app.piclistcache);
                            } catch(e) {
                                app.$message.error(res.data);
                            }
                        });
                    } else {
                        that.$message.error(uppost.response);
                    }
                }
            }
            uppost.send(formdata);

           /*  axios.post("http://z3773e6368.qcip.vip/user/upload",
            formdata,
            {
                "content-type":"multipart/form-data"
            }).then(function(res) {
                if(res.data=="ok") {
                    that.$message({
                        message:"上传成功！",
                        type:"success"
                    })} else {
                        that.$message.error("未知错误！");
                    }
            }) */
        },
        handlechange:function(file,filelist) {
            this.upfilelist=filelist;
        },
        folderif:function(i,l) {
            return l[i].type=="folder"? true:false
        },
        picif:function(i,l) {
            return l[i].type=="folder"?false:true
        }
    }
})
