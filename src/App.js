import { useSelector, useDispatch } from "react-redux";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import {
 
  Sidebar,
  Userbar

} from "./components";
import {
Overview,
SignIn,
SignUp,
Patient,
AddPatientForm,
EditPatientForm,

Appointment,
AddAppointmentForm,
EditAppointmentForm, 

Request,
AddRequestForm,

Employee,
AddEmployeeForm,

Payment,
StaffAdmin,
DeleteSuccessfull,
Dentist,
EditEmployee,
RequestDetail,
AppointmentDetail


} from "./pages";
// import AddAppointmentForm from "./pages/AddAppointmentForm";


const App = () => {

 
  return (
    <div className="flex h-screen">
    <Sidebar />

     
    <div className="flex-1 flex flex-col">
       <Userbar />
     
          <div className="px-4 bg-gray-100 flex-1 h-fit">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/home" element={<Overview />} />
              <Route path="/Patient" element={<Patient />} />
              <Route path="/AddPatientForm" element={<AddPatientForm/>} />
              <Route path="/EditPatientForm/:patientId" element={<EditPatientForm/>} />


              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/Appointment/:appointmentId" element={<AppointmentDetail />} />
              <Route path="/AddAppointmentForm/:requestId/:patientId/:date/:time" element={<AddAppointmentForm/>} />
              <Route path="/EditAppointmentForm/:appointmentId" element={<EditAppointmentForm />} />
              <Route path="/Request/:requestId" element={<RequestDetail />} />
              <Route path="/Request" element={<Request />} />
              <Route path="/AddRequestForm" element={<AddRequestForm/>} />

              <Route path="/Employee" element={<Employee />} />
              <Route path="/Employee/:employeeId" element={<StaffAdmin />} />
              <Route path="/Dentist/:dentistId/:employeeId" element={<Dentist />} />
              <Route path="/deleteSuccess" element={<DeleteSuccessfull/>} />
             
              <Route path="/AddEmployee" element={<AddEmployeeForm/>} />
              <Route path="/EditEmployee/:employeeID" element={<EditEmployee/>} />
              <Route path="/Payment" element={<Payment/>} />


              <Route path="/signin" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp />} />

            </Routes>
          </div>
        
        </div>
    

     
    </div>
  );
};

export default App;