import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AddTreatmentPlan = () => {
  // State to manage form data
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    TREATMENT_PLAN_ID: '',
    TP_PATIENT_ID: patientId,
    TP_DENTIST_ID: '',
    TP_PRESCRIPTION: '',
    TP_ASSISTANT_ID: '',
    TP_NOTE: '',
    TP_STATUS: '',
    TP_TREATMENT_ID: ''
    // Add more fields as needed
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data
    console.log('Form data submitted:', formData);
    // You can add logic to send the data to your backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Treatment Plan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="treatmentPlanID" className="block text-sm font-medium text-gray-700">
            Treatment Plan ID:
          </label>
          <input
            type="text"
            id="treatmentPlanID"
            name="TREATMENT_PLAN_ID"
            value={formData.TREATMENT_PLAN_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">
            Dentist ID:
          </label>
          <input
            type="text"
            id="dentistID"
            name="TP_DENTIST_ID"
            value={formData.TP_DENTIST_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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
          <input
            type="text"
            id="assistantID"
            name="TP_ASSISTANT_ID"
            value={formData.TP_ASSISTANT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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

        <div>
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
        </div>

        <div>
          <label htmlFor="treatmentID" className="block text-sm font-medium text-gray-700">
            Treatment ID:
          </label>
          <input
            type="text"
            id="treatmentID"
            name="TP_TREATMENT_ID"
            value={formData.TP_TREATMENT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Add more fields as needed */}

        <div className="mt-4 flex gap-4 justify-between col-span-2">
        </div>
      </form>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        <Link to="/TreatmentPlan">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]">
            <p className="flex">Back</p>
          </Button>
        </Link>

        <Link to="/SearchPatient">
          <Button className="border-none bg-purple-500 py-4 px-6 flex items-center gap-2 w-[100%]">
            <p className="flex">Find Patient</p>
          </Button>
        </Link>

        <Button
          type="submit"
          className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
        >
          <p className="flex">Save</p>
        </Button>
      </div>
    </div>
  );
};

export default AddTreatmentPlan;


