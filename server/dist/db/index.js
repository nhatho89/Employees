'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getEmployees = getEmployees;
exports.addEmployee = addEmployee;
exports.removeEmployee = removeEmployee;
exports.editEmployee = editEmployee;
exports.favoriteEmployee = favoriteEmployee;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _employeeData = require('./employee-data');

var _employeeData2 = _interopRequireDefault(_employeeData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Poor mans DB ;-)

var employees = JSON.parse(JSON.stringify(_employeeData2.default)).map(function (person) {
    return _extends({}, person, {
        id: _nodeUuid2.default.v4()
    });
});

function getEmployees() {
    return new Promise(function (res, rej) {
        return res(employees);
    });
}

function addEmployee() {
    var employee = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (res, rej) {
        employee.id = _nodeUuid2.default.v4();
        employees.push(employee);
        res(save(employees).then(function () {
            return employee;
        }));
    });
}

function removeEmployee(id) {
    return new Promise(function (res, rej) {
        employees = employees.filter(function (person) {
            return person.id !== id;
        });
        res(save(employees));
    });
}

function editEmployee(id, data) {
    return new Promise(function (res, rej) {
        var employee = void 0;
        employees = employees.filter(function (person) {
            if (person.id !== id) return person;
            employee = person;
            return false;
        });

        employee = _extends({}, employee, data);
        employees.push(employee);

        res(save(employees).then(function () {
            return employee;
        }));
    });
}

function favoriteEmployee(id) {
    return new Promise(function (res, rej) {
        var employee = void 0;
        employees = employees.filter(function (person) {
            if (person.id !== id) return person;
            employee = person;
            return false;
        });
        employee = _extends({}, employee, {
            isFavorited: !person.isFavorited
        });
        employees.push(employee);

        res(save(employees).then(function () {
            return employee;
        }));
    });
}

function save(employees) {
    return new Promise(function (res, rej) {
        _fs2.default.writeFile(_path2.default.join(__dirname, 'employee-data.json'), JSON.stringify(employees, null, 4), 'utf-8', function (err) {
            return err ? rej(err) : res();
        });
    });
}