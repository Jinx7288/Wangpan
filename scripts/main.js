import { checkpw,clearob } from "./fns.js";


let app=new Vue({
    el:"#login",
    data(){
        return {
            stateTg:true,
            notallOK:false,
            visible:true,
            user:{
                username:"demoForSignup",
                password:"7777777Aa"
            },
            adduser:{
                username:'demoForSignup',
                addemail:'jinx.drx@gmail.com',
                addpw:'7777777Aa',
                addpw1:'7777777Aa'
            }
            
        }  
    },
    mounted:function() {
      /*   let token=window.localStorage.getItem("token");
        if(token) {
            let trypost=new XMLHttpRequest;
            trypost.open("post","server/login.java",true);
            trypost.setRequestHeader("content-type","application/json");
            trypost.setRequestHeader("Authentication",token);
            trypost.onreadystatechange=function() {
                if(JSON.parse(trypost.response)) {
                        window.localStorage.setItem("tree",JSON.stringify(res));
                        window.location.href="content.html";
                }
            }
            trypost.send(null);
        } else {
            this.$message.error("登录过期，请重新登录!")
        } */
    },
    methods:{
        logIn:function() {
            let finalUser=this.user;
            let that=this;
            if (/^\w+$/.test(finalUser.username)&&checkpw(finalUser.password)) {
                    let loginPost=new XMLHttpRequest;
                    // loginPost.withCredentials=true;
                    loginPost.open("post","http://z3773e6368.qicp.vip/user/signin",true);
                    loginPost.setRequestHeader("content-type","application/json");
                    loginPost.onreadystatechange=function() {
                        if(loginPost.readyState==4 && loginPost.status== 200) {
                            // let res=JSON.parse(loginPost.response);
                            // if(res) {
                            //     if(res=="no user") {
                            //         that.$message.error("用户不存在!请检查输入或注册");
                            //     } else {
                            //         window.localStorage.setItem("token",res.token);
                            //         window.localStorage.setItem("tree",JSON.stringify(res.files));
                            //         window.localStorage.setItem("")
                            //         window.location.href="content.html";
                            //      }
                            // }
                            if(loginPost.responseText=="ok") {
                                window.localStorage.setItem("user",JSON.stringify(that.user));
                                window.location.href="content.html";
                            } else {
                                that.$message.error("登录失败");
                            }
                        }
                    }
                    loginPost.send(JSON.stringify(finalUser));
                }  
                else {
                    this.$message.error('用户名或密码格式错误!请重新输入');
                }
            },
        signUp:function() {
            let that=this;
            let newuser=this.adduser;
            if(/^\w+$/.test(newuser.username)
                &&/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(newuser.addemail)
                &&checkpw(newuser.addpw)
                &&checkpw(newuser.addpw1)
                &&(newuser.addpw==newuser.addpw1)) {
                let signupPost=new XMLHttpRequest;
                signupPost.open("post","http://z3773e6368.qicp.vip/user/register",true);
                signupPost.setRequestHeader("content-type","application/json");
                signupPost.onreadystatechange=function(){
                    if(signupPost.readyState==4 && signupPost.status==200) {
                        if(signupPost.responseText=="ok") {
                            that.$message({
                                message:"注册成功！请登录",
                                type:"success"
                            })
                            that.stateTg=true;
                            that.adduser.addid='';
                            that.adduser.addemail='';
                            that.adduser.addpw='';
                            that.adduser.addpw1='';
                            that.user.username='';
                            that.user.password='';
                        } else {
                            that.$message.error((signupPost.responseText));
                        }
                    }
                }
            let send={
                "username":that.adduser.username,
                "password":that.adduser.addpw
            }
            signupPost.send(JSON.stringify(send));
            } else {
                that.$message.error("格式错误，请修改！");
            }
        }
    }
})

// ! mock test

// Mock.setup({
//     timeout:"200-400"
// })
// Mock.mock(
//     'server/login.java',
//     'post',
//      {
//         "token":"@guid",
//         "files":[
//             {   
//                 "name":"@ctitle(4,7)",
//                 "type":"folder",
//                 "nodeid":"@natural(10000,20000)"
//             },
//             {
//                 "name":"@ctitle(4,7)",
//                 "type":"folder",
//                 "nodeid":"@natural(10000,20000)"
//             },
//             {
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },
//             {
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             },{
//                 "name":"@ctitle(4,7)",
//                 "type":"photo",
//                 "size":"444KB",
//                 "nodeid":"@natural(4,7)"
//             }
//         ]
//     }
//   //  "no user"
//     //  ! 用户不存在样例
// )
// Mock.mock(
//     'server/signup.java',
//     'post',
//     "success"
// )


