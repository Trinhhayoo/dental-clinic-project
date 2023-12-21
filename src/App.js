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
Employee,
Payment,
EditPaymentForm

} from "./pages";

import AddPaymentForm from "./pages/AddPaymentForm/AddPaymentForm";

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
              <Route path="/Employee" element={<Employee />} />
              <Route path="/signin" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/addPaymentForm" element={<AddPaymentForm/>} />
              <Route path="/editPaymentForm/:paymentID" element={<EditPaymentForm />} />
           
            </Routes>
          </div>
        
        </div>
    

     
    </div>
  );
};

export default App;