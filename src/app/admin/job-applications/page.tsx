"use client";

import { useEffect, useState, useMemo } from "react";
import { DM_Sans } from "next/font/google";
import {
  FiTrash2,
  FiSearch,
  FiX,
  FiEye,
  FiDownload,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";
import ProtectedRoute from "@/app/Components/ProtectedRoute";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type JobApplication = {
  id: number;
  job_title: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  comments: string | null;
  cv_url: string | null;
  cv_name: string | null;
  created_at: string;
};

export default function JobApplicationsAdminPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<JobApplication | null>(null);

  // ─── Fetch applications ─────────────────────────
  const fetchApplications = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/job-applications", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch applications");
      }

      setApplications(result);
    } catch (error) {
      console.error(error);
      alert("Failed to load applications");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ─── Filter ─────────────────────────────────────
  const filteredApplications = useMemo(() => {
    if (!search.trim()) return applications;
    const q = search.toLowerCase().trim();
    return applications.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phone?.toLowerCase().includes(q) ||
        a.job_title?.toLowerCase().includes(q) ||
        a.company?.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q)
    );
  }, [applications, search]);

  // ─── Delete ─────────────────────────────────────
  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the application from "${name}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `/api/admin/job-applications?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete application");
      }

      setApplications((prev) => prev.filter((a) => a.id !== id));
      alert("Application deleted successfully!");
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
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                    Job Applications
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    View and manage all career applications.
                  </p>
                </div>

                {/* REFRESH */}
                <button
                  type="button"
                  onClick={fetchApplications}
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
                    placeholder="Search by name, email, job title..."
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
                  {filteredApplications.length} application
                  {filteredApplications.length !== 1 ? "s" : ""}
                  {search && ` matching "${search}"`}
                </p>
              )}

              {/* LIST (TABLE) */}
              <div>
                {fetching ? (
                  /* SKELETON LOADER — 8 columns */
                  <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                    <div className="min-w-[1200px]">
                      {/* Header skeleton */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-1 h-3 bg-gray-200" />
                        <div className="col-span-1 h-3 bg-gray-200" />
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
                            <div className="col-span-2 h-3.5 w-28 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-24 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-40 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-32 bg-gray-200" />
                            <div className="col-span-1 h-3.5 w-16 bg-gray-200" />
                            <div className="col-span-1 h-3.5 w-12 bg-gray-200" />
                            <div className="col-span-1 h-3.5 w-20 bg-gray-200" />
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <div className="w-7 h-7 bg-gray-100" />
                              <div className="w-7 h-7 bg-gray-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No applications yet.
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No applications match your search.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 bg-white">
                    <div className="min-w-[1200px]">
                      {/* TABLE HEADER — 8 columns */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-2">Name</div>
                        <div className="col-span-2">Job Title</div>
                        <div className="col-span-2">Email</div>
                        <div className="col-span-2">Phone</div>
                        <div className="col-span-1">City</div>
                        <div className="col-span-1">CV</div>
                        <div className="col-span-1">Applied</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>

                      {/* ROWS */}
                      <div className="divide-y divide-gray-100">
                        {filteredApplications.map((app) => (
                          <div
                            key={app.id}
                            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                          >
                            {/* NAME */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-xs font-bold text-black truncate">
                                {app.name}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate">
                                {app.company}
                              </p>
                            </div>

                            {/* JOB TITLE */}
                            <div className="col-span-2 min-w-0">
                              <span className="inline-block bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 truncate max-w-full">
                                {app.job_title}
                              </span>
                            </div>

                            {/* EMAIL */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[11px] text-gray-700 truncate">
                                {app.email}
                              </p>
                            </div>

                            {/* PHONE */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[11px] text-gray-700 truncate">
                                {app.phone}
                              </p>
                            </div>

                            {/* CITY */}
                            <div className="col-span-1 min-w-0">
                              <p className="text-[11px] text-gray-700 truncate">
                                {app.city}
                              </p>
                            </div>

                            {/* CV */}
                            <div className="col-span-1 min-w-0">
                              {app.cv_url ? (
                                <a
                                  href={app.cv_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] text-black hover:text-gray-500 font-semibold"
                                >
                                  <FiFileText size={10} />
                                  CV
                                </a>
                              ) : (
                                <span className="text-[10px] text-gray-400">
                                  —
                                </span>
                              )}
                            </div>

                            {/* APPLIED */}
                            <div className="col-span-1 min-w-0">
                              <p className="text-[10px] text-gray-500">
                                {formatDateTime(app.created_at)}
                              </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => setViewItem(app)}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                                aria-label="View application"
                                title="View"
                              >
                                <FiEye size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(app.id, app.name)
                                }
                                disabled={deletingId === app.id}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Delete application"
                                title="Delete"
                              >
                                {deletingId === app.id ? (
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
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-base font-bold text-black">
                  Application Details
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

              {/* CONTENT */}
              <div className="p-5 space-y-4">
                {/* Job title */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Applied For
                  </p>
                  <span className="inline-block bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-700">
                    {viewItem.job_title}
                  </span>
                </div>

                <div className="border-t border-gray-100" />

                {/* Name */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold text-black">
                    {viewItem.name}
                  </p>
                </div>

                {/* Company */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Current Company
                  </p>
                  <p className="text-sm text-gray-800">{viewItem.company}</p>
                </div>

                {/* City */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    City
                  </p>
                  <p className="text-sm text-gray-800">{viewItem.city}</p>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${viewItem.email}`}
                      className="text-xs text-black hover:underline break-all"
                    >
                      {viewItem.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${viewItem.phone}`}
                      className="text-xs text-black hover:underline"
                    >
                      {viewItem.phone}
                    </a>
                  </div>
                </div>

                {/* Comments */}
                {viewItem.comments && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Comments
                    </p>
                    <p className="text-xs text-gray-800 leading-6 whitespace-pre-line bg-gray-50 p-3">
                      {viewItem.comments}
                    </p>
                  </div>
                )}

                {/* CV */}
                {viewItem.cv_url && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Resume / CV
                    </p>
                    <a
                      href={viewItem.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
                    >
                      <FiFileText
                        size={14}
                        className="text-gray-400 group-hover:text-black shrink-0"
                      />
                      <span className="text-[11px] text-gray-700 group-hover:text-black truncate flex-1">
                        {viewItem.cv_name || "Download CV"}
                      </span>
                      <FiDownload
                        size={12}
                        className="text-gray-400 group-hover:text-black shrink-0"
                      />
                    </a>
                  </div>
                )}

                {/* Date */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Applied On
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