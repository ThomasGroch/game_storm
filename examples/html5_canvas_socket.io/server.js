/**
  * @desc This file contains the server for this nodejs application
  * @author Cristian Van Herp cristian.vh95@gmail.com
*/

//TODO Think about the necessary security features on file permissions and implement them

var http_pkg = require('http');
var io_pkg = require('socket.io');
var fs_pkg = require('fs');
var url_pkg = require('url');
var mime_pkg = require('mime');
var mongodb_pkg = require('mongodb');

var app = http_pkg.createServer(onHttpRequest);
var socket_io = io_pkg.listen(app);
var mongodb_client = mongodb_pkg.MongoClient;
var global_socket = null;

//MongoDB Connection
var mongodb_url = 'mongodb://localhost:27017/brainstorm';
var database = null;

mongodb_client.connect(mongodb_url, function(err, db) {
    database = db;
});

app.listen(8080);


function onHttpRequest(request, response) {

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

//Socket.io callbacks
var onSaveLocation = function(data) {
    if(data.player) {
        database.collection('players').updateOne(
            {"_id": mongodb_pkg.ObjectId(data.player._id)},
            {"x": data.player.x, "y": data.player.y}
        )
    }
};

var onRequestPlayerLocation = function(data) {
    if(data.player) {
        database.collection('players').findOne({"_id": mongodb_pkg.ObjectId(data.player._id)}, function(err, e) {
            if(e) {
                global_socket.emit('player_location', {'x': e.x, 'y': e.y});
            }
        });
    }
};

//This is the callback for when the socket server gets a connection
var onSocketConnection = function(socket) {
    global_socket = socket;
    global_socket.on('save_location', onSaveLocation);
    global_socket.on('request_player_location', onRequestPlayerLocation);
};

socket_io.sockets.on('connection', onSocketConnection);
