import {checkpw} from "../fns.js";

let admin=new Vue({
    el:"#login",
    data() {
        return {
            admin:{
                username:"666666",
                password:"666666"
            }
        }
    },
    methods:{
        logIn:function() {
            let adminr=this.admin;
            let that=this;
            if (/^\w+$/.test(adminr.username)&&checkpw(adminr.password)) {
                    let loginPost=new XMLHttpRequest;
                    loginPost.withCredentials=true;
                    loginPost.open("post","http://z3773e6368.qicp.vip/user/signin",true);
                    loginPost.setRequestHeader("content-type","application/json");
                    loginPost.onreadystatechange=function() {
                        if(loginPost.readyState==4 && loginPost.status== 200) {
                            if(loginPost.responseText=="ok") {
                                window.localStorage.setItem("admin",JSON.stringify(adminr));
                                window.location.href="manage.html";
                            } else {
                                that.$message.error("登录失败");
                            }
                        }
                    }
                    loginPost.send(JSON.stringify(adminr));
                }  
                else {
                    this.$message.error('用户名或密码格式错误!请重新输入');
                }
        }
    }
})