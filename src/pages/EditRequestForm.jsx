import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import requestData from '../assets/request.json';
import { Button } from '@material-tailwind/react';

const EditRequestForm = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedRequest = requestData.find(
      (request) => request.REQUEST_ID === parseInt(requestId)
    );
    setRequest(selectedRequest);
  }, [requestId]);

  const handleInputChange = (fieldName, value) => {
    setRequest({
      ...request,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated request:', request);
    // Add logic to update data or dispatch actions if using Redux
  };

  const renderInputField = (fieldName, label) => (
    <div key={fieldName} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <input
        type="text"
        value={request[fieldName] || ''}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );

  if (!request) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 font-bold text-xl">Edit Request {request.REQUEST_ID}</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
        {renderInputField('RQ_PATIENT_ID', 'Patient ID')}
        {renderInputField('RQ_DATE_TIME', 'Date and Time')}
        {renderInputField('RQ_TIME', 'Time')}
        {renderInputField('RQ_NOTE', 'Note')}
        {renderInputField('RQ_PHONE', 'Phone')}
        {renderInputField('RQ_STATUS', 'Status')}
        {/* Add other fields as needed */}
        
        <div className="mt-4 flex gap-4 justify-between">
          <Button
            onClick={() => navigate(-1)}
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
          >
            <p className="flex">Back</p>
          </Button>

          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]"
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditRequestForm;
