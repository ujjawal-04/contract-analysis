"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { UserButton } from "./shared/user-button";
import { motion } from "framer-motion";

const navItems: { name: string; href: string }[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/pricing" },
  { name: "Privacy policy", href: "/privacy" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link href={"/"} className="mr-8 flex items-center">
            <span className="text-lg font-bold text-blue-600">Logo</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-blue-600",
                    pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : "text-slate-700"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserButton />
          </motion.div>
        </div>
      </div>
    </header>
  );
}