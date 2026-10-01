"use client";

import { useEffect, useState, useMemo } from "react";
import { DM_Sans } from "next/font/google";
import { FiTrash2, FiSearch, FiX, FiRefreshCw } from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  created_at: string;
};

type ApiError = { error?: string };
type UsersApiResponse = User[] | { users?: User[] } | ApiError;

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  // ─── FETCH (SAFE PARSE) ─────────────────────────
  const fetchUsers = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/users", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: UsersApiResponse | null = null;

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
        throw new Error(errMsg || "Failed to fetch users");
      }

      const list: User[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "users" in result &&
            Array.isArray(result.users)
          ? result.users
          : [];

      setUsers(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to load users"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ─── Filter ─────────────────────────────────────
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase().trim();
    return users.filter(
      (u) =>
        u.first_name?.toLowerCase().includes(q) ||
        u.last_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone_number?.toLowerCase().includes(q)
    );
  }, [users, search]);

  // ─── Delete ─────────────────────────────────────
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("User deleted successfully!");
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

  return (
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
                  Users
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Manage all registered users.
                </p>
              </div>

              {/* REFRESH */}
              <button
                type="button"
                onClick={fetchUsers}
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
                  placeholder="Search by name, email or phone..."
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
                {filteredUsers.length} user
                {filteredUsers.length !== 1 ? "s" : ""}
                {search && ` matching "${search}"`}
              </p>
            )}

            {/* LIST (TABLE) */}
            <div>
              {fetching ? (
                /* SKELETON LOADER — 5 columns */
                <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                  <div className="min-w-[900px]">
                    {/* Header skeleton */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="col-span-3 h-3 bg-gray-200" />
                      <div className="col-span-3 h-3 bg-gray-200" />
                      <div className="col-span-3 h-3 bg-gray-200" />
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
                          <div className="col-span-3 flex items-center gap-2">
                            <div className="w-9 h-9 bg-gray-100 shrink-0" />
                            <div className="h-3.5 w-28 bg-gray-200" />
                          </div>
                          <div className="col-span-3 h-3.5 w-40 bg-gray-200" />
                          <div className="col-span-3 h-3.5 w-24 bg-gray-200" />
                          <div className="col-span-2 h-3.5 w-32 bg-gray-200" />
                          <div className="col-span-1 flex items-center justify-end">
                            <div className="w-8 h-8 bg-gray-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-left text-xs text-gray-500 py-6">
                  No users registered yet.
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-left text-xs text-gray-500 py-6">
                  No users match your search.
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-200 bg-white">
                  <div className="min-w-[900px]">
                    {/* TABLE HEADER — 5 columns */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-3">Email</div>
                      <div className="col-span-3">Phone</div>
                      <div className="col-span-2">Joined</div>
                      <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* ROWS */}
                    <div className="divide-y divide-gray-100">
                      {filteredUsers.map((user) => {
                        const fullName = `${user.first_name} ${user.last_name}`.trim();

                        return (
                          <div
                            key={user.id}
                            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                          >
                            {/* NAME + AVATAR */}
                            <div className="col-span-3 flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 bg-gray-100 text-gray-700 flex items-center justify-center text-[11px] font-bold shrink-0 border border-gray-200">
                                {user.first_name?.[0]?.toUpperCase() || "?"}
                                {user.last_name?.[0]?.toUpperCase() || ""}
                              </div>
                              <p className="text-xs sm:text-sm font-bold text-black truncate">
                                {fullName || "—"}
                              </p>
                            </div>

                            {/* EMAIL */}
                            <div className="col-span-3 min-w-0">
                              <p className="text-[11px] sm:text-xs text-gray-700 truncate">
                                {user.email}
                              </p>
                            </div>

                            {/* PHONE */}
                            <div className="col-span-3 min-w-0">
                              {user.phone_number ? (
                                <p className="text-[11px] sm:text-xs text-gray-700 truncate">
                                  {user.phone_number}
                                </p>
                              ) : (
                                <span className="text-[11px] text-gray-400">
                                  —
                                </span>
                              )}
                            </div>

                            {/* JOINED */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[10px] sm:text-[11px] text-gray-500">
                                {formatDateTime(user.created_at)}
                              </p>
                            </div>

                            {/* ACTION */}
                            <div className="col-span-1 flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(user.id, fullName || user.email)
                                }
                                disabled={deletingId === user.id}
                                className="flex items-center justify-center w-8 h-8 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Delete ${fullName}`}
                                title="Delete user"
                              >
                                {deletingId === user.id ? (
                                  <span className="block w-3.5 h-3.5 animate-spin border-2 border-current border-t-transparent" />
                                ) : (
                                  <FiTrash2 size={14} />
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
    </div>
  );
}