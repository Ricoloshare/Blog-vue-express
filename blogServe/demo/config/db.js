let MYSQL_CONFIG;

if (process.env.NODE_ENV === 'dev') {
    MYSQL_CONFIG = {
        databaseName: 'demo',
        databaseUserName: 'root',
        databasePassword: '1234',
        conf: {
            host: 'localhost',
            port: '3306',
            dialect: "mysql",
            pool: { //连接池
                max: 5, //最多有多少个连接
                min: 0, //最少有多少个连接
                idle: 10000, // 当前链接多久没有操作就断开
                acquire: 30000, // 多久没有获取到链接就断开
            }
        }
    }
} else if (process.env.NODE_ENV === 'pro') {
    MYSQL_CONFIG = {
        databaseName: 'myblog',
        databaseUserName: 'myblog',
        databasePassword: 'PptADxNGG2FjfsfY',
        conf: {
            host: 'localhost',
            port: '3306',
            dialect: "mysql",
            pool: { //连接池
                max: 5, //最多有多少个连接
                min: 0, //最少有多少个连接
                idle: 10000, // 当前链接多久没有操作就断开
                acquire: 30000, // 多久没有获取到链接就断开
            },
            timezone: '+08:00', //东八时区
            dialectOptions: {
                dateStrings: true,
                typeCast: true,
                collate: 'utf8_general_ci'
            },
            reconnect: true
        }
    }
}

module.exports = MYSQL_CONFIG;