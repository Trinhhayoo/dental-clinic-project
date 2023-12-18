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
export {
   getEmpList,
   filterEmpGenderRole
  };
  