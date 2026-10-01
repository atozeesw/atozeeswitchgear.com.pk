"use client";

import { useEffect, useState, useMemo } from "react";
import { DM_Sans } from "next/font/google";
import {
  FiTrash2,
  FiSearch,
  FiX,
  FiMail,
  FiCopy,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";
import ProtectedRoute from "@/app/Components/ProtectedRoute";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Subscriber = {
  id: number;
  email: string;
  subscribed_at: string;
};

type ApiError = { error?: string };
type SubscribersApiResponse =
  | Subscriber[]
  | { subscribers?: Subscriber[] }
  | ApiError;

export default function SubscribedEmailsAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // ─── Fetch (SAFE PARSE) ─────────────────────────
  const fetchSubscribers = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/subscribed-emails", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: SubscribersApiResponse | null = null;

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
        throw new Error(errMsg || "Failed to fetch subscribers");
      }

      const list: Subscriber[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "subscribers" in result &&
            Array.isArray(result.subscribers)
          ? result.subscribers
          : [];

      setSubscribers(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to load subscribers"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ─── Filter ─────────────────────────────────────
  const filteredSubscribers = useMemo(() => {
    if (!search.trim()) return subscribers;
    const q = search.toLowerCase().trim();
    return subscribers.filter((s) =>
      s.email?.toLowerCase().includes(q)
    );
  }, [subscribers, search]);

  // ─── Delete ─────────────────────────────────────
  const handleDelete = async (id: number, email: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${email}" from subscribers?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `/api/admin/subscribed-emails?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();
      let result: ApiError = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        /* ignore */
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete subscriber");
      }

      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      alert("Subscriber removed successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Copy single email ──────────────────────────
  const handleCopy = async (id: number, email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // ─── Copy all emails ────────────────────────────
  const handleCopyAll = async () => {
    if (filteredSubscribers.length === 0) return;
    try {
      const all = filteredSubscribers.map((s) => s.email).join(", ");
      await navigator.clipboard.writeText(all);
      alert(`${filteredSubscribers.length} emails copied to clipboard!`);
    } catch (err) {
      console.error("Copy all failed:", err);
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
    <ProtectedRoute allowedUser="admin">
      <div className={`min-h-screen bg-white ${dmsans.className}`}>
        <AdminSidebar onCollapseChange={setCollapsed} />

        <main
          className={`transition-all duration-300 ${
            collapsed ? "md:ml-[72px]" : "md:ml-64"
          }`}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="w-full max-w-7xl">
              {/* HEADER */}
              <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
                <div className="text-left">
                  <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
                    Subscribed Emails
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Manage all newsletter subscribers.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* REFRESH */}
                  <button
                    type="button"
                    onClick={fetchSubscribers}
                    disabled={fetching}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiRefreshCw
                      size={12}
                      className={fetching ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>

                  {/* COPY ALL */}
                  {!fetching && filteredSubscribers.length > 0 && (
                    <button
                      type="button"
                      onClick={handleCopyAll}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-black hover:bg-gray-800 transition-all duration-200"
                    >
                      <FiCopy size={12} />
                      Copy All
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH */}
              <div className="mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2 bg-white border border-gray-300 focus-within:border-black transition">
                  <FiSearch className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email..."
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
                  {filteredSubscribers.length} subscriber
                  {filteredSubscribers.length !== 1 ? "s" : ""}
                  {search && ` matching "${search}"`}
                </p>
              )}

              {/* LIST (TABLE) */}
              <div>
                {fetching ? (
                  /* SKELETON LOADER */
                  <div className="overflow-hidden border border-gray-200 bg-white animate-pulse">
                    {/* Header skeleton */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="col-span-1 h-3 bg-gray-200" />
                      <div className="col-span-6 h-3 bg-gray-200" />
                      <div className="col-span-4 h-3 bg-gray-200" />
                      <div className="col-span-1 h-3 bg-gray-200 ml-auto w-12" />
                    </div>

                    {/* Rows skeleton — 5 rows */}
                    <div className="divide-y divide-gray-100">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-3 px-4 py-3 items-center"
                        >
                          <div className="hidden sm:block sm:col-span-1">
                            <div className="h-3 w-6 bg-gray-100" />
                          </div>

                          <div className="sm:col-span-6 flex items-center gap-2">
                            <div className="w-7 h-7 bg-gray-100 shrink-0" />
                            <div className="h-3.5 w-48 bg-gray-200" />
                          </div>

                          <div className="sm:col-span-4">
                            <div className="h-3 w-32 bg-gray-100" />
                          </div>

                          <div className="sm:col-span-1 flex items-center gap-1.5 sm:justify-end">
                            <div className="w-7 h-7 bg-gray-100" />
                            <div className="w-7 h-7 bg-gray-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : subscribers.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No subscribers yet.
                  </div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No subscribers match your search.
                  </div>
                ) : (
                  <div className="overflow-hidden border border-gray-200 bg-white">
                    {/* TABLE HEADER */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="col-span-1">#</div>
                      <div className="col-span-6">Email</div>
                      <div className="col-span-4">Subscribed</div>
                      <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* ROWS */}
                    <div className="divide-y divide-gray-100">
                      {filteredSubscribers.map((sub, index) => (
                        <div
                          key={sub.id}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-3 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                        >
                          {/* INDEX */}
                          <div className="hidden sm:block sm:col-span-1 text-[10px] text-gray-400 font-mono">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* EMAIL */}
                          <div className="sm:col-span-6 flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 border border-gray-200">
                              <FiMail size={12} />
                            </div>
                            <p className="text-xs sm:text-sm text-black truncate font-medium">
                              {sub.email}
                            </p>
                          </div>

                          {/* DATE + TIME */}
                          <div className="sm:col-span-4 flex items-center">
                            <p className="text-[10px] sm:text-[11px] text-gray-500">
                              {formatDateTime(sub.subscribed_at)}
                            </p>
                          </div>

                          {/* ACTIONS */}
                          <div className="sm:col-span-1 flex items-center gap-1.5 sm:justify-end">
                            {/* Copy */}
                            <button
                              type="button"
                              onClick={() => handleCopy(sub.id, sub.email)}
                              className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                              aria-label={`Copy ${sub.email}`}
                              title="Copy email"
                            >
                              {copiedId === sub.id ? (
                                <FiCheck size={12} />
                              ) : (
                                <FiCopy size={11} />
                              )}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(sub.id, sub.email)
                              }
                              disabled={deletingId === sub.id}
                              className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label={`Delete ${sub.email}`}
                              title="Delete"
                            >
                              {deletingId === sub.id ? (
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
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}