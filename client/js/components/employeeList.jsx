import React, { Component } from 'react';
import Employee from './employee.jsx';
import EmployeeStore from '../flux/employeeStore.jsx';
import EmployeeActions from '../flux/employeeActions.jsx';

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: EmployeeStore.getAll()
    };
  }

  componentWillMount() {
    EmployeeActions.fetchEmployees();
  }

  componentDidMount() {
    this.employeesListener = EmployeeStore.addChangeListener('STORE_RECEIVE_EMPLOYEES', this.updateEmployeesList.bind(this));
  }

  componentWillUnmount() {
    this.employeesListener.remove();
  }

  updateEmployeesList(employee) {
    this.setState({
      employees: EmployeeStore.getAll()
    })
  }

  render() {
    let employees = <div/>;
    if (this.state.employees) {
      employees = this.state.employees.map((employee, idx) => {
        return (
          <div key={idx}>
            <Employee employee={employee}/>
              {this.state.employees[this.state.employees.length - 1] != employee ? <hr/> : ""}
          </div>
        )
      });
    }

    return (
      <div style={styles.listContainer}>
        {employees}
      </div>
    );
  }
}

const styles = {
}
