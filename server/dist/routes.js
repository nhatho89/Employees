'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = {
    employee: {
        fullName: _joi2.default.string(),
        DOB: _joi2.default.string(),
        role: _joi2.default.string(),
        is_favorited: _joi2.default.boolean()
    },
    id: {
        id: _joi2.default.string().length(36)
    }
};

var getEmployees = {
    method: 'GET',
    path: '/employees',
    handler: function handler(req, reply) {
        reply(db.getEmployees());
    }
};

var addEmployee = {
    method: 'POST',
    path: '/employees',
    handler: function handler(_ref, reply) {
        var employee = _ref.payload;

        reply(db.addEmployee(employee)).code(201);
    },
    config: {
        validate: {
            payload: model.employee
        }
    }
};

var editEmployee = {
    method: 'PATCH',
    path: '/employees/{id}',
    handler: function handler(_ref2, reply) {
        var params = _ref2.params,
            payload = _ref2.payload;

        reply(db.editEmployee(params.id, payload)).code(202);
    },
    config: {
        validate: {
            params: model.id,
            payload: model.employee
        }
    }
};

var favoriteEmployee = {
    method: 'PATCH',
    path: '/employees/{id}/favorite',
    handler: function handler(_ref3, reply) {
        var params = _ref3.params;

        reply(db.favoriteEmployee(params.id)).code(202);
    },
    config: {
        validate: {
            params: model.id
        }
    }

};

var replaceEmployee = {
    method: 'PUT',
    path: '/employees/{id}',
    handler: function handler(_ref4, reply) {
        var params = _ref4.params,
            payload = _ref4.payload;

        reply(db.editEmployee(params.id, payload)).code(202);
    },
    config: {
        validate: {
            params: model.id,
            payload: model.employee
        }
    }
};

var removeEmployee = {
    method: 'DELETE',
    path: '/employees/{id}',
    handler: function handler(_ref5, reply) {
        var id = _ref5.params.id;

        reply(db.removeEmployee(id)).code(204);
    },
    config: {
        validate: {
            params: model.id
        }
    }
};

var clientDir = {
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'client'
        }
    }
};

var index = {
    method: 'GET',
    path: '/',
    handler: {
        file: 'client/index.html'
    }
};

exports.default = [getEmployees, addEmployee, editEmployee, removeEmployee, replaceEmployee, clientDir, index];