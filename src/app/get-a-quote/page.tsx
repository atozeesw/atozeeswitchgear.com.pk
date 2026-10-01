'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DM_Sans } from 'next/font/google';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import { FiUploadCloud, FiX, FiFile } from 'react-icons/fi';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// ✅ API response type (replaces `any`)
type InquiryApiResponse = {
  error?: string;
  success?: boolean;
  message?: string;
  inquiry?: {
    id?: number;
    full_name?: string;
    email_address?: string;
    [key: string]: unknown;
  };
};

// ✅ Inner component that uses useSearchParams (needs Suspense wrapper)
function InquiriesForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // ✅ FIX: searchParams null ho sakta hai → optional chaining use karo
  const productFromUrl = searchParams?.get('product') || '';

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryAbout: productFromUrl, // ✅ pre-filled with product name
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ✅ Update inquiryAbout when URL param changes
  useEffect(() => {
    if (productFromUrl) {
      setFormData((prev) => ({
        ...prev,
        inquiryAbout: productFromUrl,
      }));
    }
  }, [productFromUrl]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('companyName', formData.companyName.trim());
      payload.append('email', formData.email.toLowerCase().trim());
      payload.append('phone', formData.phone.trim());
      payload.append('inquiryAbout', formData.inquiryAbout.trim());
      payload.append('message', formData.message.trim());
      files.forEach((file) => payload.append('documents', file));

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        body: payload,
      });

      const text = await res.text();

      // ✅ Typed instead of any
      let data: InquiryApiResponse = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        console.error('Non-JSON response:', text);
        setErrorMsg('Server error. Please check terminal.');
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Submission failed.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg(
        'Inquiry submitted successfully! We will get back to you soon.'
      );

      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        inquiryAbout: '',
        message: '',
      });
      setFiles([]);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500';

  return (
    <div
      className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
    >
      <div className="w-full max-w-xl">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
          Get a Quote
        </h1>
        <p className="text-center text-sm text-gray-600 mb-10">
          Fill in the details below and our team will reach out to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className={inputClass}
            />
          </div>

          {/* Company Name */}
          <div>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputClass}
            />
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className={inputClass}
            />
          </div>

          {/* ✅ Inquiry About — pre-filled with product name from URL */}
          <div>
            <input
              type="text"
              name="inquiryAbout"
              value={formData.inquiryAbout}
              onChange={handleChange}
              placeholder="Inquiry About"
              required
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-sm px-4 py-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#009E4D] transition-colors bg-white"
            >
              <FiUploadCloud className="w-7 h-7 text-[#009E4D] mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Click to upload{' '}
                <span className="text-[#009E4D] font-medium">files</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, JPG, PNG (multiple allowed)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
              />
            </div>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-sm px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FiFile className="w-4 h-4 text-[#009E4D] shrink-0" />
                      <span className="text-sm text-gray-700 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors shrink-0 ml-2"
                      aria-label={`Remove ${file.name}`}
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
          )}

          {/* Success message */}
          {successMsg && (
            <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
              {successMsg}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#009E4D] hover:bg-black'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT INQUIRY'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ Main page with Suspense wrapper (required for useSearchParams in Next.js 14+)
export default function GetAQuotePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading form...</p>
          </div>
        }
      >
        <InquiriesForm />
      </Suspense>
      <Footer />
    </>
  );
}