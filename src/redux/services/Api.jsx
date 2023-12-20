import axios from "axios";
const getEmpList = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8082/employees/EmpList",

    );
    return response;
  } catch (error) {
    return error;
  }
};
const filterEmpGenderRole = async (gender,role) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8082/employees/filterRoleGender/${gender}:${role}`,
        );
       
        return response;
      } catch (error) {
        return error;
      }
}

const getEmpID = async (EmpID) => {
    try {
        const response = await axios.get(
            `http://localhost:8082/employees/getEmployeeById/${EmpID}`,
        );
       
        return response;
      } catch (error) {
        return error;
      }
}
const deleteEmpID = async (UserID, EmpID) => {
    debugger
    try {
        const response = await axios.post(
            `http://localhost:8082/employees/deleteEmployeeById/${UserID}`, EmpID, {
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  'Content-Type': 'application/json'
                }}
        );
       
        return response;
      } catch (error) {
        return error;
      }
}
const searchEmp = async (searchTerm) => {
  debugger
  try {
      const response = await axios.get(
          `http://localhost:8082/employees/searchEmp/${searchTerm}`, {
              headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
export {
   getEmpList,
   filterEmpGenderRole,
   getEmpID,
   deleteEmpID,
   searchEmp
  };
  