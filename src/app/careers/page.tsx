// 'use client';

// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
// import { DM_Sans } from 'next/font/google';
// import Link from 'next/link';

// import Footer from '@/app/Components/footer';
// import Navbar from '@/app/Components/navbar';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// // ─── Types ──────────────────────────────────────────────────
// interface JobOpening {
//   id: number;
//   job_title: string;
//   department: string;
//   location: string;
//   employment_type: string;
//   experience_level: string;
//   job_description: string;
//   responsibilities: string;
//   requirements: string;
//   posted_date: string;
//   application_deadline?: string | null;
// }

// export default function CurrentOpenings() {
//   const [mounted, setMounted] = useState(false);
//   const [jobs, setJobs] = useState<JobOpening[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     let isMounted = true;

//     const fetchJobs = async () => {
//       try {
//         const res = await fetch('/api/job-openings', {
//           method: 'GET',
//           cache: 'no-store',
//         });

//         const raw = await res.text();
//         let data: any = {};
//         try {
//           data = raw ? JSON.parse(raw) : {};
//         } catch {
//           console.error('Non-JSON response:', raw);
//           return;
//         }

//         if (!res.ok) {
//           console.error('API error:', data.error || res.statusText);
//           return;
//         }

//         if (isMounted && Array.isArray(data.jobs)) {
//           setJobs(data.jobs);
//         }
//       } catch (err) {
//         console.error('Failed to fetch jobs:', err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchJobs();

//     return () => {
//       isMounted = false;
//     };
//   }, [mounted]);

//   const toggleJobDetails = (id: number) => {
//     setExpandedJobId(expandedJobId === id ? null : id);
//   };

//   return (
//     <>
//       <Navbar />

//       <main className={`min-h-screen bg-white ${dmsans.className}`}>
//         <div className="container mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24">
//           {/* Heading */}
//           <div className="text-center mb-12 md:mb-16">
//             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
//               Current Openings
//             </h3>
//             <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
//               Explore career opportunities and grow with us.
//             </p>
//           </div>

//           {/* Job List */}
//           {!mounted ? (
//             <div className="space-y-3 mx-auto w-full max-w-4xl">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-200 rounded-md overflow-hidden w-full"
//                 >
//                   <div className="flex justify-between items-center p-4">
//                     <div className="h-4 w-1/2 bg-gray-200 rounded" />
//                     <div className="h-3 w-3 bg-gray-200 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : loading ? (
//             <div className="space-y-3 mx-auto w-full max-w-4xl">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-200 rounded-md overflow-hidden w-full animate-pulse"
//                 >
//                   <div className="flex justify-between items-center p-4">
//                     <div className="h-4 w-1/2 bg-gray-200 rounded" />
//                     <div className="h-3 w-3 bg-gray-200 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : jobs.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-sm sm:text-base">
//                 Currently no job openings available.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3 mx-auto w-full max-w-4xl">
//               {jobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className="border border-gray-200 rounded-md overflow-hidden w-full transition-all duration-300 hover:shadow-md hover:border-[#009E4D]/30"
//                 >
//                   {/* Header — clickable */}
//                   <div
//                     className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                     onClick={() => toggleJobDetails(job.id)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) =>
//                       e.key === 'Enter' && toggleJobDetails(job.id)
//                     }
//                   >
//                     <h2 className="text-base sm:text-lg font-bold text-gray-900">
//                       {job.job_title}
//                     </h2>
//                     {expandedJobId === job.id ? (
//                       <FaChevronUp className="text-[#009E4D] text-sm" />
//                     ) : (
//                       <FaChevronDown className="text-[#009E4D] text-sm" />
//                     )}
//                   </div>

//                   {/* Body — expanded */}
//                   {expandedJobId === job.id && (
//                     <div className="p-4 pt-3 border-t border-gray-100 space-y-4">
//                       <div className="grid grid-cols-1 gap-3">
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Department:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700">
//                             {job.department}
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Location:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700">
//                             {job.location}
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Job Type:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700">
//                             {job.employment_type}
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Experience Level:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700">
//                             {job.experience_level}
//                           </p>
//                         </div>
//                       </div>

//                       {job.job_description && (
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Job Description:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
//                             {job.job_description}
//                           </p>
//                         </div>
//                       )}

//                       {job.responsibilities && (
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Responsibilities:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
//                             {job.responsibilities}
//                           </p>
//                         </div>
//                       )}

//                       {job.requirements && (
//                         <div>
//                           <h3 className="text-base font-bold text-black">
//                             Requirements:
//                           </h3>
//                           <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
//                             {job.requirements}
//                           </p>
//                         </div>
//                       )}

//                       {/* Footer row */}
//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pt-2">
//                         <div className="text-sm font-medium text-gray-600">
//                           {job.posted_date && (
//                             <div>
//                               Posted:{' '}
//                               {new Date(job.posted_date).toLocaleDateString(
//                                 'en-US',
//                                 {
//                                   year: 'numeric',
//                                   month: 'short',
//                                   day: 'numeric',
//                                 }
//                               )}
//                             </div>
//                           )}
//                           {job.application_deadline && (
//                             <div>
//                               Apply by:{' '}
//                               {new Date(
//                                 job.application_deadline
//                               ).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                               })}
//                             </div>
//                           )}
//                         </div>

//                         <Link
//                           href={`/careers/apply-now?job=${encodeURIComponent(
//                             job.job_title
//                           )}`}
//                           className="group px-4 py-2 bg-[#009E4D] hover:bg-[#0B1D2C] text-white text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 sm:ml-auto"
//                         >
//                           APPLY NOW
//                           <FaArrowRight
//                             className="group-hover:text-white transition-transform"
//                             size={10}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

import Footer from '@/app/Components/footer';
import Navbar from '@/app/Components/navbar';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// ─── Types ──────────────────────────────────────────────────
interface JobOpening {
  id: number;
  job_title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  job_description: string;
  responsibilities: string;
  requirements: string;
  posted_date: string;
  application_deadline?: string | null;
}

// ✅ API response type (replaces `any`)
type JobsApiResponse = {
  jobs?: JobOpening[];
  error?: string;
};

export default function CurrentOpenings() {
  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/job-openings', {
          method: 'GET',
          cache: 'no-store',
        });

        const raw = await res.text();

        // ✅ Typed instead of any
        let data: JobsApiResponse = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          console.error('Non-JSON response:', raw);
          return;
        }

        if (!res.ok) {
          console.error('API error:', data.error || res.statusText);
          return;
        }

        if (isMounted && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [mounted]);

  const toggleJobDetails = (id: number) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <>
      <Navbar />

      <main className={`min-h-screen bg-white ${dmsans.className}`}>
        <div className="container mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
              Current Openings
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Explore career opportunities and grow with us.
            </p>
          </div>

          {/* Job List */}
          {!mounted ? (
            <div className="space-y-3 mx-auto w-full max-w-4xl">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-md overflow-hidden w-full"
                >
                  <div className="flex justify-between items-center p-4">
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    <div className="h-3 w-3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="space-y-3 mx-auto w-full max-w-4xl">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-md overflow-hidden w-full animate-pulse"
                >
                  <div className="flex justify-between items-center p-4">
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    <div className="h-3 w-3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">
                Currently no job openings available.
              </p>
            </div>
          ) : (
            <div className="space-y-3 mx-auto w-full max-w-4xl">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-md overflow-hidden w-full transition-all duration-300 hover:shadow-md hover:border-[#009E4D]/30"
                >
                  {/* Header — clickable */}
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleJobDetails(job.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && toggleJobDetails(job.id)
                    }
                  >
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      {job.job_title}
                    </h2>
                    {expandedJobId === job.id ? (
                      <FaChevronUp className="text-[#009E4D] text-sm" />
                    ) : (
                      <FaChevronDown className="text-[#009E4D] text-sm" />
                    )}
                  </div>

                  {/* Body — expanded */}
                  {expandedJobId === job.id && (
                    <div className="p-4 pt-3 border-t border-gray-100 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Department:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700">
                            {job.department}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Location:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700">
                            {job.location}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Job Type:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700">
                            {job.employment_type}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Experience Level:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700">
                            {job.experience_level}
                          </p>
                        </div>
                      </div>

                      {job.job_description && (
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Job Description:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
                            {job.job_description}
                          </p>
                        </div>
                      )}

                      {job.responsibilities && (
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Responsibilities:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
                            {job.responsibilities}
                          </p>
                        </div>
                      )}

                      {job.requirements && (
                        <div>
                          <h3 className="text-base font-bold text-black">
                            Requirements:
                          </h3>
                          <p className="text-sm pt-1 font-medium text-gray-700 whitespace-pre-line">
                            {job.requirements}
                          </p>
                        </div>
                      )}

                      {/* Footer row */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pt-2">
                        <div className="text-sm font-medium text-gray-600">
                          {job.posted_date && (
                            <div>
                              Posted:{' '}
                              {new Date(job.posted_date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </div>
                          )}
                          {job.application_deadline && (
                            <div>
                              Apply by:{' '}
                              {new Date(
                                job.application_deadline
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/careers/apply-now?job=${encodeURIComponent(
                            job.job_title
                          )}`}
                          className="group px-4 py-2 bg-[#009E4D] hover:bg-[#0B1D2C] text-white text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 sm:ml-auto"
                        >
                          APPLY NOW
                          <FaArrowRight
                            className="group-hover:text-white transition-transform"
                            size={10}
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}