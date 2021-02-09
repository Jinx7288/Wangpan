"use strict"
new Vue({
    el:"#app",
    data(){
        return {
            userState:false,
            userInfo:{
                headUrl:'resources/Images/default-head.webp',
                userId:'99999',
                userSpace:'',
                fileTree:{

                }
            },
            cacheList:[
                {
                    'fileName':'first file',
                    'modifyTime':'20222222222222222',
                    'fileSize':'33333kb'
                }
            ]

           
        }  
    },
    methods:{

    }
})
