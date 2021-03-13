
let app=new Vue({
    el:"#app",
    data() {
        return {
            headurl:"resources/Images/default-head.webp",
            cacheList:[],
            pagenow:1,
            userlist:[],
            currentuser:'',
            checkwindow:false
        }
    },
    mounted:function() {
        let getn=new XMLHttpRequest;
        getn.withCredentials=true;
        let that=this;
        getn.open("get","http://z3773e6368.qicp.vip/admin/getn",true);
        getn.onreadystatechange=function() {
            if (getn.readyState==4 && getn.status==200) {
                try{
                    let list=JSON.parse(getn.response);
                    let arr=[];
                    for (let index = 0; index < list.length; index++) {
                        let element = list[index];
                        let ele={
                            username:element,
                            lasttime:"2021-03-14-13-14",
                            rate:"7%",
                            checknumber:"99+"
                        }
                        arr.push(ele);
                    }
                    that.userlist=arr;
                    // console.log(that.userlist);
                } catch(e) {
                    that.$message.error("未知错误！");
                }
            }

        }
        getn.send();
    },
    methods:{
        logOut:function() {
            window.location.href="admin.html";
            let signout=new XMLHttpRequest;
            let that=this;
            signout.open("get","http://z3773e6368.qicp.vip/admin/signinout",true);
            signout.withCredentials=true;
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
            window.localStorage.removeItem("admin");
        },
        checkPic:function(index,list) {
            let that=this;
            let user=list[index];
            let getUser=new XMLHttpRequest;
            getUser.open("get","http://z3773e6368.qicp.vip/admin/getp?username="+user.username)
            getUser.withCredentials=true;
            getUser.onreadystatechange=function() {
                if(getUser.readyState==4 && getUser.status==200) {
                    that.checkwindow=true;
                    try{
                        let list=JSON.parse(getUser.response);
                        let arr=[];
                        for (let index = 0; index < list.length; index++) {
                            let element = list[index];
                            let ele={
                                name:element,
                                lasttime:"2021-03-14-13-14",
                                type:"picture",
                                size:"0KB"
                            }
                            arr.push(ele);
                        }
                        that.cacheList=arr;
                    } catch(e) {
                        that.$message.error("未知错误！");
                    }
                }
            }
            getUser.send();
        },
        deletesth:function(index,list) {
            let item = list[index];
            let del=new XMLHttpRequest;
            del.withCredentials=true;
            let that=this;
            del.open("get","http://z3773e6368.qicp.vip/admin/delete?picturename="+item.name);
            del.onreadystatechange=function () {
                if(del.readyState==4 && del.status==200) {
                    if(del.response=="ok") {
                        that.$message({
                            message:"删除成功！",
                            type:"success"
                        })
                        that.cacheList.slice(index,1);
                    } else {
                        that.$message.error(del.responseText);
                    }
                } 
            }
            del.send();
        },
        passsth:function(index,list) {
            let item = list[index];
            let that=this;
            let pass=new XMLHttpRequest;
            pass.withCredentials=true;
            pass.open("get","http://z3773e6368.qicp.vip/admin/update?picturename="+item.name);
            pass.onreadystatechange=function () {
                if (pass.readyState==4 && pass.status==200) {
                    if (pass.response=="ok") {
                        that.$message({
                            message:"已通过！",
                            type:"success"
                        })
                        that.cacheList.slice(index,1);
                    } else {
                        that.$message.error(pass.response);
                    }
                } 
            }
        pass.send();
        }
    }
})