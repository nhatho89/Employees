import React, { Component } from 'react';
import Icon from './utilityComponents/icon.jsx';
import styles from '../styles/sharedEmployeeStyles.jsx';
import EmployeeActions from '../flux/employeeActions.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "../styles/datePickerStyle.css";

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: this.props.employeeEdit ? this.props.employeeEdit.fullName : "",
      DOB: this.props.employeeEdit ? moment(this.props.employeeEdit.DOB) : null,
      role: this.props.employeeEdit ? this.props.employeeEdit.role : ""
    }
  }

  handleDateChange(moment) {
    if (this.props.employeeEdit) {
      let handleEditStateChange = new Promise((resolve, reject) => {
        this.setState({
          DOB: moment
        });
        resolve();
      });
      handleEditStateChange.then(() => {
        this.props.handleEdit(this.state);
      })
    } else {
      this.setState({
        DOB: moment
      });
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
    // only allows submission if all fields are filled out
    if (this.state.fullName && this.state.DOB && this.state.role) {
      EmployeeActions.submitNewEmployee({
        fullName: this.state.fullName,
        DOB: this.state.DOB.format('MM/DD/YYYY'),
        role: this.state.role
      })

      this.setState({
        fullName: "",
        DOB: null,
        role: ""
      })
    } else {
      alert("All fields are required");
    }
  }

  renderInputFields(edit) {
    let lastColumn = (
      <div style={{...styles.quadrant, ...styles.lastColumnStyle}}>
        <Icon handleClick={this.handleEmployeeSubmission.bind(this)} icon="fa-plus"/>
      </div>
    )
    let containerStyle = {
      marginLeft: '0px'
    };
    if (edit) {
      lastColumn = <span/>;
      containerStyle = {
        marginLeft: '10px',
        justifyContent: 'space-evenly',
      };
    }

    const datepickerEl = (
      <input value={this.state.DOB}
             style={{...styles.inputFieldStyle}}
             className="datepicker"/>
    )

    return (
      <div className="inputFields"
           style={{...styles.titlesContainer,  ...containerStyle}}>
        <input value={this.state.fullName}
               style={{...styles.quadrant, ...styles.inputFieldStyle}}
               name="fullName"
               onChange={this.handleChange.bind(this)}/>
        <DatePicker onChange={this.handleDateChange.bind(this)}
                    dateFormat="MM/DD/YYYY"
                    showYearDropdown
                    popperPlacement="bottom-start"
                    dropdownMode="select"
                    selected={this.state.DOB}
                    customInput={datepickerEl}/>

        <input value={this.state.role}
               style={{...styles.quadrant, ...styles.inputFieldStyle}}
               name="role"
               onChange={this.handleChange.bind(this)}/>
          {lastColumn}
      </div>
    )
  }

  render() {
    // checking for edit form or new employee form
    let edit = this.props.employeeEdit ? true : false;

    return (
      <div>
        {this.renderInputFields(edit)}
        <hr/>
      </div>
    );
  }
}
