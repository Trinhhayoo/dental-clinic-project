import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import paymentData from '../assets/payment.json';
import { Button } from '@material-tailwind/react';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';

import { useDispatch, useSelector } from "react-redux";

const EditPaymentForm = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedPayment = paymentData.find(
      (payment) => payment.PAYMENT_ID === parseInt(paymentId)
    );
    setPayment(selectedPayment);
  }, [paymentId]);

  const handleInputChange = (fieldName, value) => {
    setPayment({
      ...payment,
      [fieldName]: value,
    });
  };

  const handlePaymentMethodSelect = (paymentMethod) => {
    setPayment({
      ...payment,
      TYPE_PAY: paymentMethod,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated payment:', payment);
    // Add logic to update data or dispatch actions if using Redux
  };

  const renderInputField = (fieldName, label) => (
    <div key={fieldName} className="mb-3">
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
    <div className="flex flex-col items-center">
      <h2 className="mt-4 font-bold text-xl">Edit Payment {payment.PAYMENT_ID}</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
        {renderInputField('PM_TREATMENT_PLAN_ID', 'Treatment Plan ID')}
        {renderInputField('PAYMENT_DATE', 'Payment Date')}
        {renderInputField('PAYER', 'Payer')}
        {renderInputField('PAYER_PHONENUMBER', 'Payer Phone Number')}
        {renderInputField('PAID_MONEY', 'Paid Money')}
        {renderInputField('EXCESS_MONEY', 'Excess Money')}
        {renderInputField('PAYMENT_STATUS', 'Payment Status')}
        {renderInputField('PAYMENT_NOTE', 'Payment Note')}

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Payment Method:</label>
          <div className="flex gap-2 mt-1">
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect('Cash')}
              className={`${
                payment.TYPE_PAY === 'Cash' ? 'bg-purple-500 text-white' : 'bg-white text-black'
              } p-2 rounded-md flex items-center`}
            >
              <GiReceiveMoney className="mr-2" />
              Cash
            </Button>
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect('Credit Card')}
              className={`${
                payment.TYPE_PAY === 'Credit Card' ? 'bg-purple-500 text-white' : 'bg-white text-black'
              } p-2 rounded-md flex items-center`}
            >
              <MdAttachMoney className="mr-2" />
              Credit Card
            </Button>
          </div>
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Button
            onClick={() => navigate(-1)}
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]"
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

export default EditPaymentForm;
