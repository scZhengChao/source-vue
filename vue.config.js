const bodyParser = require("body-parser");
process.env.VUE_APP_VERSION = require('./package.json').version 
process.env.VUE_APP_abc = 'abc'
module.exports = {
    devServer: {
        // open: process.platform === 'darwin',
        open: true,
        // host: '0.0.0.0',
        port: 8080,
        // https: false,
        // hotOnly: false,
        // proxy: null, // string | Object
        before: app => {
            app.use(bodyParser.json());
            app.use(
                bodyParser.urlencoded({
                    extended: true
                })
            );
            app.use('/login',(req,res)=>{
                let {name,password} = req.body
                if(name =='zc' && password == '123456'){
                    res.json({
                        code:0,
                        message:'login success'
                    })
                }else{
                    res.json({
                        code:-1,
                        message:'login failed'
                    })
                }
            })

        }
    
    },
    lintOnSave: true, //关闭esling警告
    productionSourceMap: false, //打包不携带map文件
}