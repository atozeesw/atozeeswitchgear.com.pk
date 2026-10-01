"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";
import {
  FiHome,
  FiBox,
  FiLayers,
  FiUsers,
  FiFileText,
  FiUser,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiSend,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type SubItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: SubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/admin",
    icon: <FiHome size={18} />,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: <FiBox size={18} />,
  },
  {
    label: "Our Solutions",
    href: "/admin/our-solutions",
    icon: <FiLayers size={18} />,
  },
  {
    label: "Our Clients",
    href: "/admin/our-clients",
    icon: <FiUsers size={18} />,
  },
  {
    label: "News",
    href: "/admin/news",
    icon: <FiFileText size={18} />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <FiUser size={18} />,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: <FiMail size={18} />,
  },
  {
    label: "Careers",
    icon: <FiBriefcase size={18} />,
    children: [
      { label: "Jobs", href: "/admin/jobs" },
      { label: "Job Applications", href: "/admin/job-applications" },
    ],
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: <FiPhone size={18} />,
  },
  {
    label: "Subscribed Emails",
    href: "/admin/subscribed-emails",
    icon: <FiSend size={18} />,
  },
];

const LOGO = "/quality.png";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

const AdminSidebar = ({
  isOpen = false,
  onClose,
  onCollapseChange,
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Track which dropdown is open — default: Careers opens if route matches
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Auto-open dropdown if current path matches a child
  useEffect(() => {
    const careersItem = NAV_ITEMS.find((i) => i.children);
    if (
      careersItem &&
      careersItem.children?.some((c) => pathname?.startsWith(c.href))
    ) {
      setOpenDropdown(careersItem.label);
    }
  }, [pathname]);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (onCollapseChange) onCollapseChange(next);
  };

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  // =========================
  // ADMIN LOGOUT
  // =========================
  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_user");
      }

      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (onClose) onClose();
      router.replace("/admin/login");
      router.refresh();
      setLoggingOut(false);
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.href) return isActive(item.href);
    if (item.children) {
      return item.children.some((c) => pathname?.startsWith(c.href));
    }
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[998] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${dmSans.className}
          fixed top-0 left-0 h-screen
          bg-white border-r border-gray-200
          flex flex-col
          transition-all duration-300 ease-in-out
          z-[999] md:z-[100]
          ${collapsed ? "w-[72px]" : "w-64"}
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div
          className={`
            flex items-center border-b border-gray-200
            transition-all duration-300
            ${
              collapsed
                ? "justify-center py-4 px-2"
                : "justify-between px-4 py-3"
            }
          `}
        >
          {!collapsed && (
            <Link
              href="/admin"
              className="flex items-center min-w-0"
              title="Admin Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO}
                alt="A to Zee Switchgear Engineering"
                className="h-10 w-auto object-contain"
              />
            </Link>
          )}

          <button
            type="button"
            onClick={handleToggle}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-200 shrink-0"
            aria-label={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FiChevronRight size={16} />
            ) : (
              <FiChevronLeft size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-200 shrink-0"
            aria-label="Close sidebar"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isParentActive(item);
            const hasChildren = !!item.children?.length;
            const isOpenDropdown = openDropdown === item.label;

            // ─── Simple link (no children) ───
            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={`
                    group flex items-center gap-3
                    px-3 py-2.5 rounded-md
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              );
            }

            // ─── Dropdown (has children) ───
            return (
              <div key={item.label}>
                {/* Parent button */}
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) {
                      // When collapsed, expand first
                      handleToggle();
                      setOpenDropdown(item.label);
                    } else {
                      handleDropdownToggle(item.label);
                    }
                  }}
                  className={`
                    w-full group flex items-center gap-3
                    px-3 py-2.5 rounded-md
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    }
                    ${collapsed ? "justify-center" : "justify-between"}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </span>

                  {!collapsed && (
                    <span className="shrink-0">
                      {isOpenDropdown ? (
                        <FiChevronUp size={14} />
                      ) : (
                        <FiChevronDown size={14} />
                      )}
                    </span>
                  )}
                </button>

                {/* Sub items */}
                {!collapsed && isOpenDropdown && item.children && (
                  <div className="mt-1 ml-3 pl-3 border-l border-gray-200 space-y-0.5">
                    {item.children.map((child) => {
                      const childActive = pathname?.startsWith(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            if (onClose) onClose();
                          }}
                          className={`
                            block px-3 py-2 rounded-md
                            text-[13px] font-medium
                            transition-all duration-200
                            ${
                              childActive
                                ? "bg-gray-100 text-black"
                                : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={`
              w-full flex items-center gap-3
              px-3 py-2.5 rounded-md
              text-sm font-medium
              transition-all duration-200
              text-red-600
              hover:bg-gray-100 hover:text-red-500
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? "Logout" : undefined}
          >
            <FiLogOut
              size={18}
              className={`shrink-0 ${
                loggingOut ? "animate-pulse" : ""
              }`}
            />
            {!collapsed && (
              <span>
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>

          {!collapsed && (
            <p className="px-3 pt-2 pb-1 text-[10px] text-gray-400 leading-relaxed text-center border-t border-gray-100">
              Developed by{" "}
              <span className="font-semibold text-gray-600">
                Muhammad Hassan Jaffer
              </span>
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;