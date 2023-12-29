import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import requestData from '../assets/request.json';
import { Button } from '@material-tailwind/react';

const RequestDetail = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const selectedRequest = requestData.find(
      (request) => request.REQUEST_ID === parseInt(requestId)
    );
    setRequest(selectedRequest);
  }, [requestId]);

  if (!request) {
    return <p>Loading...</p>;
  }

  const renderDetailField = (label, value) => (
    <div key={label} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <p className="mt-1 p-2 border rounded-md">{value}</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Request Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Patient ID', request.RQ_PATIENT_ID)}
          {renderDetailField('Date and Time', request.RQ_DATE_TIME + ' ' + request.RQ_TIME)}
          {renderDetailField('Note', request.RQ_NOTE)}
          {renderDetailField('Phone', request.RQ_PHONE)}
        </div>
        <div>
          {renderDetailField('Status', request.RQ_STATUS)}
          {/* Add other fields as needed */}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        <Link to={`/EditRequestForm/${request.REQUEST_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        <Link to="/Request">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RequestDetail;
