var http_pkg = require('http');
var io_pkg = require('socket.io');
var fs_pkg = require('fs');
var url_pkg = require('url');
var mime_pkg = require('mime');

var app = http_pkg.createServer(onRequest);
var socket_io = io_pkg.listen(app);

app.listen(8080);

function onRequest(request, response) {

    var url = url_pkg.parse(request.url);
    var query_string = url.query;
    var uri_path = url.pathname;
    var file_path = __dirname + uri_path;

    if(uri_path == '/') {
        file_path += 'index.html';
    }

    var content_type = mime_pkg.lookup(file_path);

    fs_pkg.exists(file_path, function(exists) {
        if(exists) {
            fs_pkg.readFile(file_path, function(err, data) {
                response.writeHead(
                    200,
                    {'Content-Type': content_type}
                );
                response.end(data);
            });
        }
    });
};

socket_io.sockets.on('connection', function(socket) {
    socket.on('client_request', function(data) {
        console.log(data);
    });
});
