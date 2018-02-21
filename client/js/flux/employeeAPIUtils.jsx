var EmployeeAPIUtils = {
  async fetchEmployees(callback) {
    try {
      const response = await fetch('/employees');
      const json = await response.json();
      callback(json);
    } catch(error) {
      console.log(error);
      return error;
    }
  },

  async addNewEmployee(data,callback) {
    try {
      let response = await fetch('/employees', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      callback(json);
    } catch(error) {
      console.log(error);
    }
  },

  async removeEmployee(id, callback) {
    try {
      let response = await fetch('/employees/' + id, {
        method: 'DELETE',
      });
      callback(id);
    } catch(error) {
      console.log(error);
    }
  },

  async updateEmployee(id, data, callback) {
    try {
      let response = await fetch('/employees/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      const json = await response.json();
      callback(json);
    } catch(error) {
      console.log(error);
    }
  }
};

export {EmployeeAPIUtils as default};
