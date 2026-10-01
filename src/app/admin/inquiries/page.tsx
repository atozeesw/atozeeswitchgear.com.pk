"use client";

import { useEffect, useState, useMemo } from "react";
import { DM_Sans } from "next/font/google";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import {
  FiTrash2,
  FiSearch,
  FiX,
  FiEye,
  FiFile,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Inquiry = {
  id: number;
  full_name: string;
  company_name: string | null;
  email_address: string;
  phone_number: string | null;
  inquiry_about: string;
  message: string;
  attachment: string | null;
  created_at: string;
};

type ApiError = { error?: string };
type InquiriesApiResponse =
  | Inquiry[]
  | { inquiries?: Inquiry[] }
  | ApiError;

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<Inquiry | null>(null);

  // ─── FETCH (SAFE PARSE) ──────────────────────────
  const fetchInquiries = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/inquiries", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: InquiriesApiResponse | null = null;

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
        throw new Error(errMsg || "Failed to fetch inquiries");
      }

      const list: Inquiry[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "inquiries" in result &&
            Array.isArray(result.inquiries)
          ? result.inquiries
          : [];

      setInquiries(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to load inquiries"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // ─── Filter ─────────────────────────────────────
  const filteredInquiries = useMemo(() => {
    if (!search.trim()) return inquiries;
    const q = search.toLowerCase().trim();
    return inquiries.filter(
      (i) =>
        i.full_name?.toLowerCase().includes(q) ||
        i.email_address?.toLowerCase().includes(q) ||
        i.company_name?.toLowerCase().includes(q) ||
        i.phone_number?.toLowerCase().includes(q) ||
        i.inquiry_about?.toLowerCase().includes(q) ||
        i.message?.toLowerCase().includes(q)
    );
  }, [inquiries, search]);

  // ─── Delete ─────────────────────────────────────
  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the inquiry from "${name}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete inquiry");
      }

      setInquiries((prev) => prev.filter((i) => i.id !== id));
      alert("Inquiry deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete"
      );
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

  const getAttachmentList = (attachment: string | null): string[] => {
    if (!attachment) return [];
    return attachment
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  return (
    <ProtectedRoute allowedUser="admin">
      <div className={`min-h-screen bg-white ${dmsans.className}`}>
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
                    Inquiries
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    View and manage all customer inquiries.
                  </p>
                </div>

                {/* REFRESH */}
                <button
                  type="button"
                  onClick={fetchInquiries}
                  disabled={fetching}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <FiRefreshCw
                    size={12}
                    className={fetching ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              {/* SEARCH */}
              <div className="mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2 bg-white border border-gray-300 focus-within:border-black transition">
                  <FiSearch className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, subject..."
                    className="flex-1 text-xs sm:text-sm text-black outline-none bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 min-w-0"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-gray-400 hover:text-black shrink-0"
                      aria-label="Clear search"
                    >
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* COUNTER */}
              {!fetching && (
                <p className="mb-3 text-[11px] text-gray-500">
                  {filteredInquiries.length} inquir
                  {filteredInquiries.length !== 1 ? "ies" : "y"}
                  {search && ` matching "${search}"`}
                </p>
              )}

              {/* LIST (TABLE) */}
              <div>
                {fetching ? (
                  /* SKELETON LOADER — 7 columns */
                  <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                    <div className="min-w-[1100px]">
                      {/* Header skeleton */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-1 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-1 h-3 bg-gray-200 ml-auto w-12" />
                      </div>

                      {/* Rows skeleton — 5 rows */}
                      <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
                          >
                            <div className="col-span-2 h-3.5 w-28 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-24 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-36 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-32 bg-gray-200" />
                            <div className="col-span-1 h-3.5 w-16 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-28 bg-gray-200" />
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <div className="w-7 h-7 bg-gray-100" />
                              <div className="w-7 h-7 bg-gray-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No inquiries yet.
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No inquiries match your search.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 bg-white">
                    <div className="min-w-[1100px]">
                      {/* TABLE HEADER — 7 columns */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-2">Name</div>
                        <div className="col-span-2">Company</div>
                        <div className="col-span-2">Email</div>
                        <div className="col-span-2">Phone</div>
                        <div className="col-span-1">Subject</div>
                        <div className="col-span-2">Received</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>

                      {/* ROWS */}
                      <div className="divide-y divide-gray-100">
                        {filteredInquiries.map((inquiry) => {
                          const attachments = getAttachmentList(
                            inquiry.attachment
                          );

                          return (
                            <div
                              key={inquiry.id}
                              className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                            >
                              {/* NAME */}
                              <div className="col-span-2 min-w-0">
                                <p className="text-xs font-bold text-black truncate">
                                  {inquiry.full_name}
                                </p>
                              </div>

                              {/* COMPANY */}
                              <div className="col-span-2 min-w-0">
                                {inquiry.company_name ? (
                                  <p className="text-[11px] text-gray-700 truncate">
                                    {inquiry.company_name}
                                  </p>
                                ) : (
                                  <span className="text-[11px] text-gray-400">
                                    —
                                  </span>
                                )}
                              </div>

                              {/* EMAIL */}
                              <div className="col-span-2 min-w-0">
                                <p className="text-[11px] text-gray-700 truncate">
                                  {inquiry.email_address}
                                </p>
                                {attachments.length > 0 && (
                                  <div className="flex items-center gap-1 text-[9px] text-gray-500 mt-0.5">
                                    <FiFile size={9} />
                                    <span>
                                      {attachments.length} file
                                      {attachments.length > 1 ? "s" : ""}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* PHONE */}
                              <div className="col-span-2 min-w-0">
                                {inquiry.phone_number ? (
                                  <p className="text-[11px] text-gray-700 truncate">
                                    {inquiry.phone_number}
                                  </p>
                                ) : (
                                  <span className="text-[11px] text-gray-400">
                                    —
                                  </span>
                                )}
                              </div>

                              {/* SUBJECT */}
                              <div className="col-span-1 min-w-0">
                                <span className="inline-block bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 truncate max-w-full">
                                  {inquiry.inquiry_about}
                                </span>
                              </div>

                              {/* RECEIVED */}
                              <div className="col-span-2 min-w-0">
                                <p className="text-[10px] text-gray-500">
                                  {formatDateTime(inquiry.created_at)}
                                </p>
                              </div>

                              {/* ACTIONS */}
                              <div className="col-span-1 flex items-center gap-1.5 justify-end">
                                <button
                                  type="button"
                                  onClick={() => setViewItem(inquiry)}
                                  className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                                  aria-label="View inquiry"
                                  title="View"
                                >
                                  <FiEye size={12} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      inquiry.id,
                                      inquiry.full_name
                                    )
                                  }
                                  disabled={deletingId === inquiry.id}
                                  className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                  aria-label="Delete inquiry"
                                  title="Delete"
                                >
                                  {deletingId === inquiry.id ? (
                                    <span className="block w-3 h-3 animate-spin border-2 border-current border-t-transparent" />
                                  ) : (
                                    <FiTrash2 size={12} />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ═══════════════════ VIEW MODAL ═══════════════════ */}
        {viewItem && (
          <div
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
            onClick={() => setViewItem(null)}
          >
            <div
              className="relative bg-white shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-base font-bold text-black">
                  Inquiry Details
                </h3>
                <button
                  type="button"
                  onClick={() => setViewItem(null)}
                  className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                  aria-label="Close"
                >
                  <FiX size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Inquiry About
                  </p>
                  <span className="inline-block bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-700">
                    {viewItem.inquiry_about}
                  </span>
                </div>

                <div className="border-t border-gray-100" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold text-black">
                    {viewItem.full_name}
                  </p>
                </div>

                {viewItem.company_name && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Company
                    </p>
                    <p className="text-sm text-gray-800">
                      {viewItem.company_name}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${viewItem.email_address}`}
                      className="text-xs text-black hover:underline break-all"
                    >
                      {viewItem.email_address}
                    </a>
                  </div>

                  {viewItem.phone_number && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${viewItem.phone_number}`}
                        className="text-xs text-black hover:underline"
                      >
                        {viewItem.phone_number}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Message
                  </p>
                  <p className="text-xs text-gray-800 leading-6 whitespace-pre-line bg-gray-50 p-3">
                    {viewItem.message}
                  </p>
                </div>

                {getAttachmentList(viewItem.attachment).length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Attachments (
                      {getAttachmentList(viewItem.attachment).length})
                    </p>
                    <div className="space-y-1.5">
                      {getAttachmentList(viewItem.attachment).map(
                        (url, idx) => {
                          const fileName = decodeURIComponent(
                            url.split("/").pop() || `file-${idx + 1}`
                          ).split("?")[0];

                          return (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
                            >
                              <FiFile
                                size={14}
                                className="text-gray-400 group-hover:text-black shrink-0"
                              />
                              <span className="text-[11px] text-gray-700 group-hover:text-black truncate flex-1">
                                {fileName}
                              </span>
                              <FiDownload
                                size={12}
                                className="text-gray-400 group-hover:text-black shrink-0"
                              />
                            </a>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Received
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDateTime(viewItem.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}