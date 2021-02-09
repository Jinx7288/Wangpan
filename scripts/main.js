"use strict"
new Vue({
    el:"#login",
    data(){
        return {
            stateTg:true,
            notallOK:false,
            user:{
                userid:'',
                password:''
            },
            adduser:{
                addid:'',
                addemail:'',
                addpw:'',
                addpw1:''
            }
            
        }  
    },
    methods:{
        logIn:function() {
            let finalUser=this.user;
            if (/^\w+$/.test(finalUser.userid)&&checkpw(finalUser.password)) {
                    let loginPost=new XMLHttpRequest;
                    loginPost.open("post","server/login.java",true);
                    loginPost.setRequestHeader("content-type","application/json");
                    loginPost.onreadystatechange=()=>{
                        if(loginPost.readyState==4 && loginPost.status== 200) {
                            dealwith(JSON.parse(loginPost.responseText));
                            // ! 处理返回结果
                        }
                    }
                    loginPost.send(JSON.stringify(finalUser));
                } else {
                    this.$message.error('用户名或密码格式错误!请重新输入');
                }
            },

        signUp:function() {
            let newuser=this.adduser;
            if(/^\w+$/.test(finalUser.userid)&&checkpw(finalUser.addpw)&&checkpw(finalUser.addpw1)&&(finalUser.addpw==finalUser.addpw1)) {
                let signupPost=new XMLHttpRequest;
                signupPost.open("post","server/signup.java",true);
                signupPost.setRequestHeader("content-type","application/json");
                signupPost.onreadystatechange= ()=>{
                    if(signupPost.readyState==4 && signupPost.status==200) {
                        this.$message({
                            message:"注册成功！请登录",
                            type:"success"
                        })
                        this.stateTg=true;
                    }
                }
                signupPost.send(JSON.stringify(newuser));
            }
                
        },
    }
})

function checkpw(pw) {
    return /^.{8,15}$/i.test(pw)
    &&/^.*[A-Z]+.*$/.test(pw)
    &&/^.*[a-z]+.*$/.test(pw)
    &&/^.*\d.*\d.*$/.test(pw) 
}