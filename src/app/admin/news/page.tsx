// "use client";

// import { FormEvent, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { DM_Sans } from "next/font/google";
// import { FiEdit2, FiTrash2, FiX, FiPlus, FiRefreshCw } from "react-icons/fi";
// import AdminSidebar from "@/app/Components/admin";

// const dmsans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });

// type News = {
//   id: number;
//   news_image: string;
//   news_title: string;
//   news_description: string;
//   created_at: string;
// };

// type ApiError = { error?: string };
// type NewsApiResponse = News[] | { news?: News[] } | ApiError;

// export default function NewsAdminPage() {
//   const [news, setNews] = useState<News[]>([]);
//   const [fetching, setFetching] = useState(true);
//   const [collapsed, setCollapsed] = useState(false);

//   // Add modal
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Edit modal
//   const [editItem, setEditItem] = useState<News | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editImage, setEditImage] = useState<File | null>(null);
//   const [editLoading, setEditLoading] = useState(false);

//   // Delete
//   const [deletingId, setDeletingId] = useState<number | null>(null);

//   const addImageRef = useRef<HTMLInputElement>(null);
//   const editImageRef = useRef<HTMLInputElement>(null);

//   // ─── FETCH (SAFE PARSE) ──────────────────────────
//   const fetchNews = async () => {
//     try {
//       setFetching(true);

//       const response = await fetch("/api/admin/news", {
//         method: "GET",
//         cache: "no-store",
//       });

//       const text = await response.text();
//       let result: NewsApiResponse | null = null;

//       try {
//         result = text ? JSON.parse(text) : null;
//       } catch (parseErr) {
//         console.error("Non-JSON response from API:", text);
//         throw new Error("Server returned invalid response");
//       }

//       if (!response.ok) {
//         const errMsg =
//           result && !Array.isArray(result) && "error" in result
//             ? result.error
//             : undefined;
//         throw new Error(errMsg || "Failed to fetch news");
//       }

//       const list: News[] = Array.isArray(result)
//         ? result
//         : result &&
//             typeof result === "object" &&
//             "news" in result &&
//             Array.isArray(result.news)
//           ? result.news
//           : [];

//       setNews(list);
//     } catch (error) {
//       console.error(error);
//       alert(error instanceof Error ? error.message : "Failed to load news");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   // ─── Add modal helpers ────────────────────────────
//   const openAddModal = () => {
//     setTitle("");
//     setDescription("");
//     setNewsImage(null);
//     if (addImageRef.current) addImageRef.current.value = "";
//     setShowAddModal(true);
//   };

//   const closeAddModal = () => {
//     setShowAddModal(false);
//     setTitle("");
//     setDescription("");
//     setNewsImage(null);
//     if (addImageRef.current) addImageRef.current.value = "";
//   };

//   // ─── ADD NEWS ─────────────────────────────────────
//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (loading) return;

//     if (!title.trim()) return alert("Please enter news title");
//     if (!description.trim()) return alert("Please enter news description");
//     if (!newsImage) return alert("Please select news image");

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("news_title", title.trim());
//       formData.append("news_description", description.trim());
//       formData.append("news_image", newsImage);

//       const response = await fetch("/api/admin/news", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to add news");
//       }

//       closeAddModal();
//       await fetchNews();
//       alert("News added successfully!");
//     } catch (error) {
//       console.error(error);
//       alert(error instanceof Error ? error.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── OPEN EDIT ────────────────────────────────────
//   const openEdit = (item: News) => {
//     setEditItem(item);
//     setEditTitle(item.news_title);
//     setEditDescription(item.news_description);
//     setEditImage(null);
//   };

//   const closeEdit = () => {
//     setEditItem(null);
//     setEditTitle("");
//     setEditDescription("");
//     setEditImage(null);
//     if (editImageRef.current) editImageRef.current.value = "";
//   };

//   // ─── SAVE EDIT ────────────────────────────────────
//   const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!editItem || editLoading) return;

//     if (!editTitle.trim()) return alert("Please enter news title");
//     if (!editDescription.trim())
//       return alert("Please enter news description");

//     try {
//       setEditLoading(true);

//       const formData = new FormData();
//       formData.append("id", String(editItem.id));
//       formData.append("news_title", editTitle.trim());
//       formData.append("news_description", editDescription.trim());
//       if (editImage) formData.append("news_image", editImage);

//       const response = await fetch("/api/admin/news", {
//         method: "PUT",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to update news");
//       }

//       closeEdit();
//       await fetchNews();
//       alert("News updated successfully!");
//     } catch (error) {
//       console.error(error);
//       alert(error instanceof Error ? error.message : "Something went wrong");
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   // ─── DELETE ───────────────────────────────────────
//   const handleDelete = async (id: number, title: string) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
//     );
//     if (!confirmed) return;
//     if (deletingId !== null) return;

//     try {
//       setDeletingId(id);

//       const response = await fetch(`/api/admin/news?id=${id}`, {
//         method: "DELETE",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to delete news");
//       }

//       setNews((prev) => prev.filter((n) => n.id !== id));
//       alert("News deleted successfully!");
//     } catch (error) {
//       console.error(error);
//       alert(error instanceof Error ? error.message : "Failed to delete");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // ─── Helpers ────────────────────────────────────
//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return "—";

//     const date = new Date(dateString);

//     const datePart = date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     const timePart = date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return `${datePart}, ${timePart}`;
//   };

//   return (
//     <div className={`min-h-screen bg-white ${dmsans.className}`}>
//       <AdminSidebar onCollapseChange={setCollapsed} />

//       <main
//         className={`transition-all duration-300 ${
//           collapsed ? "md:ml-[72px]" : "md:ml-64"
//         }`}
//       >
//         <div className="w-full px-3 sm:px-5 py-4 sm:py-6">
//           <div className="w-full">
//             {/* HEADER */}
//             <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
//               <div className="text-left">
//                 <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
//                   News
//                 </h1>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   Add and manage company news.
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 shrink-0">
//                 {/* REFRESH */}
//                 <button
//                   type="button"
//                   onClick={fetchNews}
//                   disabled={fetching}
//                   className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <FiRefreshCw
//                     size={12}
//                     className={fetching ? "animate-spin" : ""}
//                   />
//                   Refresh
//                 </button>

//                 {/* ADD */}
//                 <button
//                   type="button"
//                   onClick={openAddModal}
//                   className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-black hover:bg-gray-800 transition-all duration-200"
//                 >
//                   <FiPlus size={13} />
//                   Add News
//                 </button>
//               </div>
//             </div>

//             {/* COUNTER */}
//             {!fetching && (
//               <p className="mb-3 text-[11px] text-gray-500">
//                 {news.length} news
//               </p>
//             )}

//             {/* LIST (TABLE) */}
//             <div>
//               {fetching ? (
//                 /* SKELETON LOADER — 4 columns */
//                 <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
//                   <div className="min-w-[900px]">
//                     {/* Header skeleton */}
//                     <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
//                       <div className="col-span-2 h-3 bg-gray-200" />
//                       <div className="col-span-3 h-3 bg-gray-200" />
//                       <div className="col-span-5 h-3 bg-gray-200" />
//                       <div className="col-span-1 h-3 bg-gray-200" />
//                       <div className="col-span-1 h-3 bg-gray-200 ml-auto w-12" />
//                     </div>

//                     {/* Rows skeleton — 5 rows */}
//                     <div className="divide-y divide-gray-100">
//                       {[1, 2, 3, 4, 5].map((i) => (
//                         <div
//                           key={i}
//                           className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
//                         >
//                           <div className="col-span-2">
//                             <div className="w-16 h-12 bg-gray-100" />
//                           </div>
//                           <div className="col-span-3 h-3.5 w-32 bg-gray-200" />
//                           <div className="col-span-5 flex flex-col gap-1.5">
//                             <div className="h-3 w-48 bg-gray-100" />
//                             <div className="h-3 w-64 bg-gray-100" />
//                           </div>
//                           <div className="col-span-1 h-3 w-20 bg-gray-100" />
//                           <div className="col-span-1 flex items-center gap-1.5 justify-end">
//                             <div className="w-7 h-7 bg-gray-100" />
//                             <div className="w-7 h-7 bg-gray-100" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : news.length === 0 ? (
//                 <div className="text-left text-xs text-gray-500 py-6">
//                   No news added yet.
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto border border-gray-200 bg-white">
//                   <div className="min-w-[900px]">
//                     {/* TABLE HEADER — 5 columns */}
//                     <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
//                       <div className="col-span-2">Image</div>
//                       <div className="col-span-3">Title</div>
//                       <div className="col-span-5">Description</div>
//                       <div className="col-span-1">Added</div>
//                       <div className="col-span-1 text-right">Action</div>
//                     </div>

//                     {/* ROWS */}
//                     <div className="divide-y divide-gray-100">
//                       {news.map((item) => (
//                         <div
//                           key={item.id}
//                           className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
//                         >
//                           {/* IMAGE */}
//                           <div className="col-span-2">
//                             <div className="relative w-16 h-12 overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
//                               {item.news_image &&
//                               item.news_image.trim() !== "" ? (
//                                 <Image
//                                   src={item.news_image}
//                                   alt={item.news_title}
//                                   fill
//                                   className="object-cover"
//                                   sizes="64px"
//                                   unoptimized
//                                 />
//                               ) : (
//                                 <div className="flex h-full items-center justify-center text-gray-400 text-[9px]">
//                                   No image
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* TITLE */}
//                           <div className="col-span-3 min-w-0">
//                             <p className="text-xs font-bold text-black truncate">
//                               {item.news_title}
//                             </p>
//                           </div>

//                           {/* DESCRIPTION */}
//                           <div className="col-span-5 min-w-0">
//                             <p className="text-[11px] text-gray-500 line-clamp-2">
//                               {item.news_description}
//                             </p>
//                           </div>

//                           {/* DATE + TIME */}
//                           <div className="col-span-1 min-w-0">
//                             <p className="text-[10px] text-gray-500">
//                               {formatDateTime(item.created_at)}
//                             </p>
//                           </div>

//                           {/* ACTIONS */}
//                           <div className="col-span-1 flex items-center gap-1.5 justify-end">
//                             <button
//                               type="button"
//                               onClick={() => openEdit(item)}
//                               className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
//                               aria-label={`Edit ${item.news_title}`}
//                               title="Edit"
//                             >
//                               <FiEdit2 size={12} />
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleDelete(item.id, item.news_title)
//                               }
//                               disabled={deletingId === item.id}
//                               className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                               aria-label={`Delete ${item.news_title}`}
//                               title="Delete"
//                             >
//                               {deletingId === item.id ? (
//                                 <span className="block w-3 h-3 animate-spin border-2 border-current border-t-transparent" />
//                               ) : (
//                                 <FiTrash2 size={12} />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* ═══════════════════ ADD MODAL ═══════════════════ */}
//       {showAddModal && (
//         <div
//           className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
//           onClick={closeAddModal}
//         >
//           <div
//             className="relative bg-white shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
//               <h3 className="text-base font-bold text-black">Add News</h3>
//               <button
//                 type="button"
//                 onClick={closeAddModal}
//                 className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
//                 aria-label="Close"
//               >
//                 <FiX size={16} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-5 space-y-3">
//               <input
//                 type="text"
//                 value={title}
//                 disabled={loading}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="News Title"
//                 className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
//               />

//               <textarea
//                 value={description}
//                 disabled={loading}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="News Description"
//                 rows={4}
//                 className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
//               />

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
//                   News Image
//                 </label>
//                 <input
//                   ref={addImageRef}
//                   type="file"
//                   accept="image/*"
//                   disabled={loading}
//                   onChange={(e) =>
//                     setNewsImage(e.target.files?.[0] || null)
//                   }
//                   className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
//                 />
//                 {newsImage && (
//                   <p className="mt-1.5 text-[10px] text-gray-500">
//                     Selected: {newsImage.name}
//                   </p>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeAddModal}
//                   disabled={loading}
//                   className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black border border-gray-300 hover:bg-gray-100 transition-all duration-200"
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`flex-1 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all duration-200 ${
//                     loading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-black hover:bg-gray-800"
//                   }`}
//                 >
//                   {loading ? "Uploading..." : "ADD"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ═══════════════════ EDIT MODAL ═══════════════════ */}
//       {editItem && (
//         <div
//           className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
//           onClick={closeEdit}
//         >
//           <div
//             className="relative bg-white shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
//               <h3 className="text-base font-bold text-black">Edit News</h3>
//               <button
//                 type="button"
//                 onClick={closeEdit}
//                 className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
//                 aria-label="Close"
//               >
//                 <FiX size={16} />
//               </button>
//             </div>

//             <form onSubmit={handleEditSubmit} className="p-5 space-y-3">
//               <input
//                 type="text"
//                 value={editTitle}
//                 disabled={editLoading}
//                 onChange={(e) => setEditTitle(e.target.value)}
//                 placeholder="News Title"
//                 className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
//               />

//               <textarea
//                 value={editDescription}
//                 disabled={editLoading}
//                 onChange={(e) => setEditDescription(e.target.value)}
//                 placeholder="News Description"
//                 rows={4}
//                 className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
//               />

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
//                   Replace Image (optional)
//                 </label>

//                 <input
//                   ref={editImageRef}
//                   type="file"
//                   accept="image/*"
//                   disabled={editLoading}
//                   onChange={(e) =>
//                     setEditImage(e.target.files?.[0] || null)
//                   }
//                   className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
//                 />

//                 {editImage && (
//                   <p className="mt-1.5 text-[10px] text-gray-500">
//                     Selected: {editImage.name}
//                   </p>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeEdit}
//                   disabled={editLoading}
//                   className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black border border-gray-300 hover:bg-gray-100 transition-all duration-200"
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={editLoading}
//                   className={`flex-1 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all duration-200 ${
//                     editLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-black hover:bg-gray-800"
//                   }`}
//                 >
//                   {editLoading ? "Saving..." : "SAVE"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiX, FiPlus, FiRefreshCw } from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";

type News = {
  id: number;
  news_image: string;
  news_title: string;
  news_description: string;
  created_at: string;
};

type ApiError = { error?: string };
type NewsApiResponse = News[] | { news?: News[] } | ApiError;

export default function NewsAdminPage() {
  const [news, setNews] = useState<News[]>([]);
  const [fetching, setFetching] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Edit modal
  const [editItem, setEditItem] = useState<News | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const addImageRef = useRef<HTMLInputElement>(null);
  const editImageRef = useRef<HTMLInputElement>(null);

  // ─── FETCH (SAFE PARSE) ──────────────────────────
  const fetchNews = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/news", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: NewsApiResponse | null = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        console.error("Non-JSON response from API:", text);
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        const errMsg =
          result && !Array.isArray(result) && "error" in result
            ? result.error
            : undefined;
        throw new Error(errMsg || "Failed to fetch news");
      }

      const list: News[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "news" in result &&
            Array.isArray(result.news)
          ? result.news
          : [];

      setNews(list);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to load news");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ─── Add modal helpers ────────────────────────────
  const openAddModal = () => {
    setTitle("");
    setDescription("");
    setNewsImage(null);
    if (addImageRef.current) addImageRef.current.value = "";
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setTitle("");
    setDescription("");
    setNewsImage(null);
    if (addImageRef.current) addImageRef.current.value = "";
  };

  // ─── ADD NEWS ─────────────────────────────────────
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    if (!title.trim()) return alert("Please enter news title");
    if (!description.trim()) return alert("Please enter news description");
    if (!newsImage) return alert("Please select news image");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("news_title", title.trim());
      formData.append("news_description", description.trim());
      formData.append("news_image", newsImage);

      const response = await fetch("/api/admin/news", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add news");
      }

      closeAddModal();
      await fetchNews();
      alert("News added successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ─── OPEN EDIT ────────────────────────────────────
  const openEdit = (item: News) => {
    setEditItem(item);
    setEditTitle(item.news_title);
    setEditDescription(item.news_description);
    setEditImage(null);
  };

  const closeEdit = () => {
    setEditItem(null);
    setEditTitle("");
    setEditDescription("");
    setEditImage(null);
    if (editImageRef.current) editImageRef.current.value = "";
  };

  // ─── SAVE EDIT ────────────────────────────────────
  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editItem || editLoading) return;

    if (!editTitle.trim()) return alert("Please enter news title");
    if (!editDescription.trim())
      return alert("Please enter news description");

    try {
      setEditLoading(true);

      const formData = new FormData();
      formData.append("id", String(editItem.id));
      formData.append("news_title", editTitle.trim());
      formData.append("news_description", editDescription.trim());
      if (editImage) formData.append("news_image", editImage);

      const response = await fetch("/api/admin/news", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update news");
      }

      closeEdit();
      await fetchNews();
      alert("News updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setEditLoading(false);
    }
  };

  // ─── DELETE ───────────────────────────────────────
  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete news");
      }

      setNews((prev) => prev.filter((n) => n.id !== id));
      alert("News deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Helpers ────────────────────────────────────
  const formatDateTime = (dateString: string) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar onCollapseChange={setCollapsed} />

      <main
        className={`transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-64"
        }`}
      >
        <div className="w-full px-3 sm:px-5 py-4 sm:py-6">
          <div className="w-full">
            {/* HEADER */}
            <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
                  News
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Add and manage company news.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* REFRESH */}
                <button
                  type="button"
                  onClick={fetchNews}
                  disabled={fetching}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiRefreshCw
                    size={12}
                    className={fetching ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                {/* ADD */}
                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-black hover:bg-gray-800 transition-all duration-200"
                >
                  <FiPlus size={13} />
                  Add News
                </button>
              </div>
            </div>

            {/* COUNTER */}
            {!fetching && (
              <p className="mb-3 text-[11px] text-gray-500">
                {news.length} news
              </p>
            )}

            {/* LIST (TABLE) */}
            <div>
              {fetching ? (
                /* SKELETON LOADER — 4 columns */
                <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                  <div className="min-w-[900px]">
                    {/* Header skeleton */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="col-span-2 h-3 bg-gray-200" />
                      <div className="col-span-3 h-3 bg-gray-200" />
                      <div className="col-span-5 h-3 bg-gray-200" />
                      <div className="col-span-1 h-3 bg-gray-200" />
                      <div className="col-span-1 h-3 bg-gray-200 ml-auto w-12" />
                    </div>

                    {/* Rows skeleton — 5 rows */}
                    <div className="divide-y divide-gray-100">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
                        >
                          <div className="col-span-2">
                            <div className="w-16 h-12 bg-gray-100" />
                          </div>
                          <div className="col-span-3 h-3.5 w-32 bg-gray-200" />
                          <div className="col-span-5 flex flex-col gap-1.5">
                            <div className="h-3 w-48 bg-gray-100" />
                            <div className="h-3 w-64 bg-gray-100" />
                          </div>
                          <div className="col-span-1 h-3 w-20 bg-gray-100" />
                          <div className="col-span-1 flex items-center gap-1.5 justify-end">
                            <div className="w-7 h-7 bg-gray-100" />
                            <div className="w-7 h-7 bg-gray-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : news.length === 0 ? (
                <div className="text-left text-xs text-gray-500 py-6">
                  No news added yet.
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-200 bg-white">
                  <div className="min-w-[900px]">
                    {/* TABLE HEADER — 5 columns */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="col-span-2">Image</div>
                      <div className="col-span-3">Title</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-1">Added</div>
                      <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* ROWS */}
                    <div className="divide-y divide-gray-100">
                      {news.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                        >
                          {/* IMAGE */}
                          <div className="col-span-2">
                            <div className="relative w-16 h-12 overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                              {item.news_image &&
                              item.news_image.trim() !== "" ? (
                                <Image
                                  src={item.news_image}
                                  alt={item.news_title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                  unoptimized
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-gray-400 text-[9px]">
                                  No image
                                </div>
                              )}
                            </div>
                          </div>

                          {/* TITLE */}
                          <div className="col-span-3 min-w-0">
                            <p className="text-xs font-bold text-black truncate">
                              {item.news_title}
                            </p>
                          </div>

                          {/* DESCRIPTION */}
                          <div className="col-span-5 min-w-0">
                            <p className="text-[11px] text-gray-500 line-clamp-2">
                              {item.news_description}
                            </p>
                          </div>

                          {/* DATE + TIME */}
                          <div className="col-span-1 min-w-0">
                            <p className="text-[10px] text-gray-500">
                              {formatDateTime(item.created_at)}
                            </p>
                          </div>

                          {/* ACTIONS */}
                          <div className="col-span-1 flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => openEdit(item)}
                              className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                              aria-label={`Edit ${item.news_title}`}
                              title="Edit"
                            >
                              <FiEdit2 size={12} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(item.id, item.news_title)
                              }
                              disabled={deletingId === item.id}
                              className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label={`Delete ${item.news_title}`}
                              title="Delete"
                            >
                              {deletingId === item.id ? (
                                <span className="block w-3 h-3 animate-spin border-2 border-current border-t-transparent" />
                              ) : (
                                <FiTrash2 size={12} />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ═══════════════════ ADD MODAL ═══════════════════ */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
          onClick={closeAddModal}
        >
          <div
            className="relative bg-white shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-black">Add News</h3>
              <button
                type="button"
                onClick={closeAddModal}
                className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <input
                type="text"
                value={title}
                disabled={loading}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="News Title"
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
              />

              <textarea
                value={description}
                disabled={loading}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="News Description"
                rows={4}
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
              />

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  News Image
                </label>
                <input
                  ref={addImageRef}
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={(e) =>
                    setNewsImage(e.target.files?.[0] || null)
                  }
                  className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                />
                {newsImage && (
                  <p className="mt-1.5 text-[10px] text-gray-500">
                    Selected: {newsImage.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={loading}
                  className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {loading ? "Uploading..." : "ADD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════ EDIT MODAL ═══════════════════ */}
      {editItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
          onClick={closeEdit}
        >
          <div
            className="relative bg-white shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-black">Edit News</h3>
              <button
                type="button"
                onClick={closeEdit}
                className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-3">
              <input
                type="text"
                value={editTitle}
                disabled={editLoading}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="News Title"
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
              />

              <textarea
                value={editDescription}
                disabled={editLoading}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="News Description"
                rows={4}
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
              />

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Replace Image (optional)
                </label>

                <input
                  ref={editImageRef}
                  type="file"
                  accept="image/*"
                  disabled={editLoading}
                  onChange={(e) =>
                    setEditImage(e.target.files?.[0] || null)
                  }
                  className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                />

                {editImage && (
                  <p className="mt-1.5 text-[10px] text-gray-500">
                    Selected: {editImage.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={editLoading}
                  className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className={`flex-1 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all duration-200 ${
                    editLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {editLoading ? "Saving..." : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}