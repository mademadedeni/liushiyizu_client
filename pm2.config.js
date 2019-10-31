module.exports = {
    apps: [{
        // 生产环境
        name: "client",
        // 项目启动入口文件
        script: "./server/index.js",
        // 项目环境变量
        env: {
            "NODE_ENV": "production",
            // "PORT": 8686
        }
    }]
}
