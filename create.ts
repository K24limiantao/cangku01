// 加载http核心模块
var http = require('http')

//创建web服务器
var server = http.createServer()
/* 
	提供数据服务,注册request请求事件，当客户端请求，自动执行回调函数
    request 请求对象，获取客户端的一些请求信息
    response 响应对象，给客户端发送响应消息
*/
server.on('request', function (request:any,response:any) {
    //response使用Write来向客户端发送数据，但是一定要用end来结束响应数据
   if(request.url == '/')
    {
        response.write('hello')
        response.end()
        //可以写成response.end('hello')
    }
    else if(request.url == '/login'){
        response.write('login')
        response.end()
         //可以直接写成response.end('login')
    }
})

//绑定端口号启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功，可以通过"http://127.0.0.1:3000/"来进行访问');
});