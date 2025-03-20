"use client";

import Input from "@/components/input";
import { footerMenus, menus, subMenus } from "@/constants/menuData";
import { useSearch } from "@/context/SearchContext";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import Menu from "../menu";

interface SearchSuggestion {
  name: string;
  href: string;
  detail?: string;
  icon?: React.ReactNode;
}

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { searchQuery, setSearchQuery } = useSearch();

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const allItems = [
        ...footerMenus,
        ...subMenus
          .flatMap((item) => item.children || [])
          .filter((child) => child.isDone),
      ];

      const filtered = allItems
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            item.href
        )
        .map((item) => ({
          name: item.name,
          href: item.href as string,
          detail: item.detail,
          icon: item.icon,
        }))
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          router.push(suggestions[selectedIndex].href);
          setShowSuggestions(false);
          setSearchQuery("");
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx(
        "rounded-tr-lg border-r-1 border-gray-300 transition-all duration-300 ease-in-out flex flex-col h-screen",
        collapsed ? "w-[350px]" : "w-[60px]"
      )}
      suppressHydrationWarning
    >
      {/* Header and Search */}
      <div className="flex-none">
        <div
          className="px-3 py-2 text-2xl ms-1 cursor-pointer"
          onClick={toggleCollapsed}
        >
          <RxHamburgerMenu />
        </div>

        <div className="relative">
          {collapsed ? (
            <>
              <Input
                type="text"
                placeholder="Search..."
                suffix={<GoSearch />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {suggestions.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <div
                        key={index}
                        className={clsx(
                          "p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2",
                          index === selectedIndex && "bg-gray-100"
                        )}
                        onClick={() => {
                          setShowSuggestions(false);
                        }}
                      >
                        {item.icon && (
                          <div className="text-xl">{item.icon}</div>
                        )}
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          {item.detail && (
                            <div className="text-xs text-gray-500">
                              {item.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="px-3 pt-4 pb-3 text-2xl ms-1 cursor-pointer">
              <GoSearch />
            </div>
          )}
        </div>

        <div className="border-b-1 border-gray-300">
          <Menu items={menus} collapsed={collapsed} />
        </div>
      </div>

      {/* Submenus with Scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <Menu items={subMenus} collapsed={collapsed} />
      </div>

      {/* Footer Menus */}
      <div className="flex-none border-t-1 border-gray-300">
        <Menu items={footerMenus} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default SideBar;
