'use client'

import React, { useState, useRef, Suspense } from 'react'
import { FaArrowRight, FaUpload, FaSpinner } from 'react-icons/fa'
import { DM_Sans } from 'next/font/google'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'
import { useSearchParams, useRouter } from 'next/navigation'

const dmsans = DM_Sans({ subsets: ['latin'], weight: '700' })

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  city: string
  comments: string
}

function ApplyNowForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobTitle = searchParams?.get('job') ?? ''
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string>('Choose file...')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    comments: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setSelectedFileName('Choose file...')
      return
    }

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOC/DOCX file')
      setSelectedFileName('Choose file...')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB')
      setSelectedFileName('Choose file...')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setSelectedFileName(file.name)
    setError(null)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formEl = formRef.current
    if (!formEl || !fileInputRef.current?.files?.[0]) {
      setError('Please complete the form and upload a resume')
      setIsSubmitting(false)
      return
    }

    const data = new FormData(formEl)
    data.append('jobTitle', decodeURIComponent(jobTitle))

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: data,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to submit application')
      }

      // ✅ Success — show message
      setSubmitted(true)
      formEl.reset()
      setSelectedFileName('Choose file...')
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        city: '',
        comments: '',
      })

      // ✅ Redirect to /careers after showing success message
      setTimeout(() => {
        router.push('/careers')
      }, 2000)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while submitting your application'
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen bg-white relative ${dmsans.className} tracking-wide`}>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {jobTitle
            ? `Apply for ${decodeURIComponent(jobTitle)}`
            : 'Application Form'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
          className="space-y-4 w-full pt-4"
        >
          <input
            type="hidden"
            name="jobTitle"
            value={decodeURIComponent(jobTitle)}
          />

          <div className="grid grid-cols-1 gap-3 w-full">
            <input
              type="text"
              name="name"
              required
              placeholder="Name*"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            />

            <input
              type="text"
              name="jobTitleDisplay"
              value={decodeURIComponent(jobTitle)}
              readOnly
              placeholder="Job Title*"
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg bg-gray-100 tracking-wide outline-none"
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder="Contact No*"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            />

            <input
              type="text"
              name="company"
              required
              placeholder="Company/Reference*"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            />

            <input
              type="text"
              name="city"
              required
              placeholder="City*"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            />
          </div>

          <div className="w-full tracking-wide">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload CV (PDF/DOC/DOCX, max 5MB)*
            </label>
            <label className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between px-4 py-3 text-sm border-2 border-dashed border-[#009E4D] rounded-lg bg-white hover:bg-[#009E4D]/5 transition">
                <span
                  className={`truncate ${
                    selectedFileName !== 'Choose file...'
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {selectedFileName}
                </span>
                <FaUpload className="text-[#009E4D] text-sm" />
              </div>
              <input
                type="file"
                name="cv"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
            </p>
          </div>

          <div className="w-full tracking-wide">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              name="comments"
              rows={4}
              placeholder="Tell us why you'd be a great fit..."
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm text-black border border-gray-300 rounded-lg tracking-wide focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white"
            ></textarea>
          </div>

          <div className="pt-2 w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 text-sm bg-[#009E4D] text-white font-bold rounded-lg hover:bg-[#0B1D2C] transition duration-300 flex items-center justify-center gap-2 tracking-wide ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  Submitting...
                </>
              ) : (
                <>
                  SUBMIT APPLICATION
                  <FaArrowRight size={12} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success message — top center, sabse upar */}
      {submitted && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999999] w-[90%] max-w-md">
          <div className="bg-[#009E4D] text-white font-medium py-3 px-4 rounded-lg shadow-lg text-sm text-center tracking-wide">
             Application submitted successfully! 
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function ApplyNowPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading form...</div>}>
      <ApplyNowForm />
    </Suspense>
  )
}