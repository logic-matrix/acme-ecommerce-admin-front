"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Icon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, ReactNode, cloneElement, useState } from "react";
import { SiAmazon, SiShopify } from "react-icons/si";

type LucideIconProps = React.ComponentProps<typeof Icon>;

interface NavItemProps {
  icon: ReactElement<LucideIconProps>;
  children: ReactNode;
  collapsed: boolean;
  active?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  href?: string;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  children,
  collapsed,
  active = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  href = "#",
  onClick,
}: NavItemProps) => {
  // If it has a submenu, we want to handle the click to toggle the submenu
  // Otherwise, it should behave as a normal link
  const handleClick = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`flex items-center p-2.5 rounded-lg transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="flex-shrink-0">
        {cloneElement(icon, {
          size: 20,
          className: active ? "text-blue-500" : "text-gray-500",
        })}
      </span>
      {!collapsed && (
        <span className="ml-3 flex-1 text-sm font-semibold flex justify-between items-center">
          {children}
          {hasSubmenu && (
            <span>
              {isSubmenuOpen ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </span>
          )}
        </span>
      )}
    </Link>
  );
};

interface SubMenuItemProps {
  children: ReactNode;
  collapsed: boolean;
  href: string;
}

const SubMenuItem = ({ children, collapsed, href }: SubMenuItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center text-sm p-2 pl-11 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
        collapsed ? "hidden" : "block"
      }`}
    >
      {children}
    </Link>
  );
};

interface DashboardSideNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const DashboardSideNav = ({
  collapsed,
  setCollapsed,
}: DashboardSideNavProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full fixed left-0 top-0 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Section with Logo */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between h-16">
        {!collapsed ? (
          <div className="flex items-center">
            <Image
              src="/acme-electronics.svg"
              alt="ACME Electronics Logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
        ) : (
          <Zap className="text-orange-500 mx-auto" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-2 overflow-y-auto h-[calc(100%-4rem)]">
        {/* Main Navigation */}
        <div className="px-3 space-y-1 py-2">
          <NavItem
            icon={<LayoutDashboard />}
            collapsed={collapsed}
            active
            href="/dashboard"
          >
            Dashboard
          </NavItem>

          {/* Products with submenu */}
          <div>
            <NavItem
              icon={<Package />}
              collapsed={collapsed}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "products"}
              onClick={() => toggleSubmenu("products")}
            >
              Products
            </NavItem>
            {openSubmenu === "products" && !collapsed && (
              <div className="space-y-1">
                <SubMenuItem href="/products" collapsed={collapsed}>
                  All Products
                </SubMenuItem>
                <SubMenuItem href="/products/categories" collapsed={collapsed}>
                  Categories
                </SubMenuItem>
                <SubMenuItem href="/products/new" collapsed={collapsed}>
                  Add New
                </SubMenuItem>
              </div>
            )}
          </div>

          <NavItem icon={<ShoppingCart />} collapsed={collapsed} href="/orders">
            Orders
          </NavItem>
          <NavItem icon={<Users />} collapsed={collapsed} href="/category">
            Category
          </NavItem>
          <NavItem icon={<Users />} collapsed={collapsed} href="/users">
            Users
          </NavItem>
        </div>

        <div className="border-t border-gray-200 mx-3 my-2"></div>

        {/* Integrations */}
        <div className="px-3 space-y-1 py-2">
          {!collapsed && (
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Integrations
            </p>
          )}
          <NavItem
            icon={<SiAmazon />}
            collapsed={collapsed}
            href="/integrations/amazon"
          >
            Amazon
          </NavItem>
          <NavItem
            icon={<SiShopify />}
            collapsed={collapsed}
            href="/integrations/shopify"
          >
            Shopify
          </NavItem>
        </div>

        <div className="border-t border-gray-200 mx-3 my-2"></div>

        {/* Settings */}
        <div className="px-3 space-y-0.5 py-1.5">
          <NavItem icon={<Settings />} collapsed={collapsed} href="/settings">
            Settings
          </NavItem>
          <NavItem icon={<LogOut />} collapsed={collapsed} href="/logout">
            Logout
          </NavItem>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSideNav;
