// SearchPatient.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPatient = ({ recentpatient, onPatientFound }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const foundPatient = recentpatient.find(
      (patient) => patient.PP_EMAIL === searchValue || patient.PP_PHONENUMBER === searchValue
    );

    if (foundPatient) {
      onPatientFound(foundPatient.PATIENT_ID);
    } else {
      onPatientFound(null);
    }
  };

  const handleBackToPatient = () => {
    navigate(-1); 
  };

  return (
    <div>
      <form>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900">
          Search Patient:
        </label>
        <div className="flex items-center">
          <input
            type="search"
            id="search"
            className="w-2/5 p-2 border border-gray-300 rounded-lg mr-2"
            placeholder="Patient email or phone"
            onChange={handleSearchChange}
            value={searchValue}
          />
          <button
            type="button"
            className="bg-purple-500 text-white p-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded-md ml-2"
            onClick={handleBackToPatient}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPatient;
