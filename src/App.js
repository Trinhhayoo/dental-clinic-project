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
PatientDetail,
PatientAppointments,
PatientTreatmentPlan,

AddPatientForm,
EditPatientForm,
SearchPatient,

Appointment,
AddAppointmentForm,
EditAppointmentForm, 
AppointmentDetail,


Request,
AddRequestForm,

Employee,
AddEmployeeForm,
EmployeeDetail,
EditEmployeeForm,

Payment,
AddPaymentForm,

TreatmentPlan,
AddTreatmentPlan,
TeethListModal


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
              <Route path="/PatientDetail/:patientId" element={<PatientDetail />} />
              <Route path="/PatientAppointments/:patientId" element={<PatientAppointments />} />
              <Route path="/PatientTreatmentPlan/:patientId" element={<PatientTreatmentPlan />} />

              <Route path="/SearchPatient" element={<SearchPatient />} />

              <Route path="/AddPatientForm" element={<AddPatientForm/>} />
              <Route path="/EditPatientForm/:patientId" element={<EditPatientForm/>} />
              <Route path="/AddPaymentForm" element={<AddPaymentForm/>} />


              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/TreatmentPlan" element={<TreatmentPlan/>} />
              <Route path="/AddTreatmentPlan/:patientId" element={<AddTreatmentPlan/>} />
              <Route path="/TeethListModal" element={<TeethListModal/>} />

              <Route path="/AddAppointmentForm" element={<AddAppointmentForm/>} />
              <Route path="/EditAppointmentForm/:appointmentId" element={<EditAppointmentForm />} />
              <Route path="/AppointmentDetail/:appointmentId" element={<AppointmentDetail />} />



              <Route path="/Request" element={<Request />} />
              <Route path="/AddRequestForm" element={<AddRequestForm/>} />

              <Route path="/Employee" element={<Employee />} />
              <Route path="/AddEmployeeForm" element={<AddEmployeeForm/>} />
              <Route path="/EmployeeDetail/:employeeId" element={<EmployeeDetail />} />
              <Route path="/EditEmployeeForm/:employeeId" element={<EditEmployeeForm/>} />



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