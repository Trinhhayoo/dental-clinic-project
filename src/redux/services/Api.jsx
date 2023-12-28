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
const viewPlanList = async (dentistId) => {
 
  try {
      const response = await axios.get(
          `http://localhost:8082/employees/getPlanDentist/${dentistId}`, {
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
const addEmployee = async (EmpInfo) => {
 
  try {
      const response = await axios.post(
          `http://localhost:8082/employees/addEmployee`,EmpInfo, {
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
const editEmployee = async (EmpInfo) => {

  try {
      const response = await axios.post(
        
          `http://localhost:8082/employees/changeEmp/${EmpInfo.employeeId}`,EmpInfo, {
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
const getRequestList = async () => {
 
  try {
      const response = await axios.get(
          `http://localhost:8082/requests/list`, {
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
const getRequestID = async (RequestID) => {
  try {
   
      const response = await axios.get(
          `http://localhost:8082/requests/${RequestID}`,
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const deleteRequestID = async (RequestID) => {

  try {
      const response = await axios.post(
          `http://localhost:8082/requests/deleteRequest/${RequestID}`, {
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
const searchRequest = async (searchTerm) => {

try {
    const response = await axios.get(
        `http://localhost:8082/requests/searchByPhone/${searchTerm}`, {
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
const addRequest = async (Request) => {

  try {
      const response = await axios.post(
          `http://localhost:8082/requests/createRequest`,Request, {
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
const filterRequestShift = async (shift) => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8082/requests/filterByShift/${shift}`,
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const filterRequestStatus = async (status) => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8082/requests/filterByStatus/${status}`,
      );
     
      return response;
    } catch (error) {
      return error;
    }
}

const findPatient = async (phone) => {
  try {
  
      const response = await axios.get(
          `http://localhost:8082/requests/findPatient/${phone}`,
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getAppointmentlist = async () => {
  try {
  
      const response = await axios.get(
          `http://localhost:8082/appointments/list`,
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getAppointmentByPatient = async (patientName) => {
  try {
  
    const response = await axios.get(
      `http://localhost:8082/appointments/byPatient/${patientName}`, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const getDentistFreeAppointment = async (date, time) => {
  try {
  
    const response = await axios.get(
      `http://localhost:8082/appointments/viewDentistFree/${date}/${time}`, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const createAppointment = async (appointment) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/addAppointment`,appointment, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const getAppointmentDetail = async (appointmentID) => {
  try {
   
    const response = await axios.get(
      `http://127.0.0.1:8082/appointments/byID/${appointmentID}`,{
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const deleteAppointmentId = async (appointmentID) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/deleteID/${appointmentID}`,{
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const editAppointmentId = async (appointmentUpdated) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/edit/${appointmentUpdated.appointment_id}`, appointmentUpdated, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const retreatments = async () => {
  try {
   
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/view_retreatment`, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const retreatmentDetail = async (retreatmentId) => {
  try {
   debugger
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/${retreatmentId}`, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}
const UpdateretreatmentDetail = async (retreatmentId) => {
  try {
   debugger
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/update/${retreatmentId}`, {
         // Truyền thông tin patientName qua params
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
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
   searchEmp,
   viewPlanList,
   addEmployee,
   editEmployee,
   getRequestList,
   getRequestID,
   filterRequestShift,
   searchRequest,
   deleteRequestID,
   addRequest,
   findPatient,
   filterRequestStatus,
   getAppointmentlist,
   getAppointmentByPatient,
   getDentistFreeAppointment,
   createAppointment,
   getAppointmentDetail,
   deleteAppointmentId,
   editAppointmentId,
   retreatments, 
   retreatmentDetail,
   UpdateretreatmentDetail
  };
  