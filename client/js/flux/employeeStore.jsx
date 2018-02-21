import AppDispatcher from './appDispatcher.jsx';
import AppActions from './employeeActions.jsx';
import { EventEmitter } from 'events';
var _ = require('lodash');

let _employees = [];

//EmployeeStore.jsx
class AppStore extends EventEmitter {

    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this))
    }

    emitChange(eventName) {
        this.emit(eventName);
    }

    receiveEmployees(employees) {
      _employees = employees;
    }

    getAll() {
        return _employees;
    }

    submitEmployee(employee) {
        _employees.push(employee);
    }

    removeEmployee(id) {
      _employees.forEach((employee, idx) => {
        if (id == employee.id) {
          _employees.splice(idx,1);
        }
      })
    }

    editEmployees(employeeEdit) {
      _.filter(_employees, (employee, idx) => {
        if (employeeEdit.id == employee.id) {
          _employees[idx] = employeeEdit;
        }
      })
    }

    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    dispatcherCallback(action) {
        switch (action.actionType) {
            case 'SUBMIT_EMPLOYEE':
                this.submitEmployee(action.value);
                break;
            case 'REMOVE_EMPLOYEE':
                this.removeEmployee(action.value);
                break;
            case 'RECEIVE_EMPLOYEES':
                this.receiveEmployees(action.value);
                break;
            case 'EDIT_EMPLOYEE':
                this.editEmployees(action.value);
                break;
        }
        // I want this to always emit and update the employeeList
        this.emitChange('STORE_RECEIVE_EMPLOYEES');

        return true;
    }
}

export default new AppStore();
