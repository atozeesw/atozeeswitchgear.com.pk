"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { FiEdit2, FiTrash2, FiX, FiPlus, FiRefreshCw } from "react-icons/fi";
import AdminSidebar from "@/app/Components/admin";
import ProtectedRoute from "@/app/Components/ProtectedRoute";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Solution = {
  id: number;
  product_image: string;
  product_title: string;
  brand_image: string;
  created_at: string;
};

type ApiError = { error?: string };
type SolutionsApiResponse =
  | Solution[]
  | { products?: Solution[] }
  | ApiError;

export default function OurSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [fetching, setFetching] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Edit modal
  const [editItem, setEditItem] = useState<Solution | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editProductImage, setEditProductImage] = useState<File | null>(null);
  const [editBrandImage, setEditBrandImage] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fileProductRef = useRef<HTMLInputElement>(null);
  const fileBrandRef = useRef<HTMLInputElement>(null);
  const editProductRef = useRef<HTMLInputElement>(null);
  const editBrandRef = useRef<HTMLInputElement>(null);

  const API_BASE = "/api/admin/our-solutions";

  // ─── GET ──────────────────────────────────────────
  const fetchSolutions = async () => {
    try {
      setFetching(true);

      const response = await fetch(API_BASE, {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: SolutionsApiResponse | null = null;

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
        throw new Error(errMsg || "Failed to fetch solutions");
      }

      const list: Solution[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "products" in result &&
            Array.isArray(result.products)
          ? result.products
          : [];

      setSolutions(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to load products"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // ─── Add modal helpers ────────────────────────────
  const openAddModal = () => {
    setProductTitle("");
    setProductImage(null);
    setBrandImage(null);
    if (fileProductRef.current) fileProductRef.current.value = "";
    if (fileBrandRef.current) fileBrandRef.current.value = "";
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setProductTitle("");
    setProductImage(null);
    setBrandImage(null);
    if (fileProductRef.current) fileProductRef.current.value = "";
    if (fileBrandRef.current) fileBrandRef.current.value = "";
  };

  // ─── SUBMIT (ADD) ────────────────────────────────
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (!productTitle.trim()) return alert("Please enter product title");
    if (!productImage) return alert("Please select product image");
    if (!brandImage) return alert("Please select brand image");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("product_title", productTitle.trim());
      formData.append("product_image", productImage);
      formData.append("brand_image", brandImage);

      const response = await fetch(API_BASE, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add product");
      }

      closeAddModal();
      await fetchSolutions();
      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Open edit ───────────────────────────────────
  const openEdit = (item: Solution) => {
    setEditItem(item);
    setEditTitle(item.product_title);
    setEditProductImage(null);
    setEditBrandImage(null);
  };

  const closeEdit = () => {
    setEditItem(null);
    setEditTitle("");
    setEditProductImage(null);
    setEditBrandImage(null);
    if (editProductRef.current) editProductRef.current.value = "";
    if (editBrandRef.current) editBrandRef.current.value = "";
  };

  // ─── SAVE EDIT ───────────────────────────────────
  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editItem || editLoading) return;

    if (!editTitle.trim()) return alert("Please enter product title");

    try {
      setEditLoading(true);

      const formData = new FormData();
      formData.append("id", String(editItem.id));
      formData.append("product_title", editTitle.trim());
      if (editProductImage)
        formData.append("product_image", editProductImage);
      if (editBrandImage) formData.append("brand_image", editBrandImage);

      const response = await fetch(API_BASE, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      closeEdit();
      await fetchSolutions();
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ─── DELETE ──────────────────────────────────────
  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(`${API_BASE}?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete product");
      }

      setSolutions((prev) => prev.filter((s) => s.id !== id));
      alert("Product deleted successfully!");
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
                    Our Solutions
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add and manage your products.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* REFRESH */}
                  <button
                    type="button"
                    onClick={fetchSolutions}
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
                    Add Solution
                  </button>
                </div>
              </div>

              {/* COUNTER */}
              {!fetching && (
                <p className="mb-3 text-[11px] text-gray-500">
                  {solutions.length} solution
                  {solutions.length !== 1 ? "s" : ""}
                </p>
              )}

              {/* LIST (TABLE) */}
              <div>
                {fetching ? (
                  /* SKELETON LOADER */
                  <div className="overflow-x-auto border border-gray-200 bg-white animate-pulse">
                    <div className="min-w-[900px]">
                      {/* Header skeleton */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="col-span-2 h-3 bg-gray-200" />
                        <div className="col-span-4 h-3 bg-gray-200" />
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
                            <div className="col-span-2">
                              <div className="w-12 h-12 bg-gray-100" />
                            </div>
                            <div className="col-span-4 h-3.5 w-40 bg-gray-200" />
                            <div className="col-span-3">
                              <div className="w-20 h-8 bg-gray-100" />
                            </div>
                            <div className="col-span-2 h-3 w-32 bg-gray-100" />
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <div className="w-7 h-7 bg-gray-100" />
                              <div className="w-7 h-7 bg-gray-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : solutions.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No solutions added yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 bg-white">
                    <div className="min-w-[900px]">
                      {/* TABLE HEADER */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-2">Product</div>
                        <div className="col-span-4">Title</div>
                        <div className="col-span-3">Brand</div>
                        <div className="col-span-2">Added</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>

                      {/* ROWS */}
                      <div className="divide-y divide-gray-100">
                        {solutions.map((solution) => (
                          <div
                            key={solution.id}
                            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                          >
                            {/* PRODUCT IMAGE */}
                            <div className="col-span-2">
                              <div className="relative w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                                {solution.product_image ? (
                                  <Image
                                    src={solution.product_image}
                                    alt={solution.product_title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-gray-400 text-[8px]">
                                    No image
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* TITLE */}
                            <div className="col-span-4 min-w-0">
                              <p className="text-xs font-bold text-black truncate">
                                {solution.product_title}
                              </p>
                            </div>

                            {/* BRAND IMAGE */}
                            <div className="col-span-3 flex items-center">
                              <div className="relative w-20 h-8 overflow-hidden bg-white border border-gray-200 px-1.5">
                                {solution.brand_image &&
                                solution.brand_image.trim() !== "" ? (
                                  <Image
                                    src={solution.brand_image}
                                    alt="Brand"
                                    fill
                                    className="object-contain object-left"
                                    sizes="80px"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-gray-400 text-[9px]">
                                    No image
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* DATE + TIME */}
                            <div className="col-span-2 flex items-center">
                              <p className="text-[10px] text-gray-500">
                                {formatDateTime(solution.created_at)}
                              </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => openEdit(solution)}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                                aria-label={`Edit ${solution.product_title}`}
                                title="Edit"
                              >
                                <FiEdit2 size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    solution.id,
                                    solution.product_title
                                  )
                                }
                                disabled={deletingId === solution.id}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Delete ${solution.product_title}`}
                                title="Delete"
                              >
                                {deletingId === solution.id ? (
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
                <h3 className="text-base font-bold text-black">
                  Add Solution
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

              <form onSubmit={handleSubmit} className="p-5 space-y-3">
                <input
                  type="text"
                  value={productTitle}
                  disabled={loading}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Product Title"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
                />

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Product Image
                  </label>
                  <input
                    ref={fileProductRef}
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    onChange={(e) =>
                      setProductImage(e.target.files?.[0] || null)
                    }
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />
                  {productImage && (
                    <p className="mt-1.5 text-[10px] text-gray-500">
                      Selected: {productImage.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Brand Image
                  </label>
                  <input
                    ref={fileBrandRef}
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    onChange={(e) =>
                      setBrandImage(e.target.files?.[0] || null)
                    }
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />
                  {brandImage && (
                    <p className="mt-1.5 text-[10px] text-gray-500">
                      Selected: {brandImage.name}
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
                <h3 className="text-base font-bold text-black">
                  Edit Solution
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

              <form onSubmit={handleEditSubmit} className="p-5 space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  disabled={editLoading}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Product Title"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
                />

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Replace Product Image (optional)
                  </label>
                  <input
                    ref={editProductRef}
                    type="file"
                    accept="image/*"
                    disabled={editLoading}
                    onChange={(e) =>
                      setEditProductImage(e.target.files?.[0] || null)
                    }
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />
                  {editProductImage && (
                    <p className="mt-1.5 text-[10px] text-gray-500">
                      Selected: {editProductImage.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Replace Brand Image (optional)
                  </label>
                  <input
                    ref={editBrandRef}
                    type="file"
                    accept="image/*"
                    disabled={editLoading}
                    onChange={(e) =>
                      setEditBrandImage(e.target.files?.[0] || null)
                    }
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />
                  {editBrandImage && (
                    <p className="mt-1.5 text-[10px] text-gray-500">
                      Selected: {editBrandImage.name}
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
    </ProtectedRoute>
  );
}