import React, { Component } from 'react';
import Icon from './utilityComponents/icon.jsx';
import styles from '../styles/sharedEmployeeStyles.jsx';
import EmployeeActions from '../flux/employeeActions.jsx';
import Modal from 'react-modal';
import modalStyle from '../styles/modalStyle.jsx';
import EmployeeForm from './employeeForm.jsx';
import Button from './utilityComponents/button.jsx';

export default class Employee extends Component {
  constructor() {
    super();
    this.state = {
      editModalIsOpen: false,
      deleteModalIsOpen: false
    };
  }

  openEditModal() {
    this.setState({editModalIsOpen: true});
  }

  closeEditModal() {
    this.setState({editModalIsOpen: false});
  }

  openDeleteModal() {
    this.setState({deleteModalIsOpen: true});
  }

  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
  }

  handleDelete(e) {
    EmployeeActions.removeAnEmployee(this.props.employee.id);
    this.closeDeleteModal();
  }

  handleStateEdit(data) {
    this.setState({
      editData:  data
    });
  }

  handleEdit(e) {
    let formatData = {
      fullName: this.state.editData.fullName,
      DOB: this.state.editData.DOB.format("MM/DD/YYYY"),
      role: this.state.editData.role
    }
    if (formatData.fullName && formatData.DOB && formatData.role) {
      EmployeeActions.editAnEmployee(this.props.employee.id, formatData);
      this.closeEditModal();
    } else {
      alert("Fields cannot be empty!")
    }
  }

  renderEditModal() {
    return (
      <Modal isOpen={this.state.editModalIsOpen}
             onRequestClose={this.closeEditModal.bind(this)}
             contentLabel="Employee Edit Modal"
             style={modalStyle}>
        <EmployeeForm handleEdit={this.handleStateEdit.bind(this)} employeeEdit={this.props.employee} />
        <div style={employeeStyles.modalButtonStyle}>
          <Button title="Submit" handleClick={this.handleEdit.bind(this)}/>
          <Button title="Cancel" handleClick={this.closeEditModal.bind(this)}/>
        </div>
      </Modal>
    )
  }

  renderDeleteModal() {
    return (
      <Modal isOpen={this.state.deleteModalIsOpen}
             onRequestClose={this.closeDeleteModal.bind(this)}
             contentLabel="Employee Delete Modal"
             style={modalStyle}>
        <div>
          <div style={employeeStyles.deleteNameTitle}>
            <h1>{this.props.employee.fullName}</h1>
          </div>
          <hr/>
          <div style={employeeStyles.deleteNameText}>
            <p>Are you sure you want to delete {this.props.employee.fullName} from the directory?</p>
          </div>
        </div>
        <hr/>
        <div style={employeeStyles.modalButtonStyle}>
          <Button title="Delete" handleClick={this.handleDelete.bind(this)}/>
          <Button title="Cancel" handleClick={this.closeDeleteModal.bind(this)}/>
        </div>
      </Modal>
    )
  }

  render() {
    let firstColumnStyle = styles.firstColumnEditStyle;
    if (!this.props.employeeEdit) {
      firstColumnStyle = styles.firstColumnStyle;
    }
    return (
      <div style={styles.titlesContainer}>
        <div style={{...styles.quadrant, ...firstColumnStyle}}>
          <p>{this.props.employee.fullName}</p>
        </div>
        <div style={styles.quadrant}>
          <p>{this.props.employee.DOB}</p>
        </div>
        <div style={styles.quadrant}>
          <p>{this.props.employee.role}</p>
        </div>
        <div style={{...styles.quadrant, ...styles.lastColumnStyle}}>
          <Icon handleClick={this.openEditModal.bind(this)} icon="fa-pencil"/>
          <Icon handleClick={this.openDeleteModal.bind(this)} icon="fa-trash"/>
        </div>
        {this.renderEditModal()}
        {this.renderDeleteModal()}
      </div>
    );
  }
}

const employeeStyles = {
  modalButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  deleteNameTitle: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '24px'
  },
  deleteNameText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '24px',
    textAlign: 'center'
  }
}
