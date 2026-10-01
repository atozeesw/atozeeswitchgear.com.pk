// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import ProtectedRoute from '@/app/Components/ProtectedRoute';
// import { DM_Sans } from 'next/font/google';
// import Link from 'next/link';
// import {
//   FiUsers,
//   FiMail,
//   FiBriefcase,
//   FiMapPin,
//   FiTrendingUp,
//   FiArrowRight,
//   FiRefreshCw,
// } from 'react-icons/fi';
// import AdminSidebar from '@/app/Components/admin';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// type Contact = {
//   id: number;
//   name: string;
//   contact_no: string | null;
//   company: string | null;
//   city: string | null;
//   email: string;
//   comments: string | null;
//   created_at: string;
// };

// export default function AdminDashboardPage() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [fetching, setFetching] = useState(true);
//   const [collapsed, setCollapsed] = useState(false);
//   const [error, setError] = useState('');

//   const fetchContacts = async () => {
//     try {
//       setFetching(true);
//       setError('');

//       const res = await fetch('/api/admin/contacts', {
//         method: 'GET',
//         cache: 'no-store',
//       });

//       const text = await res.text();
//       let data: any = {};
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch {
//         throw new Error('Invalid server response');
//       }

//       if (!res.ok) {
//         throw new Error(data.error || 'Failed to load data');
//       }

//       const list: Contact[] = Array.isArray(data)
//         ? data
//         : Array.isArray(data.contacts)
//           ? data.contacts
//           : [];

//       setContacts(list);
//     } catch (err) {
//       console.error(err);
//       setError(err instanceof Error ? err.message : 'Failed to load data');
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   // ─── Stats ───
//   const stats = useMemo(() => {
//     const now = new Date();
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

//     const total = contacts.length;
//     const thisMonth = contacts.filter(
//       (c) => new Date(c.created_at) >= startOfMonth
//     ).length;

//     const uniqueCompanies = new Set(
//       contacts.map((c) => c.company?.toLowerCase().trim()).filter(Boolean)
//     ).size;

//     const uniqueCities = new Set(
//       contacts.map((c) => c.city?.toLowerCase().trim()).filter(Boolean)
//     ).size;

//     return { total, thisMonth, uniqueCompanies, uniqueCities };
//   }, [contacts]);

//   // ─── Recent 5 contacts ───
//   const recentContacts = useMemo(
//     () =>
//       [...contacts]
//         .sort(
//           (a, b) =>
//             new Date(b.created_at).getTime() -
//             new Date(a.created_at).getTime()
//         )
//         .slice(0, 5),
//     [contacts]
//   );

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return '—';
//     const date = new Date(dateString);
//     const datePart = date.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//     const timePart = date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//     return `${datePart}, ${timePart}`;
//   };

//   const statCards = [
//     {
//       label: 'Total Contacts',
//       value: stats.total,
//       icon: FiUsers,
//     },
//     {
//       label: 'This Month',
//       value: stats.thisMonth,
//       icon: FiTrendingUp,
//     },
//     {
//       label: 'Companies',
//       value: stats.uniqueCompanies,
//       icon: FiBriefcase,
//     },
//     {
//       label: 'Cities',
//       value: stats.uniqueCities,
//       icon: FiMapPin,
//     },
//   ];

//   return (
//     <ProtectedRoute allowedUser='admin'>
//       <div className={`min-h-screen bg-white ${dmsans.className}`}>
//         <AdminSidebar onCollapseChange={setCollapsed} />

//         <main
//           className={`transition-all duration-300 ${
//             collapsed ? 'md:ml-[72px]' : 'md:ml-64'
//           }`}
//         >
//           <div className="w-full px-3 sm:px-5 py-4 sm:py-6">
//             <div className="w-full">
//               {/* HEADER */}
//               <div className="mb-6 flex items-start justify-between gap-3 flex-wrap">
//                 <div className="text-left">
//                   <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
//                     Dashboard
//                   </h1>
//                   <p className="text-xs sm:text-sm text-gray-600">
//                     Overview of your contact submissions.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={fetchContacts}
//                   disabled={fetching}
//                   className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <FiRefreshCw
//                     size={12}
//                     className={fetching ? 'animate-spin' : ''}
//                   />
//                   Refresh
//                 </button>
//               </div>

//               {/* ERROR */}
//               {error && (
//                 <div className="mb-4 px-4 py-3 border border-red-200 bg-red-50 text-xs text-red-700">
//                   {error}
//                 </div>
//               )}

//               {/* STAT CARDS */}
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//                 {statCards.map((card) => {
//                   const Icon = card.icon;
//                   return (
//                     <div
//                       key={card.label}
//                       className="border border-gray-200 bg-white px-4 py-4 hover:border-black transition-colors"
//                     >
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200">
//                           <Icon size={14} />
//                         </div>
//                       </div>
//                       {fetching ? (
//                         <div className="h-7 w-12 bg-gray-200 animate-pulse mb-1" />
//                       ) : (
//                         <p className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-0.5">
//                           {card.value}
//                         </p>
//                       )}
//                       <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
//                         {card.label}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* RECENT CONTACTS */}
//               <div className="border border-gray-200 bg-white overflow-hidden">
//                 <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-200">
//                   <div>
//                     <h2 className="text-sm sm:text-base font-bold text-black tracking-tight">
//                       Recent Contacts
//                     </h2>
//                     <p className="text-[11px] text-gray-500 mt-0.5">
//                       Latest 5 submissions
//                     </p>
//                   </div>

//                   <Link
//                     href="/admin/contacts"
//                     className="flex items-center gap-1.5 text-[11px] font-bold text-black uppercase tracking-wider hover:opacity-70 transition-opacity"
//                   >
//                     View All
//                     <FiArrowRight size={12} />
//                   </Link>
//                 </div>

//                 {fetching ? (
//                   /* SKELETON */
//                   <div className="divide-y divide-gray-100 animate-pulse">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <div
//                         key={i}
//                         className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 items-center"
//                       >
//                         <div className="col-span-4 h-3.5 w-32 bg-gray-200" />
//                         <div className="col-span-4 h-3.5 w-40 bg-gray-200" />
//                         <div className="col-span-4 h-3.5 w-24 bg-gray-200 ml-auto" />
//                       </div>
//                     ))}
//                   </div>
//                 ) : recentContacts.length === 0 ? (
//                   <div className="px-5 py-10 text-center">
//                     <FiMail
//                       size={22}
//                       className="mx-auto text-gray-300 mb-3"
//                     />
//                     <p className="text-xs text-gray-500">
//                       No contacts yet.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-gray-100">
//                     {recentContacts.map((contact) => (
//                       <div
//                         key={contact.id}
//                         className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 items-center hover:bg-gray-50 transition-colors"
//                       >
//                         {/* NAME + EMAIL */}
//                         <div className="col-span-5 sm:col-span-4 min-w-0">
//                           <p className="text-xs font-bold text-black truncate">
//                             {contact.name}
//                           </p>
//                           <p className="text-[11px] text-gray-500 truncate">
//                             {contact.email}
//                           </p>
//                         </div>

//                         {/* COMPANY */}
//                         <div className="col-span-4 sm:col-span-4 min-w-0 hidden sm:block">
//                           {contact.company ? (
//                             <p className="text-[11px] text-gray-700 truncate">
//                               {contact.company}
//                             </p>
//                           ) : (
//                             <span className="text-[11px] text-gray-400">
//                               —
//                             </span>
//                           )}
//                         </div>

//                         {/* DATE */}
//                         <div className="col-span-7 sm:col-span-4 min-w-0 text-right">
//                           <p className="text-[11px] text-gray-500 truncate">
//                             {formatDateTime(contact.created_at)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* QUICK ACTIONS */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
//                 <Link
//                   href="/admin/contacts"
//                   className="group flex items-center justify-between px-5 py-4 border border-gray-200 bg-white hover:border-black hover:bg-black transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors">
//                       <FiMail size={14} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold text-black group-hover:text-white transition-colors">
//                         Manage Contacts
//                       </p>
//                       <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
//                         View, search & delete submissions
//                       </p>
//                     </div>
//                   </div>
//                   <FiArrowRight
//                     size={14}
//                     className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
//                   />
//                 </Link>

//                 <Link
//                   href="/"
//                   className="group flex items-center justify-between px-5 py-4 border border-gray-200 bg-white hover:border-black hover:bg-black transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors">
//                       <FiBriefcase size={14} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold text-black group-hover:text-white transition-colors">
//                         View Website
//                       </p>
//                       <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
//                         Open the public site
//                       </p>
//                     </div>
//                   </div>
//                   <FiArrowRight
//                     size={14}
//                     className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useEffect, useState, useMemo } from 'react';
import ProtectedRoute from '@/app/Components/ProtectedRoute';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';
import {
  FiUsers,
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiTrendingUp,
  FiArrowRight,
  FiRefreshCw,
} from 'react-icons/fi';
import AdminSidebar from '@/app/Components/admin';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type Contact = {
  id: number;
  name: string;
  contact_no: string | null;
  company: string | null;
  city: string | null;
  email: string;
  comments: string | null;
  created_at: string;
};

// ✅ Typed API response (replaces `any`)
type ApiError = { error?: string };
type ContactsApiResponse =
  | Contact[]
  | { contacts?: Contact[] }
  | ApiError;

export default function AdminDashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [fetching, setFetching] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      setFetching(true);
      setError('');

      const res = await fetch('/api/admin/contacts', {
        method: 'GET',
        cache: 'no-store',
      });

      const text = await res.text();

      // ✅ Typed instead of any
      let data: ContactsApiResponse = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error('Invalid server response');
      }

      if (!res.ok) {
        const errMsg =
          data && !Array.isArray(data) && 'error' in data
            ? data.error
            : undefined;
        throw new Error(errMsg || 'Failed to load data');
      }

      const list: Contact[] = Array.isArray(data)
        ? data
        : data &&
            typeof data === 'object' &&
            'contacts' in data &&
            Array.isArray(data.contacts)
          ? data.contacts
          : [];

      setContacts(list);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ─── Stats ───
  const stats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const total = contacts.length;
    const thisMonth = contacts.filter(
      (c) => new Date(c.created_at) >= startOfMonth
    ).length;

    const uniqueCompanies = new Set(
      contacts.map((c) => c.company?.toLowerCase().trim()).filter(Boolean)
    ).size;

    const uniqueCities = new Set(
      contacts.map((c) => c.city?.toLowerCase().trim()).filter(Boolean)
    ).size;

    return { total, thisMonth, uniqueCompanies, uniqueCities };
  }, [contacts]);

  // ─── Recent 5 contacts ───
  const recentContacts = useMemo(
    () =>
      [...contacts]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 5),
    [contacts]
  );

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timePart = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${datePart}, ${timePart}`;
  };

  const statCards = [
    {
      label: 'Total Contacts',
      value: stats.total,
      icon: FiUsers,
    },
    {
      label: 'This Month',
      value: stats.thisMonth,
      icon: FiTrendingUp,
    },
    {
      label: 'Companies',
      value: stats.uniqueCompanies,
      icon: FiBriefcase,
    },
    {
      label: 'Cities',
      value: stats.uniqueCities,
      icon: FiMapPin,
    },
  ];

  return (
    <ProtectedRoute allowedUser='admin'>
      <div className={`min-h-screen bg-white ${dmsans.className}`}>
        <AdminSidebar onCollapseChange={setCollapsed} />

        <main
          className={`transition-all duration-300 ${
            collapsed ? 'md:ml-[72px]' : 'md:ml-64'
          }`}
        >
          <div className="w-full px-3 sm:px-5 py-4 sm:py-6">
            <div className="w-full">
              {/* HEADER */}
              <div className="mb-6 flex items-start justify-between gap-3 flex-wrap">
                <div className="text-left">
                  <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
                    Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Overview of your contact submissions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchContacts}
                  disabled={fetching}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiRefreshCw
                    size={12}
                    className={fetching ? 'animate-spin' : ''}
                  />
                  Refresh
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-4 px-4 py-3 border border-red-200 bg-red-50 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* STAT CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {statCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.label}
                      className="border border-gray-200 bg-white px-4 py-4 hover:border-black transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200">
                          <Icon size={14} />
                        </div>
                      </div>
                      {fetching ? (
                        <div className="h-7 w-12 bg-gray-200 animate-pulse mb-1" />
                      ) : (
                        <p className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-0.5">
                          {card.value}
                        </p>
                      )}
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {card.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* RECENT CONTACTS */}
              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-black tracking-tight">
                      Recent Contacts
                    </h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Latest 5 submissions
                    </p>
                  </div>

                  <Link
                    href="/admin/contacts"
                    className="flex items-center gap-1.5 text-[11px] font-bold text-black uppercase tracking-wider hover:opacity-70 transition-opacity"
                  >
                    View All
                    <FiArrowRight size={12} />
                  </Link>
                </div>

                {fetching ? (
                  /* SKELETON */
                  <div className="divide-y divide-gray-100 animate-pulse">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 items-center"
                      >
                        <div className="col-span-4 h-3.5 w-32 bg-gray-200" />
                        <div className="col-span-4 h-3.5 w-40 bg-gray-200" />
                        <div className="col-span-4 h-3.5 w-24 bg-gray-200 ml-auto" />
                      </div>
                    ))}
                  </div>
                ) : recentContacts.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <FiMail
                      size={22}
                      className="mx-auto text-gray-300 mb-3"
                    />
                    <p className="text-xs text-gray-500">
                      No contacts yet.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 items-center hover:bg-gray-50 transition-colors"
                      >
                        {/* NAME + EMAIL */}
                        <div className="col-span-5 sm:col-span-4 min-w-0">
                          <p className="text-xs font-bold text-black truncate">
                            {contact.name}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {contact.email}
                          </p>
                        </div>

                        {/* COMPANY */}
                        <div className="col-span-4 sm:col-span-4 min-w-0 hidden sm:block">
                          {contact.company ? (
                            <p className="text-[11px] text-gray-700 truncate">
                              {contact.company}
                            </p>
                          ) : (
                            <span className="text-[11px] text-gray-400">
                              —
                            </span>
                          )}
                        </div>

                        {/* DATE */}
                        <div className="col-span-7 sm:col-span-4 min-w-0 text-right">
                          <p className="text-[11px] text-gray-500 truncate">
                            {formatDateTime(contact.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK ACTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                <Link
                  href="/admin/contacts"
                  className="group flex items-center justify-between px-5 py-4 border border-gray-200 bg-white hover:border-black hover:bg-black transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors">
                      <FiMail size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black group-hover:text-white transition-colors">
                        Manage Contacts
                      </p>
                      <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
                        View, search & delete submissions
                      </p>
                    </div>
                  </div>
                  <FiArrowRight
                    size={14}
                    className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </Link>

                <Link
                  href="/"
                  className="group flex items-center justify-between px-5 py-4 border border-gray-200 bg-white hover:border-black hover:bg-black transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 bg-gray-50 text-black border border-gray-200 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors">
                      <FiBriefcase size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black group-hover:text-white transition-colors">
                        View Website
                      </p>
                      <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
                        Open the public site
                      </p>
                    </div>
                  </div>
                  <FiArrowRight
                    size={14}
                    className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}