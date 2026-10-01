// src/app/Components/ProjectInquiryForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

interface ProjectInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialInquiry?: string;
  readOnlyInquiry?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

// ✅ Field class — focus pe GREEN only
const fieldClass =
  'w-full px-3.5 py-2 text-xs sm:text-sm text-black font-normal tracking-wider border-2 border-gray-200 focus:border-[#009E4D] focus:ring-0 focus:outline-none transition-colors bg-white placeholder:tracking-wider placeholder:font-light placeholder:text-gray-400';

export default function ProjectInquiryForm({
  isOpen,
  onClose,
  initialInquiry = '',
  readOnlyInquiry = false,
}: ProjectInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryAbout: initialInquiry,
    message: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      inquiryAbout: initialInquiry,
    }));
  }, [initialInquiry]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          inquiryAbout: initialInquiry,
          message: '',
        });
        setFiles([]);
        setFileError('');
        setSubmitStatus({ type: null, message: '' });
      }, 300);
    }
  }, [isOpen, initialInquiry]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selected = Array.from(e.target.files || []);

    if (files.length + selected.length > MAX_FILES) {
      setFileError(`You can upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    const validFiles: File[] = [];
    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`"${file.name}" is larger than 5MB.`);
        return;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        setFileError(`"${file.name}" has an unsupported file type.`);
        return;
      }
      if (files.some((f) => f.name === file.name && f.size === file.size)) {
        setFileError(`"${file.name}" is already added.`);
        return;
      }
      validFiles.push(file);
    }

    setFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return '📄';
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('word')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    return '📎';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // ✅ FormData banao — files bhi bhejni hain
      const fd = new FormData();
      fd.append('full_name', formData.name);
      fd.append('company_name', formData.company);
      fd.append('email_address', formData.email);
      fd.append('phone_number', formData.phone);
      fd.append('inquiry_about', formData.inquiryAbout);
      fd.append('message', formData.message);

      // ✅ Attach files
      files.forEach((file) => {
        fd.append('files', file);
      });

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        body: fd,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message:
            result.message ||
            'Thank you for your inquiry! Our team will contact you shortly.',
        });
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          inquiryAbout: initialInquiry,
          message: '',
        });
        setFiles([]);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Submission failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[9999] overflow-y-auto ${dmsans.className}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-5xl transform overflow-hidden bg-white rounded-2xl shadow-2xl transition-all border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 sm:px-8 py-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-black tracking-widest">
                  {formData.inquiryAbout.includes('Demo')
                    ? 'REQUEST A DEMO'
                    : 'GET A QUOTE'}
                </h3>
                <p className="text-gray-500 text-[11px] sm:text-xs font-light mt-0.5 tracking-wider">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200 shrink-0"
                aria-label="Close"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT COLUMN */}
                <div className="space-y-3.5">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                        Full Name <span className="text-[#009E4D]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="Your company"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                        Email Address <span className="text-[#009E4D]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="Email Address"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="+92 3XX XXXXXXX"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Inquiry About */}
                  <div>
                    <label htmlFor="inquiryAbout" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                      Inquiry About <span className="text-[#009E4D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiryAbout"
                      name="inquiryAbout"
                      value={formData.inquiryAbout}
                      onChange={handleChange}
                      readOnly={readOnlyInquiry}
                      className={`${fieldClass} ${
                        readOnlyInquiry ? 'bg-gray-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="What is your inquiry about?"
                      required
                      disabled={isSubmitting || readOnlyInquiry}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                      Message <span className="text-[#009E4D]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${fieldClass} resize-none`}
                      placeholder="Please provide details about your inquiry..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-3.5">
                  {/* File Upload Section */}
                  <div>
                    <label className="block text-[11px] font-light text-gray-600 mb-1 tracking-wider uppercase">
                      Attachments{' '}
                      <span className="text-gray-400 font-light tracking-wider normal-case">
                        (Optional — Max {MAX_FILES} files, 5MB each)
                      </span>
                    </label>

                    {/* Upload Box */}
                    <div
                      onClick={() => !isSubmitting && fileInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center gap-1.5 w-full px-4 py-5 border-2 border-dashed cursor-pointer transition-all duration-200 ${
                        isSubmitting
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          : 'border-gray-300 bg-gray-50 hover:border-[#009E4D] hover:bg-[#009E4D]/5'
                      }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200">
                        <FiUpload className="w-4 h-4 text-[#009E4D]" />
                      </div>
                      <p className="text-[11px] sm:text-xs font-light text-black tracking-wider">
                        Click to upload files
                      </p>
                      <p className="text-[10px] text-gray-500 font-light tracking-wider">
                        PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isSubmitting}
                    />

                    {/* File Error */}
                    {fileError && (
                      <p className="mt-1.5 text-[11px] text-red-600 font-light tracking-wider">
                        {fileError}
                      </p>
                    )}

                    {/* Selected Files List */}
                    {files.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5 max-h-40 overflow-y-auto">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm shrink-0">
                                {getFileIcon(file.type)}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-light text-black truncate tracking-wider">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-gray-500 font-light tracking-wider">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              disabled={isSubmitting}
                              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              aria-label={`Remove ${file.name}`}
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <div
                      className={`p-3 rounded-lg text-[11px] font-light tracking-wider border-2 ${
                        submitStatus.type === 'success'
                          ? 'bg-[#009E4D]/10 text-[#009E4D] border-[#009E4D]'
                          : 'bg-red-50 text-red-600 border-red-500'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {submitStatus.type === 'success' ? (
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                        <span>{submitStatus.message}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons — LEFT SIDE */}
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-start gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-5 py-2 text-[11px] font-light text-black bg-transparent border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200 uppercase tracking-widest"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-5 py-2 text-[11px] font-light rounded-full transition-all duration-200 uppercase tracking-widest inline-flex items-center justify-center gap-2 border-2 ${
                        isSubmitting
                          ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                          : 'bg-[#009E4D] border-[#009E4D] text-white hover:bg-black hover:border-black'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-3.5 w-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        'SEND INQUIRY'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}