import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>
          Employees
        </h1>
      </div>
    );
  }
}

const styles = {
  headerContainer: {
    backgroundColor: '#3e4eb8',
    height: '200px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    paddingLeft: '30px',
    fontSize: '40px'
  }
}
