import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import paymentData from '../assets/payment.json'; 
import { Button } from '@material-tailwind/react';

const EditPaymentForm = () => {
    const { paymentID } = useParams();
    const [payment, setPayment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedPayment = paymentData.find(
            (payment) => payment.PM_TREATMENT_PLAN_ID === parseInt(paymentID)
        );
        setPayment(selectedPayment);
    }, [paymentID]);

    const handleInputChange = (fieldName, value) => {
        setPayment({
            ...payment,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated payment:', payment);
        navigate('/Payment');
    };

    const renderInputField = (fieldName, label) => (
        <div key={fieldName} className="mb-">
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <input
                type="text"
                value={payment[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
    );

    if (!payment) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-4 max-w-md mx-auto">
            <h2 className="text-center font-bold mb-4">Edit Payment {payment.PM_TREATMENT_PLAN_ID}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="">
                    {renderInputField('PM_TREATMENT_PLAN_ID', 'ID')}
                    {renderInputField('PAYER', 'Payer')}
                    {renderInputField('PAID_MONEY', 'Paid Money')}
                    {renderInputField('TYPE_PAY', 'Type Pay')}
                    {renderInputField('PAYMENT_NOTE', 'Note')}
                </div>

                <div className="">
                    {renderInputField('PAYMENT_DATE', 'Payment Date')}
                    {renderInputField('PAYER_PHONENUMBER', 'Phone Number')}
                    {renderInputField('EXCESS_MONEY', 'Excess Money')}
                    {renderInputField('PAYMENT_STATUS', 'Status')}
                </div>

                <div className="mt-4 flex gap-4 justify-between">
                    <Link to="/payment">
                        <Button
                            className="text-center border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
                        >
                            <p className="flex">Back</p>
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        className="text-center border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
                    >
                        <p className="flex">Save</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditPaymentForm;