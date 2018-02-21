import AppDispatcher from './appDispatcher.jsx';
import EmployeeAPIUtils from './employeeAPIUtils.jsx';

//AppActions.jsx
class AppActions {

    fetchEmployees() {
      EmployeeAPIUtils.fetchEmployees(this.receiveAllEmployees);
    }

    receiveAllEmployees(employees) {
      AppDispatcher.dispatch({
          actionType: 'RECEIVE_EMPLOYEES',
          value: employees
      });
    }

    submitNewEmployee(employee) {
      EmployeeAPIUtils.addNewEmployee(employee, this.submitEmployee)
    }

    submitEmployee(employee) {
        AppDispatcher.dispatch({
            actionType: 'SUBMIT_EMPLOYEE',
            value: employee
        });
    }

    editAnEmployee(id, data) {
      EmployeeAPIUtils.updateEmployee(id, data, this.editEmployee)
    }

    editEmployee(employee) {
      AppDispatcher.dispatch({
          actionType: 'EDIT_EMPLOYEE',
          value: employee
      });
    }

    removeAnEmployee(id) {
      EmployeeAPIUtils.removeEmployee(id, this.removeEmployee)
    }

    removeEmployee(id) {
      AppDispatcher.dispatch({
        actionType: 'REMOVE_EMPLOYEE',
        value: id
      });
    }
}

export default new AppActions();
