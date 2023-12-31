import axios from "axios";

const getEmpList = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8082/employees/EmpList",{
      headers: {
        "Authorization": `${token}`,
        'Content-Type': 'application/json'
      }}
    );
    return response;
  } catch (error) {
    return error;
  }
};
const filterEmpGenderRole = async (gender,role, token) => {
    try {

        const response = await axios.get(
            `http://127.0.0.1:8082/employees/filterRoleGender/${gender}:${role}`,{
              headers: {
                "Authorization": `${token}`,
                'Content-Type': 'application/json'
              }}
        );
       
        return response;
      } catch (error) {
        return error;
      }
}

const getEmpID = async (EmpID, token) => {
    try {
        const response = await axios.get(
            `http://localhost:8082/employees/getEmployeeById/${EmpID}`, {
              headers: {
                "Authorization": `${token}`,
                'Content-Type': 'application/json'
              }}
        );
       
        return response;
      } catch (error) {
        return error;
      }
}
const deleteEmpID = async (UserID, EmpID, token) => {
   
    try {
        const response = await axios.post(
            `http://localhost:8082/employees/deleteEmployeeById/${UserID}`, EmpID,{
              headers: {
                "Authorization": `${token}`,
                'Content-Type': 'application/json'
              }}
        );
       
        return response;
      } catch (error) {
        return error;
      }
}
const searchEmp = async (searchTerm, token) => {
 
  try {
      const response = await axios.get(
          `http://localhost:8082/employees/searchEmp/${searchTerm}`, {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const viewPlanList = async (dentistId, token) => {
 
  try {
      const response = await axios.get(
          `http://localhost:8082/employees/getPlanDentist/${dentistId}`,{
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const addEmployee = async (EmpInfo, token) => {
 
  try {
      const response = await axios.post(
          `http://localhost:8082/employees/addEmployee`,EmpInfo,{
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const editEmployee = async (EmpInfo, token) => {

  try {
      const response = await axios.post(
        
          `http://localhost:8082/employees/changeEmp/${EmpInfo.employeeId}`,EmpInfo, {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getRequestList = async (token) => {
 
  try {
      const response = await axios.get(
          `http://localhost:8082/requests/list`, {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getRequestID = async (RequestID, token) => {
  try {
   
      const response = await axios.get(
          `http://localhost:8082/requests/${RequestID}`,
          {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const deleteRequestID = async (RequestID, token) => {

  try {
      const response = await axios.post(
          `http://localhost:8082/requests/deleteRequest/${RequestID}`,{
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const searchRequest = async (searchTerm, token) => {

try {
    const response = await axios.get(
        `http://localhost:8082/requests/searchByPhone/${searchTerm}`, {
          headers: {
            "Authorization": `${token}`,
            'Content-Type': 'application/json'
          }}
    );
   
    return response;
  } catch (error) {
    return error;
  }
}
const addRequest = async (Request, token) => {

  try {
      const response = await axios.post(
          `http://localhost:8082/requests/createRequest`,Request, {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const filterRequestShift = async (shift, token) => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8082/requests/filterByShift/${shift}`,
          {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const filterRequestStatus = async (status, token) => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8082/requests/filterByStatus/${status}`, {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}

const findPatient = async (phone, token) => {
  try {
  
      const response = await axios.get(
          `http://localhost:8082/requests/findPatient/${phone}`,
          {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getAppointmentlist = async (token) => {
  try {
  
      const response = await axios.get(
          `http://localhost:8082/appointments/list`,
          {
            headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
            }}
      );
     
      return response;
    } catch (error) {
      return error;
    }
}
const getAppointmentByPatient = async (patientName, token) => {
  try {
  
    const response = await axios.get(
      `http://localhost:8082/appointments/byPatient/${patientName}`, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const getDentistFreeAppointment = async (date, time, token) => {
  try {
  
    const response = await axios.get(
      `http://localhost:8082/appointments/viewDentistFree/${date}/${time}`, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const createAppointment = async (appointment, token) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/addAppointment`,appointment, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const getAppointmentDetail = async (appointmentID, token) => {
  try {
   
    const response = await axios.get(
      `http://127.0.0.1:8082/appointments/byID/${appointmentID}`,{
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const deleteAppointmentId = async (appointmentID, token) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/deleteID/${appointmentID}`,{
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const editAppointmentId = async (appointmentUpdated, token) => {
  try {
   
    const response = await axios.post(
      `http://127.0.0.1:8082/appointments/edit/${appointmentUpdated.appointment_id}`, appointmentUpdated, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const retreatments = async (token) => {
  try {
   
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/view_retreatment`,{
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const retreatmentDetail = async (retreatmentId, token) => {
  try {
   debugger
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/${retreatmentId}`, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const UpdateretreatmentDetail = async (retreatmentId, token) => {
  try {
   debugger
    const response = await axios.get(
      `http://127.0.0.1:8082/retreatments/update/${retreatmentId}`, {
        headers: {
          "Authorization": `${token}`,
          'Content-Type': 'application/json'
        }}
    );

    return response;
  } catch (error) {
    return error;
  }
}
const login = async (userInfo) => {

  try {
      const response = await axios.post(
          `http://localhost:8082/auth/login`, userInfo, {
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
const getParentTreatment = async (token) => {
  try {
    const response = await axios.get(
        `http://localhost:8082/treatment/listParentTreatment`, {
            headers: {
              "Authorization": `${token}`,
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }}
    );
   
    return response;
  } catch (error) {
    return error;
  }
}
const getreatment = async (parentTreatment, token) => {

  try {
    const response = await axios.get(
        `http://localhost:8082/treatment/listTreatment?parent_id=${parentTreatment}`,{
            headers: {
              "Authorization": `${token}`,
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }},
            
    );
   
    return response;
  } catch (error) {
    return error;
  }
}
const createTreatmentPlan = async (treatmentPlan, token) => {
  debugger
  try {
    const response = await axios.post(
        `http://localhost:8082/treatment/addTreatmentPlan`, treatmentPlan, {
            headers: {
              "Authorization": `${token}`,
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
   UpdateretreatmentDetail,
   login,
   getParentTreatment,
   getreatment,
   createTreatmentPlan
  };
  