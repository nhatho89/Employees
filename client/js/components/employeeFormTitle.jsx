import React, { Component } from 'react';
import Icon from './utilityComponents/icon.jsx';
import styles from '../styles/sharedEmployeeStyles.jsx';
import EmployeeActions from '../flux/employeeActions.jsx';

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: this.props.employeeEdit ? this.props.employeeEdit.fullName : "",
      DOB: this.props.employeeEdit ? this.props.employeeEdit.DOB : "",
      role: this.props.employeeEdit ? this.props.employeeEdit.role : ""
    }
  }

  handleChange(e) {
    if (this.props.employeeEdit) {
      let handleEditStateChange = new Promise((resolve, reject) => {
        this.setState({
          [e.target.name]: e.target.value
        });
        resolve();
      })
      handleEditStateChange.then(() => {
        this.props.handleEdit(this.state);
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleEmployeeSubmission(e) {
    EmployeeActions.submitNewEmployee({
      fullName: this.state.fullName,
      DOB: this.state.DOB,
      role: this.state.dob
    })
  }

  addNewEmployeeRow() {
    this.props.addNewEmployeeRow();
  }

  renderTitles(edit) {
    let lastColumn = (
      <div style={{...styles.quadrant, ...styles.lastColumnStyle}}>
        <Icon handleClick={this.addNewEmployeeRow.bind(this)} icon="fa-plus"/>
      </div>
    )
    let titleEditContainer = {};
    let firstColumnStyle = styles.firstColumnStyle;
    if (edit) {
      lastColumn = <span/>;
      firstColumnStyle = styles.firstColumnEditStyle;
      titleEditContainer = {display: 'flex', justifyContent: 'space-evenly'}
    }

    return (
      <div style={{...styles.titlesContainer, ...titleEditContainer}}>
        <div style={{...styles.quadrant, ...firstColumnStyle}}>
          <strong><p style={styles.columnLabel}>
            Full Name
          </p></strong>
        </div>
        <div style={styles.quadrant}>
          <strong><p style={styles.columnLabel}>
            DOB
          </p></strong>
        </div>
        <div style={styles.quadrant}>
          <strong><p style={styles.columnLabel}>
            Role
          </p></strong>
        </div>
        {lastColumn}
      </div>
    )
  }

  render() {
    let edit = this.props.employeeEdit ? true : false;

    return (
      <div>
        {this.renderTitles(edit)}
        <hr/>
      </div>
    );
  }
}
