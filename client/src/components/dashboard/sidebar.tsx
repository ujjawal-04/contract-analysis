"use client";
import { FileText, Home, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white text-black">
      <SidebarContent />
    </aside>
  );
};

const SidebarContent = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: FileText,
      label: "Results",
      href: "/dashboard/results",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-full bg-white text-black">
      <nav className="flex-grow p-6">
        <ul role="list" className="flex flex-col flex-grow">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarItems.map((item) => (
                <Navlink key={item.label} path={pathname} link={item} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Navlink = ({
  path,
  link,
}: {
  path: string;
  link: {
    icon: ElementType;
    label: string;
    href: string;
    target?: string;
  };
}) => {
  const isActive = path === link.href;

  return (
    <li>
      <Link
        href={link.href}
        target={link.target}
        className={cn(
          "group flex h-9 items-center gap-x-3 rounded-md px-3 text-sm font-semibold leading-5 transition-colors",
          isActive ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50"
        )}
      >
        <link.icon className="size-4" />
        <span className="ml-4">{link.label}</span>
      </Link>
    </li>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
