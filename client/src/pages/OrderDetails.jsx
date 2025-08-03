import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from "axios";
import { FileDown, UserCircle, CalendarCheck, ReceiptText } from "lucide-react";


const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/order/${id}`).then(res => setOrder(res.data));
  }, [id]);
  //console.log(order)
  const downloadUrl = order?.invoiceFileUrl?.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );

  if (!order) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">Order Details</h2>
        <p className="text-gray-500">Order ID: <span className="font-mono text-sm">{order.orderId}</span></p>
      </div>

      <div className="grid md:grid-cols-2 auto-rows-fr gap-6 items-center">
        {/* Customer Info */}
        <div className="h-full card bg-base-100 shadow-md border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-3">
            <UserCircle className="w-8 h-8 text-secondary" />
            <div>
              <h3 className="text-lg font-semibold">Customer</h3>
              <p className="text-gray-600">{order.customerName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ReceiptText className="w-7 h-7 text-green-800" />
            <div>
              <h3 className="text-lg font-semibold">Order Amount</h3>
              <p className="text-gray-600">${order.orderAmount}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarCheck className="w-7 h-7 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Order Date</h3>
              <p className="text-gray-600">
                {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice */}
        <div className="h-full card bg-base-100 shadow-md border rounded-xl p-6 flex flex-col items-center justify-center">
          <FileDown className="w-12 h-12 text-info mb-2" />
          <h3 className="text-xl font-bold mb-2">Invoice</h3>
          <a
            href={order.invoiceFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-secondary btn-sm mb-4"
          >
            👁️ View Invoice
          </a>
          <a
            href={downloadUrl}
            download
            className="btn btn-outline btn-info btn-sm"
          >
            📄 Download Invoice
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <a href="/" className="btn btn-secondary">← Back to Dashboard</a>
      </div>
    </div>
  )
}

export default OrderDetails