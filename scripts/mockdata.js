
Mock.setup({
    timeout:"50-150"
})
Mock.mock(
    'http://z3773e6368.qicp.vip/user/getf?username=demoForSignup&fid=0',
    'get',
    JSON.stringify(
        [
            {
                id:111111,
                fid:0,
                username:"demoForSignup",
                filename:"the first folder"
            },
            {
                id:222222,
                fid:0,
                username:"demoForSignup",
                filename:"2th folder"
            },
            {
                id:333333,
                fid:0,
                username:"demoForSignup",
                filename:"3th folder"
            }
        ]
    )
    )
Mock.mock(
    RegExp('http://z3773e6368.qicp.vip/user/getf?username=demoForSignup&fid='+'.*'),
    'get',
    function(options) {
        console.log(options);
        return JSON.stringify(
            [
                {
                    id:444444,
                    fid:options.url.slice(64),
                    username:"demoForSignup",
                    filename:"folder sdadadads"
                },
                {
                    id:555555,
                    fid:options.url.slice(64),
                    username:"demoForSignup",
                    filename:"folder ad"
                },{
                    id:555555,
                    fid:options.url.slice(64),
                    username:"demoForSignup",
                    filename:"folder sads"
                },
            ]
        )
           
    }
)
Mock.mock(
    RegExp("http://z3773e6368.qicp.vip/user/getp?id="+".*"),
    'get',
    function() {
        return [
            "picture1111",
            "pic222222",
            "pic4444"
        ]
    }
)
Mock.mock(
    "http://z3773e6368.qicp.vip/user/cfile",
    "post",
    "ok"
)
Mock.mock(
    RegExp("http://z3773e6368.qicp.vip/user/delete?picturename="+".*"),
    "get",
    "ok"
)
Mock.mock(
    "http://z3773e6368.qicp.vip/user/signout",
    'get',
    "ok"
)