/**
    https://github.com/gzlock
    MIT License
*/

var http = require("http"),
    fs = require('fs');

//var port = process.env.PORT || 8080;
var port = 8080;

//the domain folder main file name
var index = '/index.js';

var server = http.createServer(function (request, response) {
    var host = getHost(request),
        indexFile = __dirname + '/host/' + host + index,
        isExists = fs.existsSync(indexFile),
        isFail = true;

    if (isExists) {//target file is exists
        var app;
        var hasCache = require.cache.hasOwnProperty(indexFile);

        if (hasCache) {// has requrie cache
            if (isModified(indexFile)) {//target file is modified
                app = require(indexFile, request, response);
                app.onClearCache && app.onClearCache();
                delete require.cache[indexFile];//delete cache
            }
        }

        app = require(indexFile, request, response);
        app.set('views',__dirname+'/host/'+host+'/views');

        if (!require.cache[indexFile].hasOwnProperty('mtime')) {//add the target file modified time to cache object prototype
            require.cache[indexFile]['mtime'] = getModifiedTime(indexFile);
        }

        if (app) {
            app.apply(this, arguments);
            isFail = false;
        }

    }

    if (isFail) {//fail
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404:'+indexFile);
    }
});

server.listen(port);
server.on('error', onError);

/**
 * Copy from Express
 * @param {Object} error
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            //process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            //process.exit(1);
            break;
        default:
            throw error;
    }
}


/**
 * get url from request
 *
 * @param {object} req
 * @return {string}
 * @private
 */

function getUrlOf(req) {
    return req.url;
}

/**
 * Get host from request
 * Copy from VHost
 *
 * @param  {Object} req
 * @return {string}
 * @private
 */

function getHost(req) {
    var host = req.headers.host;

    if (!host) {
        return;
    }

    var offset = host[0] === '[' ? host.indexOf(']') + 1 : 0;
    var index = host.indexOf(':', offset);

    return index !== -1 ? host.substring(0, index) : host;
}

/**
 * get file modified time from path
 * @param {String} path
 * @returns {number}
 */

function getModifiedTime(path) {
    var stat = fs.statSync(path), time = 0;
    if (stat)
        time = new Date(stat['mtime']).getTime();
    return time;
}

/**
 * compare the file modified time
 * @param {String} path
 * @returns {boolean}
 */

function isModified(path) {
    var a = getModifiedTime(path), b = require.cache[path]['mtime'], c = !(a == b);
    //console.log('time:%s %s %s', a, b, c);
    return c;
}