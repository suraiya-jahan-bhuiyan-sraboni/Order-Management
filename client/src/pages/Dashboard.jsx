import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router'

const Dashboard = () => {
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/allorders`).then(res => setOrders(res.data));
    }, []);

    //console.log(orders)
    if (!orders) return <p className="text-center mt-20  text-green-800">Loading...</p>;
    if (orders.length==0) return <p className="text-center mt-20 text-green-800">No Order data found!<br/>Create New Order!</p>;
    return (
        <div className=''>
            <h2 className="text-2xl font-bold my-4">All Orders</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4 mt-4 border">

                <table className="table table-zebra w-full">
                    <thead>
                        <tr className='text-lg text-green-700 '>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>View Invoice</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId} className=''>
                                <td>{order.orderId}</td>
                                <td className='font-bold text-base'>{order.customerName}</td>
                                <td><span className='text-base font-bold text-green-800'>$ </span>{order.orderAmount.toFixed(2)}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <a
                                        href={order.invoiceFileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link link-info"
                                    >
                                        View Invoice
                                    </a>
                                </td>
                                <td>

                                    <Link
                                        to={`/order-details/${order._id}`}
                                        className="btn btn-secondary btn-sm text-xs py-5"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard