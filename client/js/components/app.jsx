import React, { Component } from 'react';
import Header from './header.jsx';
import EmployeeDirectory from './employeeDirectory.jsx';

export default class App extends Component {
  render() {
    return (
      <div style={styles.appContainer}>
        <Header/>
        <EmployeeDirectory/>
      </div>
    );
  }
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif'
  }
}
