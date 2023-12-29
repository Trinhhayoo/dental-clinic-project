import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EmployeeList from '../assets/employee.json';
import treatmentData from '../assets/treatment.json';
import ttPlanData from '../assets/tt_plan.json';
import teethData from '../assets/teeth.json';
import surfaceData from '../assets/surface.json';

const AddTreatmentPlan = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TREATMENT_PLAN_ID: '',
    TP_PATIENT_ID: patientId,
    TP_DENTIST_ID: '',
    TP_PRESCRIPTION: '',
    TP_ASSISTANT_ID: '',
    TP_NOTE: '',
    TP_STATUS: '',
    TP_TREATMENT_ID: '',
    TP_TOOTH_ID: '',
    TP_SURFACE_ID: '',
    // Add more fields as needed
  });

  const [employees, setEmployees] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [teeth, setTeeth] = useState([]);
  const [surfaces, setSurfaces] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setEmployees(EmployeeList);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchTreatments = async () => {
      try {
        setTreatments(treatmentData);
      } catch (error) {
        console.error('Error fetching treatment data:', error);
      }
    };

    const fetchTeeth = async () => {
      try {
        setTeeth(teethData);
      } catch (error) {
        console.error('Error fetching teeth data:', error);
      }
    };

    const fetchSurfaces = async () => {
      try {
        setSurfaces(surfaceData);
      } catch (error) {
        console.error('Error fetching surface data:', error);
      }
    };

    fetchEmployees();
    fetchTreatments();
    fetchTeeth();
    fetchSurfaces();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = () => {
    // Add logic for continue button, e.g., navigate to the next page
    navigate('/nextPage'); // Điều chỉnh đường dẫn theo nhu cầu của bạn
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add logic to send data to the backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Treatment Plan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
          <label htmlFor="treatmentID" className="block text-sm font-medium text-gray-700">
            Treatment ID:
          </label>
          <select
            id="treatmentID"
            name="TP_TREATMENT_ID"
            value={formData.TP_TREATMENT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Treatment</option>
            {treatments.map((treatment) => (
              <option key={treatment.TREATMENT_ID} value={treatment.TREATMENT_ID}>
                {treatment.TREATMENT_NAME}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="toothID" className="block text-sm font-medium text-gray-700">
            Tooth ID:
          </label>
          <select
            id="toothID"
            name="TP_TOOTH_ID"
            value={formData.TP_TOOTH_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Tooth</option>
            {teeth.map((tooth) => (
              <option key={tooth.TEETH_ID} value={tooth.TEETH_ID}>
                {tooth.TEETH_NAME}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="surfaceID" className="block text-sm font-medium text-gray-700">
            Surface ID:
          </label>
          <select
            id="surfaceID"
            name="TP_SURFACE_ID"
            value={formData.TP_SURFACE_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Surface</option>
            {surfaces.map((surface) => (
              <option key={surface.SURFACE_TEETH_ID} value={surface.SURFACE_TEETH_ID}>
                {surface.SURFACE_NAME}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="patientID" className="block text-sm font-medium text-gray-700">
            Patient ID:
          </label>
          <input
            type="text"
            id="patientID"
            name="TP_PATIENT_ID"
            value={formData.TP_PATIENT_ID}
            readOnly
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">
            Dentist ID:
          </label>
          <select
            id="dentistID"
            name="TP_DENTIST_ID"
            value={formData.TP_DENTIST_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Dentist</option>
            {employees.map((employee) => (
              <option key={employee.EMPLOYEE_ID} value={employee.EMPLOYEE_ID}>
                {employee.EMP_NAME}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">
            Prescription:
          </label>
          <input
            type="text"
            id="prescription"
            name="TP_PRESCRIPTION"
            value={formData.TP_PRESCRIPTION}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="assistantID" className="block text-sm font-medium text-gray-700">
            Assistant ID:
          </label>
          <select
            id="assistantID"
            name="TP_ASSISTANT_ID"
            value={formData.TP_ASSISTANT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Assistant</option>
            {employees
              .filter((assistant) => assistant.EMPLOYEE_ID !== formData.TP_DENTIST_ID)
              .map((assistant) => (
                <option key={assistant.EMPLOYEE_ID} value={assistant.EMPLOYEE_ID}>
                  {assistant.EMP_NAME}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note:
          </label>
          <input
            type="text"
            id="note"
            name="TP_NOTE"
            value={formData.TP_NOTE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <input
            type="text"
            id="status"
            name="TP_STATUS"
            value={formData.TP_STATUS}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div> */}

       
        <div className="mt-4 flex gap-4 justify-between col-span-2">
         
        </div>
      </form>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        <Link to="/TreatmentPlan">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]">
            <p className="flex">Back</p>
          </Button>
        </Link>

        <Button
          type="submit"
          className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[27%]"
        >
          <p className="flex">Save</p>
        </Button>
      </div>
    </div>
  );
};

export default AddTreatmentPlan;
