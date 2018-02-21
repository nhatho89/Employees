import React, { Component } from 'react';
import EmployeeFormTitle from './employeeFormTitle.jsx';
import EmployeeFormInput from './employeeFormInput.jsx';

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputFieldCount: 1
    }
  }

  addNewEmployeeRow() {
    this.setState({
      inputFieldCount: this.state.inputFieldCount + 1
    })
  }

  renderFormRow() {
    let edit = this.props.employeeEdit ? true : false;
    // reuses form input component when editing existing employee
    let formRow = [<EmployeeFormInput handleEdit={this.props.handleEdit}
                                      employeeEdit={this.props.employeeEdit}/>];
    if (!edit) {
      // handles adding new rows of input forms
      for (var i = 1; i < this.state.inputFieldCount; i++) {
        formRow.push(
          <EmployeeFormInput key={i}
                             employeeEdit={this.props.employeeEdit}/>
        );
      }
    }
    return formRow;
  }

  render() {
    return (
      <div>
        <EmployeeFormTitle addNewEmployeeRow={this.addNewEmployeeRow.bind(this)}
                           employeeEdit={this.props.employeeEdit}/>
        <div>
          {this.renderFormRow()}
        </div>
      </div>
    );
  }
}

EmployeeForm.defaultProps = {
  employeeEdit: false
}
