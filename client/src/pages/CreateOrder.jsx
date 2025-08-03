import React, { useRef } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import { UploadCloud } from 'lucide-react';


const CreateOrder = () => {

  const { register, handleSubmit, reset,
    formState: { errors }, setValue } = useForm();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const onSubmit = async (data) => {
    setUploading(true);
    
    const file = data.invoice[0];
    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const cloudinaryRes = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
    const invoiceUrl = cloudinaryRes.data.secure_url;
    //console.log("PDF uploaded successfully:", invoiceUrl);
    const orderId = uuidv4();

    const order = {
      orderId,
      customerName: data.customerName,
      orderAmount: parseFloat(data.orderAmount),
      invoiceFileUrl: invoiceUrl,
      orderDate: new Date().toISOString(),
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/order`, order);
      if (response.status === 200 || response.status === 201) {
        toast.success("Order created successfully!");
        //console.log("Order created:", response.data);
        reset();
        navigate("/");
      } else {
        toast.error("❗Unexpected response.try again.");
        //console.warn("Unexpected status:", response.status);
      }

    } catch (error) {
      //console.error("Order creation failed:", error);
      toast.error("Failed to create order");
    } finally {
      setUploading(false);
    }
  };
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setValue("invoice", [file], { shouldValidate: true });
      setFileName(file.name);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Create New Order</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Customer Name */}
        <div>
          <input
            {...register("customerName", { required: "Customer name is required" })}
            placeholder="Customer Name"
            className="input input-bordered w-full"
          />
          {errors.customerName && (
            <p className="text-red-600 text-sm mt-1">{errors.customerName.message}</p>
          )}
        </div>

        {/* Order Amount */}
        <div>
          <input
            type="number"
            step="0.01"
            {...register("orderAmount", { required: "Order amount is required" })}
            placeholder="Order Amount"
            className="input input-bordered w-full"
          />
          {errors.orderAmount && (
            <p className="text-red-600 text-sm mt-1">{errors.orderAmount.message}</p>
          )}
        </div>

        {/* Invoice Upload */}
        <div>
          <input
            type="file"
            accept="application/pdf"
            {...register("invoice", { required: "Invoice PDF is required" })}
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
              }
            }}
          />

          <div
            className={`w-full border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-400 hover:border-blue-400"}
        `}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-gray-600">
              <strong>Click to choose</strong> or drag & drop your invoice PDF
            </p>
            {fileName && <p className="mt-2 text-green-600">{fileName}</p>}
          </div>

          {errors.invoice && (
            <p className="text-red-600 text-sm mt-2">{errors.invoice.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-secondary w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Order"}
        </button>
      </form>
    </div>
  )
}

export default CreateOrder