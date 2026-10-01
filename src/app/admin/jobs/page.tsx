"use client";

import { FormEvent, useEffect, useState } from "react";
import { DM_Sans } from "next/font/google";
import {
  FiEdit2,
  FiTrash2,
  FiX,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";
import ProtectedRoute from "@/app/Components/ProtectedRoute";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type JobOpening = {
  id: number;
  job_title: string | null;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  job_description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  posted_date: string | null;
  application_deadline: string | null;
};

type ApiError = { error?: string };
type JobsApiResponse = JobOpening[] | { jobs?: JobOpening[] } | ApiError;

const EMPTY_FORM = {
  job_title: "",
  department: "",
  location: "",
  employment_type: "",
  experience_level: "",
  job_description: "",
  responsibilities: "",
  requirements: "",
  posted_date: "",
  application_deadline: "",
};

export default function JobOpeningsAdminPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [fetching, setFetching] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);

  // Edit modal state
  const [editItem, setEditItem] = useState<JobOpening | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });
  const [editLoading, setEditLoading] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ─── FETCH ────────────────────────────────────────
  const fetchJobs = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/jobs", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: JobsApiResponse | null = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        const errMsg =
          result && !Array.isArray(result) && "error" in result
            ? result.error
            : undefined;
        throw new Error(errMsg || "Failed to fetch jobs");
      }

      const list: JobOpening[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "jobs" in result &&
            Array.isArray(result.jobs)
          ? result.jobs
          : [];

      setJobs(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to load jobs"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ─── ADD modal ────────────────────────────────────
  const openAddModal = () => {
    // Auto-fill posted_date with today (but still editable)
    const today = new Date().toISOString().split("T")[0];
    setAddForm({ ...EMPTY_FORM, posted_date: today });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddForm({ ...EMPTY_FORM });
  };

  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!addForm.job_title.trim()) return alert("Please enter job title");

    try {
      setLoading(true);

      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add job");
      }

      closeAddModal();
      await fetchJobs();
      alert("Job opening added successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── EDIT modal ───────────────────────────────────
  const openEdit = (item: JobOpening) => {
    setEditItem(item);
    setEditForm({
      job_title: item.job_title || "",
      department: item.department || "",
      location: item.location || "",
      employment_type: item.employment_type || "",
      experience_level: item.experience_level || "",
      job_description: item.job_description || "",
      responsibilities: item.responsibilities || "",
      requirements: item.requirements || "",
      posted_date: item.posted_date || "",
      application_deadline: item.application_deadline || "",
    });
  };

  const closeEdit = () => {
    setEditItem(null);
    setEditForm({ ...EMPTY_FORM });
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editItem || editLoading) return;

    if (!editForm.job_title.trim()) return alert("Please enter job title");

    try {
      setEditLoading(true);

      const response = await fetch("/api/admin/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editItem.id, ...editForm }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update job");
      }

      closeEdit();
      await fetchJobs();
      alert("Job opening updated successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
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

      const response = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete job");
      }

      setJobs((prev) => prev.filter((j) => j.id !== id));
      alert("Job opening deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Helpers ─────────────────────────────────────
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (deadline: string | null) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(deadline) < today;
  };

  // ─── SHARED FORM FIELDS ──────────────────────────
  const FormFields = ({
    form,
    setForm,
    disabled,
  }: {
    form: typeof EMPTY_FORM;
    setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_FORM>>;
    disabled: boolean;
  }) => (
    <>
      {/* JOB TITLE */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
          Job Title *
        </label>
        <input
          type="text"
          value={form.job_title}
          disabled={disabled}
          onChange={(e) =>
            setForm((f) => ({ ...f, job_title: e.target.value }))
          }
          placeholder="e.g. Senior Electrical Engineer"
          className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400"
        />
      </div>

      {/* DEPARTMENT + LOCATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Department
          </label>
          <input
            type="text"
            value={form.department}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({ ...f, department: e.target.value }))
            }
            placeholder="e.g. Engineering"
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Location
          </label>
          <input
            type="text"
            value={form.location}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
            placeholder="e.g. Lahore"
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* EMPLOYMENT TYPE + EXPERIENCE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Employment Type
          </label>
          <input
            type="text"
            value={form.employment_type}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                employment_type: e.target.value,
              }))
            }
            placeholder="e.g. Full Time"
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Experience Level
          </label>
          <input
            type="text"
            value={form.experience_level}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                experience_level: e.target.value,
              }))
            }
            placeholder="e.g. 3-5 Years"
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* DATES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Posted Date
          </label>
          <input
            type="date"
            value={form.posted_date}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({ ...f, posted_date: e.target.value }))
            }
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Application Deadline
          </label>
          <input
            type="date"
            value={form.application_deadline}
            disabled={disabled}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                application_deadline: e.target.value,
              }))
            }
            className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white"
          />
        </div>
      </div>

      {/* JOB DESCRIPTION */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
          Job Description
        </label>
        <textarea
          value={form.job_description}
          disabled={disabled}
          onChange={(e) =>
            setForm((f) => ({ ...f, job_description: e.target.value }))
          }
          placeholder="Brief overview of the role..."
          rows={3}
          className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400 resize-none"
        />
      </div>

      {/* RESPONSIBILITIES */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
          Responsibilities
        </label>
        <textarea
          value={form.responsibilities}
          disabled={disabled}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              responsibilities: e.target.value,
            }))
          }
          placeholder="One responsibility per line..."
          rows={4}
          className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400 resize-none"
        />
      </div>

      {/* REQUIREMENTS */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
          Requirements
        </label>
        <textarea
          value={form.requirements}
          disabled={disabled}
          onChange={(e) =>
            setForm((f) => ({ ...f, requirements: e.target.value }))
          }
          placeholder="One requirement per line..."
          rows={4}
          className="w-full px-3 py-2 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-400 resize-none"
        />
      </div>
    </>
  );

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
                    Job Openings
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add and manage all job openings.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={fetchJobs}
                    disabled={fetching}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiRefreshCw
                      size={12}
                      className={fetching ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-black hover:bg-gray-800 transition-all duration-200"
                  >
                    <FiPlus size={13} />
                    Add Job
                  </button>
                </div>
              </div>

              {/* COUNTER */}
              {!fetching && (
                <p className="mb-3 text-[11px] text-gray-500">
                  {jobs.length} job{jobs.length !== 1 ? "s" : ""}
                </p>
              )}

              {/* LIST (TABLE) */}
              <div>
                {fetching ? (
                  <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                    <div className="min-w-[1100px]">
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="col-span-3 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-1 h-3 bg-gray-200 ml-auto w-12" />
                      </div>
                      <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
                          >
                            <div className="col-span-3 h-3.5 w-40 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-24 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-20 bg-gray-200" />
                            <div className="col-span-2 h-3.5 w-24 bg-gray-200" />
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
                ) : jobs.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No job openings added yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 bg-white">
                    <div className="min-w-[1100px]">
                      {/* HEADER */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-3">Job Title</div>
                        <div className="col-span-2">Department</div>
                        <div className="col-span-2">Location</div>
                        <div className="col-span-2">Type / Level</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>

                      {/* ROWS */}
                      <div className="divide-y divide-gray-100">
                        {jobs.map((job) => (
                          <div
                            key={job.id}
                            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                          >
                            {/* JOB TITLE */}
                            <div className="col-span-3 min-w-0">
                              <p className="text-xs font-bold text-black truncate">
                                {job.job_title || "—"}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate">
                                Posted {formatDate(job.posted_date)}
                              </p>
                            </div>

                            {/* DEPARTMENT */}
                            <div className="col-span-2 min-w-0">
                              {job.department ? (
                                <span className="inline-block bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 truncate max-w-full">
                                  {job.department}
                                </span>
                              ) : (
                                <span className="text-[11px] text-gray-400">
                                  —
                                </span>
                              )}
                            </div>

                            {/* LOCATION */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[11px] text-gray-700 truncate">
                                {job.location || "—"}
                              </p>
                            </div>

                            {/* TYPE / LEVEL */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[11px] text-gray-700 truncate">
                                {job.employment_type || "—"}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate">
                                {job.experience_level || "—"}
                              </p>
                            </div>

                            {/* DEADLINE */}
                            <div className="col-span-2 min-w-0">
                              {job.application_deadline ? (
                                <p
                                  className={`text-[11px] truncate ${
                                    isExpired(job.application_deadline)
                                      ? "text-gray-400 line-through"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {formatDate(job.application_deadline)}
                                </p>
                              ) : (
                                <span className="text-[11px] text-gray-400">
                                  —
                                </span>
                              )}
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => openEdit(job)}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                                aria-label="Edit job"
                                title="Edit"
                              >
                                <FiEdit2 size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    job.id,
                                    job.job_title || "Untitled"
                                  )
                                }
                                disabled={deletingId === job.id}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Delete job"
                                title="Delete"
                              >
                                {deletingId === job.id ? (
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
              className="relative bg-white shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-base font-bold text-black">
                  Add Job Opening
                </h3>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                  aria-label="Close"
                >
                  <FiX size={16} />
                </button>
              </div>

              <form
                onSubmit={handleAddSubmit}
                className="p-5 space-y-3"
              >
                <FormFields
                  form={addForm}
                  setForm={setAddForm}
                  disabled={loading}
                />

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
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
                    {loading ? "Saving..." : "ADD JOB"}
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
              className="relative bg-white shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-base font-bold text-black">
                  Edit Job Opening
                </h3>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                  aria-label="Close"
                >
                  <FiX size={16} />
                </button>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className="p-5 space-y-3"
              >
                <FormFields
                  form={editForm}
                  setForm={setEditForm}
                  disabled={editLoading}
                />

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
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
    </ProtectedRoute>
  );
}