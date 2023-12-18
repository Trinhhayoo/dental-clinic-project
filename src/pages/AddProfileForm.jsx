import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const AddProfile = () => {
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        P_ID:'',
        P_NAME: '',
        P_GENDER:'',
        P_AGE:'',
        P_PHONE:'',
        P_ADDRESS:'',
        P_EMAIL: '',
        P_ALLERGY:'',
        P_TOTAL:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Patient Data:', patientData);
        navigate("/patient")
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-center text-black font-bold mb-4">Add Patient Profile</h2>
            <form onSubmit={handleSubmit} className='flex flex-wrap'>
                <div className="w-full md:w-1/2 mb-4 pr-2 md:pr-4">
                    <div>
                        <label
                            htmlFor="patientId"
                            className="block mb-2 text-md font-medium text-gray-900">
                                Patient's ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="P_ID"
                            value={patientData.P_ID}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="001"
                            required />
                    </div> 

                    <div>
                        <label
                            htmlFor="gender"
                            className="block mb-2 text-md font-medium text-gray-900" >
                            Gender
                        </label>
                        <select
                            value={patientData.P_GENDER}
                            id="gender"
                            name="P_GENDER"
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label 
                            htmlFor="phone" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="P_PHONE"
                            value={patientData.P_PHONE}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="0987654321"
                            required />
                    </div>

                    <div>
                        <label 
                            htmlFor="email" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="P_EMAIL"
                            value={patientData.P_EMAIL}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="dental-clinic@gmail.com"
                            required />
                    </div>

                    <div>
                        <label 
                            htmlFor="total" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Total Paid
                        </label>
                        <input
                            type="text"
                            id="total"
                            name="P_TOTAL"
                            value={patientData.P_TOTAL}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                    </div>
                </div>

                <div className="w-full md:w-1/2 mb-4 pr-2 md:pr-4">
                    <div>
                        <label 
                            htmlFor="name" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Patient's Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="P_NAME"
                            value={patientData.P_NAME}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nguyen Van A"
                            required />
                    </div>

                    <div>
                        <label 
                            htmlFor="age" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Patient's Age
                        </label>
                        <input
                            type="text"
                            id="age"
                            name="P_AGE"
                            value={patientData.P_AGE}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="20"
                            required />
                    </div>

                    <div>
                        <label 
                            htmlFor="address" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="P_ADDRESS"
                            value={patientData.P_ADDRESS}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="227 Nguyen Van Cu"
                            required />
                    </div>

                    <div>
                        <label 
                            htmlFor="allergy" 
                            className="block mb-2 text-md font-medium text-gray-900">
                            Allergy
                        </label>
                        <input
                            type="text"
                            id="allergy"
                            name="P_ALLERGY"
                            value={patientData.P_ALLERGY}
                            onChange={handleInputChange}
                            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                    </div>
                </div>

                <div className='text-center w-full mt-2'>
                    <Button type="submit" className="border-none bg-purple-500 py-2 px-4 text-center">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProfile;