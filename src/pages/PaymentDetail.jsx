import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import paymentData from '../assets/payment.json';

const PaymentDetail = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const selectedPayment = paymentData.find(
      (payment) => payment.PAYMENT_ID === parseInt(paymentId)
    );
    setPayment(selectedPayment);
  }, [paymentId]);

  if (!payment) {
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Treatment Plan ID', payment.PM_TREATMENT_PLAN_ID)}
          {renderDetailField('Payment Date', payment.PAYMENT_DATE)}
          {renderDetailField('Payer', payment.PAYER)}
          {renderDetailField('Payer Phone Number', payment.PAYER_PHONENUMBER)}
          {renderDetailField('Paid Money', payment.PAID_MONEY)}
        </div>
        <div>
          {renderDetailField('Excess Money', payment.EXCESS_MONEY)}
          {renderDetailField('Type of Payment', payment.TYPE_PAY)}
          {renderDetailField('Payment Status', payment.PAYMENT_STATUS)}
          {renderDetailField('Payment Note', payment.PAYMENT_NOTE)}
          {/* Add other fields as needed */}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        {/* Add your Link components for different actions */}
        {/* For example, you can link to an Edit page */}
        <Link to={`/EditPaymentForm/${payment.PAYMENT_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        {/* Add other actions as needed */}
        <Link to="/Payment">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentDetail;
