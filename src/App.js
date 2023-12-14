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
Appointment,
AddAppointmentForm,
EditAppointmentForm, 
Request

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
              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/AddAppointmentForm" element={<AddAppointmentForm/>} />
              <Route path="/EditAppointmentForm/:appointmentId" element={<EditAppointmentForm />} />
              <Route path="/Request" element={<Request />} />
              <Route path="/signin" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp />} />

            </Routes>
          </div>
        
        </div>
    

     
    </div>
  );
};

export default App;