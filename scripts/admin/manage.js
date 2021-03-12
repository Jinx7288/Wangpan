
new Vue({
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
        let that=this;
        getn.open("get","http://z3773e6368.qicp.vip/admin/getn",true);
        getn.onreadystatechange=function() {
            if (getn.readyState==4 && getn.status==200) {
                try{
                    that.userlist=JSON.parse(getn.response);                  
                } catch(e) {
                    that.$message.error("未知错误！");
                }
            }

        }
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
            let user=list[item];
            let getUser=new XMLHttpRequest;
            getUser.open("get","http://z3773e6368.qicp.vip/admin/getp?username="+user.name)
            getUser.withCredentials=true;
            getUser.onreadystatechange=function() {
                if(getUser.readyState==4 && getUser.status==200) {
                    this.checkwindow=true;
                    this.cacheList=JSON.parse(getUser.response);
                }
            }
        },
        delete:function(index,list) {
            let item = list[index];
            let del=new XMLHttpRequest;
            del.withCredentials=true;
            let that=this;
            del.open("get","http://z3773e6368.qicp.vip/admin/delete?picturename"+item.name);
            del.onreadystatechange=function () {
                if(del.readyState==4 && del.status==200) {
                    if(del.response=="ok") {
                        that.$message({
                            message:"删除成功！",
                            type:"success"
                        })
                        list[index].remove();
                    } else {
                        that.$message.error(del.responseText);
                    }
                } else {
                    that.$message.error("未知错误！")
                }
            }
        },
        pass:function(index,list) {
            let item = list[index];
            let that=this;
            let pass=new XMLHttpRequest;
            pass.withCredentials=true;
            pass.open("get","http://z3773e6368.qicp.vip/admin/update?picturename"+item.name);
            pass.onreadystatechange=function () {
                if (pass.readyState==4 && pass.status==200) {
                    if (pass.response=="ok") {
                        that.$message({
                            message:"已通过！",
                            type:"success"
                        })
                        list[index].remove();
                    } else {
                        that.$message.error(pass.response);
                    }
                } else {
                    that.$message.error("未知错误！")
                }
            }
        }
    }
})