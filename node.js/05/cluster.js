const cluster = require('cluster');

const instances = 2; // 启动进程数量

console.log('isMaster', cluster.isMaster)
if (cluster.isMaster) {

    for(let i = 0;i<instances;i++) { // 使用 cluster.fork 创建子进程

        cluster.fork();

    }

} else {

    require('./app.js');

}
