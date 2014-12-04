var fs = require("fs"),
    http = require("http"),
    path = require("path"),
    url = require("url");

var staticExtns = [".html",".js",".css",".ico",".png",".jpg", ".json"];

function isStaticResource(pathname){
    return staticExtns.some(function(extn){
        return path.extname(pathname) === extn;
    });
}

var server = http.createServer(function(req,res){
    var urlData = url.parse(req.url,true);
    if (isStaticResource(urlData.pathname)){
        var filePath = path.join(__dirname, urlData.pathname);
        if (fs.existsSync(filePath)){
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else {
        if (urlData.pathname === "/tasks"){
            setTimeout(function(){
                var data = ' [{"name":"Master Promise implementation in Angular","id":"1417676188675","isCompleted":false,"createdAt":"2014-12-04T07:03:03.063Z"},{"name":"Master javascript as soon as possible","id":"1417676188730","isCompleted":true,"createdAt":"2014-12-04T07:03:03.063Z"}, {"name":"Explore jQuery to use in the upcoming projects","id":"1417676201053","isCompleted":false,"createdAt":"2014-12-04T07:03:03.063Z"},{"name":"Practice Angular.js for better job prospects","id":"1417676214520","isCompleted":true,"createdAt":"2014-12-04T07:03:03.063Z"}]';
                res.write(data);
                res.end();
            },5000);
        }
    }
});
server.listen(9090);

/*var webSocket = require("nodejs-websocket");
var webSocketServer = webSocket.createServer(function(conn){
    console.log("A new connection is established");
    webSocketServer.connections.forEach(function(con){
        con.sendText("Total active clients = " + webSocketServer.connections.length.toString());
    });
});
webSocketServer.listen("9092");
console.log("web server listening on port 9090 & socket server on 9092");*/
