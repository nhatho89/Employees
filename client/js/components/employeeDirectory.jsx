import React, { Component } from 'react';
import EmployeeForm from './employeeForm.jsx'
import EmployeeList from './employeeList.jsx';

export default class EmployeeDirectory extends Component {

  render() {
    return (
      <div style={styles.directoryStyle}>
        <EmployeeForm />
        <EmployeeList />
      </div>
    );
  }
}

const styles = {
  directoryStyle: {
    paddingLeft: '40px',
    paddingTop: '60px',
    paddingRight: '60px',
    minWidth: '1200px'
  }
}
