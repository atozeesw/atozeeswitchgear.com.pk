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

const PRODUCT_CATEGORIES = [
  "Low Voltage Switchgear Panels",
  "Type Tested Panels",
  "Medium Voltage Switchgears",
  "Cable Trays And Ladders",
];

type Product = {
  id: number;
  product_images: string[];
  product_title: string;
  product_description: string;
  product_category: string;
  created_at: string;
};

type ApiError = { error?: string };
type ProductsApiResponse = Product[] | { products?: Product[] } | ApiError;

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit modal
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImages, setEditImages] = useState<File[]>([]);
  const [editLoading, setEditLoading] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // ─── Fetch ────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/admin/products", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let result: ProductsApiResponse | null = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        console.error("Non-JSON response from /api/admin/products:", text);
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        const errMsg =
          result && !Array.isArray(result) && "error" in result
            ? result.error
            : undefined;
        throw new Error(errMsg || "Failed to fetch products");
      }

      const list: Product[] = Array.isArray(result)
        ? result
        : result &&
            typeof result === "object" &&
            "products" in result &&
            Array.isArray(result.products)
          ? result.products
          : [];

      setProducts(list);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to load products"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ─── Add modal ────────────────────────────────────
  const openAddModal = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setProductImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setProductImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (fileArray.length > 10) {
      alert("Maximum 10 images allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        alert(`"${file.name}" is not an image`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" is larger than 5MB`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    setProductImages(fileArray);
  };

  const removeImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Add product ──────────────────────────────────
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    if (!title.trim()) return alert("Please enter product title");
    if (!description.trim()) return alert("Please enter product description");
    if (!category) return alert("Please select product category");
    if (productImages.length === 0) {
      alert("Please select at least 1 product image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("product_title", title.trim());
      formData.append("product_description", description.trim());
      formData.append("product_category", category);

      productImages.forEach((file) => {
        formData.append("product_images", file);
      });

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let result: ApiError | null = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        throw new Error(result?.error || "Failed to add product");
      }

      closeAddModal();
      await fetchProducts();
      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ─── Edit ─────────────────────────────────────────
  const openEdit = (item: Product) => {
    setEditItem(item);
    setEditTitle(item.product_title);
    setEditDescription(item.product_description);
    setEditCategory(item.product_category);
    setEditImages([]);
  };

  const closeEdit = () => {
    setEditItem(null);
    setEditTitle("");
    setEditDescription("");
    setEditCategory("");
    setEditImages([]);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editItem || editLoading) return;

    if (!editTitle.trim()) return alert("Please enter product title");
    if (!editDescription.trim())
      return alert("Please enter product description");
    if (!editCategory) return alert("Please select product category");

    try {
      setEditLoading(true);

      const formData = new FormData();
      formData.append("id", String(editItem.id));
      formData.append("product_title", editTitle.trim());
      formData.append("product_description", editDescription.trim());
      formData.append("product_category", editCategory);

      editImages.forEach((file) => {
        formData.append("product_images", file);
      });

      const response = await fetch("/api/admin/products", {
        method: "PUT",
        body: formData,
      });

      const text = await response.text();
      let result: ApiError | null = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!response.ok) {
        throw new Error(result?.error || "Failed to update product");
      }

      closeEdit();
      await fetchProducts();
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setEditLoading(false);
    }
  };

  // ─── Delete ───────────────────────────────────────
  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;
    if (deletingId !== null) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (fileArray.length > 10) {
      alert("Maximum 10 images allowed");
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      return;
    }

    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        alert(`"${file.name}" is not an image`);
        if (editFileInputRef.current) editFileInputRef.current.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" is larger than 5MB`);
        if (editFileInputRef.current) editFileInputRef.current.value = "";
        return;
      }
    }

    setEditImages(fileArray);
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
                    Products
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add and manage company products.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* REFRESH */}
                  <button
                    type="button"
                    onClick={fetchProducts}
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
                    Add Product
                  </button>
                </div>
              </div>

              {/* COUNTER */}
              {!fetching && (
                <p className="mb-3 text-[11px] text-gray-500">
                  {products.length} product
                  {products.length !== 1 ? "s" : ""}
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
                        <div className="col-span-3 h-3 bg-gray-200" />
                        <div className="col-span-4 h-3 bg-gray-200" />
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
                            <div className="col-span-3 h-3.5 w-32 bg-gray-200" />
                            <div className="col-span-4 flex flex-col gap-1.5">
                              <div className="h-3 w-48 bg-gray-100" />
                              <div className="h-3 w-64 bg-gray-100" />
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
                ) : products.length === 0 ? (
                  <div className="text-left text-xs text-gray-500 py-6">
                    No products added yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 bg-white">
                    <div className="min-w-[900px]">
                      {/* TABLE HEADER — 5 columns */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-2">Image</div>
                        <div className="col-span-3">Title</div>
                        <div className="col-span-4">Description</div>
                        <div className="col-span-2">Added</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>

                      {/* ROWS */}
                      <div className="divide-y divide-gray-100">
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
                          >
                            {/* IMAGE */}
                            <div className="col-span-2">
                              <div className="relative w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                                {Array.isArray(product.product_images) &&
                                product.product_images[0] ? (
                                  <Image
                                    src={product.product_images[0]}
                                    alt={product.product_title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-gray-400 text-[8px]">
                                    No img
                                  </div>
                                )}

                                {Array.isArray(product.product_images) &&
                                  product.product_images.length > 1 && (
                                    <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 text-[8px] font-bold text-white">
                                      +{product.product_images.length - 1}
                                    </span>
                                  )}
                              </div>
                            </div>

                            {/* TITLE */}
                            <div className="col-span-3 min-w-0">
                              <p className="text-xs font-bold text-black truncate">
                                {product.product_title}
                              </p>
                              <span className="inline-block bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-700 line-clamp-1 max-w-full mt-1">
                                {product.product_category}
                              </span>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="col-span-4 min-w-0">
                              <p className="text-[11px] text-gray-500 line-clamp-2">
                                {product.product_description}
                              </p>
                            </div>

                            {/* DATE + TIME */}
                            <div className="col-span-2 min-w-0">
                              <p className="text-[10px] text-gray-500">
                                {formatDateTime(product.created_at)}
                              </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-1 flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => openEdit(product)}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                                aria-label={`Edit ${product.product_title}`}
                                title="Edit"
                              >
                                <FiEdit2 size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(product.id, product.product_title)
                                }
                                disabled={deletingId === product.id}
                                className="flex items-center justify-center w-7 h-7 bg-white text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Delete ${product.product_title}`}
                                title="Delete"
                              >
                                {deletingId === product.id ? (
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
                <h3 className="text-base font-bold text-black">Add Product</h3>
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
                <select
                  value={category}
                  disabled={loading}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 bg-white focus:border-black outline-none transition"
                >
                  <option value="">Select product category</option>
                  {PRODUCT_CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={title}
                  disabled={loading}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Product Title"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
                />

                <textarea
                  value={description}
                  disabled={loading}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product Description"
                  rows={4}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
                />

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Product Images{" "}
                    <span className="text-gray-400 font-normal">
                      (max 10, 5MB each)
                    </span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={loading}
                    onChange={handleImagesChange}
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />

                  {productImages.length > 0 && (
                    <div className="mt-2">
                      <p className="mb-1.5 text-[10px] text-gray-500">
                        {productImages.length} image
                        {productImages.length > 1 ? "s" : ""} selected
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {productImages.map((file, index) => (
                          <div
                            key={index}
                            className="relative aspect-square overflow-hidden border border-gray-200 bg-gray-50"
                          >
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                              unoptimized
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center bg-black text-white text-[9px] z-10"
                              aria-label="Remove image"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                <h3 className="text-base font-bold text-black">Edit Product</h3>
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
                <select
                  value={editCategory}
                  disabled={editLoading}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 bg-white focus:border-black outline-none transition"
                >
                  <option value="">Select product category</option>
                  {PRODUCT_CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={editTitle}
                  disabled={editLoading}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Product Title"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500"
                />

                <textarea
                  value={editDescription}
                  disabled={editLoading}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Product Description"
                  rows={4}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm text-black border border-gray-300 focus:border-black outline-none transition bg-white placeholder:text-gray-500 resize-none"
                />

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Replace Images (optional)
                  </label>

                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={editLoading}
                    onChange={handleEditImagesChange}
                    className="w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:border file:border-black file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-all file:duration-200 cursor-pointer"
                  />

                  {editImages.length > 0 && (
                    <p className="mt-1.5 text-[10px] text-gray-500">
                      {editImages.length} image
                      {editImages.length > 1 ? "s" : ""} selected
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