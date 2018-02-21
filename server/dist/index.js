'use strict';

var _hapi = require('hapi');

var _chalk = require('chalk');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi.Server();
server.connection({
    port: 3000,
    routes: {
        cors: true
    }
});

server.register(_inert2.default).then(function () {
    server.route(_routes2.default);
    return server.start();
}).then(function () {
    console.log((0, _chalk.green)('Server running at: ' + server.info.uri));
}).catch(function (err) {
    console.error(err.stack);
});