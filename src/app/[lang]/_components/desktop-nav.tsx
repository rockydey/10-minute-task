"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface DesktopNavbarProps {
  nextLang: "bn" | "en";
  switchLang: () => void;
}

interface MenuItem {
  title: string;
  dropdown?: {
    label: string;
    icon: string;
    color: string;
  }[];
}

const menuItemsEn: MenuItem[] = [
  {
    title: "Class 6–12",
    dropdown: [
      { label: "HSC", icon: "H", color: "bg-rose-300" },
      { label: "Class Ten", icon: "10", color: "bg-yellow-300" },
      { label: "Class Nine", icon: "9", color: "bg-teal-300" },
      { label: "Class Eight", icon: "8", color: "bg-orange-300" },
      { label: "Class Seven", icon: "7", color: "bg-yellow-300" },
      { label: "Class Six", icon: "6", color: "bg-blue-300" },
    ],
  },
  {
    title: "Skills",
    dropdown: [
      { label: "Web Dev", icon: "WD", color: "bg-green-300" },
      { label: "Graphics", icon: "G", color: "bg-purple-300" },
      { label: "Presentation", icon: "P", color: "bg-red-300" },
    ],
  },
  {
    title: "Admission",
    // dropdown: [
    //   { label: "Medical", icon: "M", color: "bg-indigo-300" },
    //   { label: "Engineering", icon: "E", color: "bg-cyan-300" },
    // ],
  },
  {
    title: "Online Batch",
    dropdown: [
      { label: "Batch A", icon: "A", color: "bg-emerald-300" },
      { label: "Batch B", icon: "B", color: "bg-sky-300" },
    ],
  },
  {
    title: "English Centre",
    dropdown: [
      { label: "IELTS", icon: "I", color: "bg-yellow-400" },
      { label: "Spoken English", icon: "SE", color: "bg-pink-300" },
    ],
  },
  {
    title: "More",
    dropdown: [
      { label: "Books", icon: "B", color: "bg-gray-300" },
      { label: "Support", icon: "S", color: "bg-red-200" },
      { label: "Blog", icon: "BL", color: "bg-orange-200" },
    ],
  },
];

const menuItemsBn: MenuItem[] = [
  {
    title: "ষষ্ঠ - দ্বাদশ শ্রেণি",
    dropdown: [
      { label: "এইচএসসি", icon: "H", color: "bg-rose-300" },
      { label: "দশম শ্রেণি", icon: "10", color: "bg-yellow-300" },
      { label: "নবম শ্রেণি", icon: "9", color: "bg-teal-300" },
      { label: "অষ্টম শ্রেণি", icon: "8", color: "bg-orange-300" },
      { label: "সপ্তম শ্রেণি", icon: "7", color: "bg-yellow-300" },
      { label: "ষষ্ঠ শ্রেণি", icon: "6", color: "bg-blue-300" },
    ],
  },
  {
    title: "স্কিলস",
    dropdown: [
      { label: "ওয়েব ডেভেলপমেন্ট", icon: "WD", color: "bg-green-300" },
      { label: "গ্রাফিক্স ডিজাইন", icon: "G", color: "bg-purple-300" },
      { label: "প্রেজেন্টেশন", icon: "P", color: "bg-red-300" },
    ],
  },
  {
    title: "ভর্তি",
    // dropdown: [
    //   { label: "মেডিকেল", icon: "M", color: "bg-indigo-300" },
    //   { label: "ইঞ্জিনিয়ারিং", icon: "E", color: "bg-cyan-300" },
    // ],
  },
  {
    title: "অনলাইন ব্যাচ",
    dropdown: [
      { label: "ব্যাচ এ", icon: "A", color: "bg-emerald-300" },
      { label: "ব্যাচ বি", icon: "B", color: "bg-sky-300" },
    ],
  },
  {
    title: "ইংলিশ সেন্টার",
    dropdown: [
      { label: "আইইএলটিএস", icon: "I", color: "bg-yellow-400" },
      { label: "স্পোকেন ইংলিশ", icon: "SE", color: "bg-pink-300" },
    ],
  },
  {
    title: "আরও",
    dropdown: [
      { label: "বই", icon: "B", color: "bg-gray-300" },
      { label: "সাপোর্ট", icon: "S", color: "bg-red-200" },
      { label: "ব্লগ", icon: "BL", color: "bg-orange-200" },
    ],
  },
];

const DesktopNavbar = ({ nextLang, switchLang }: DesktopNavbarProps) => {
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (index: number) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setHoveredIndex(index);
    setVisibleIndex(index);
  };

  const handleMouseLeave = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      setHoveredIndex(null);
      setVisibleIndex(null);
      timerIdRef.current = null;
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setVisibleIndex(hoveredIndex);
    } else {
      setVisibleIndex(null);
    }
  }, [hoveredIndex]);

  const searchSuggestions = [
    "HSC 25 নতুন মুক্তির প্রস্তুতি ...",
    "hsc 26",
    "english",
    "ielts",
    "১ম শ্রেণী - জানুয়ারি ব্যাচ ২০২৫",
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 left-0">
      <div className="max-w-container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
              alt="Logo"
              width={100}
              height={28}
            />
          </Link>

          {/* Search Bar */}
          <div className="max-w-80 mx-8 relative" ref={searchDropdownRef}>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="24"
                fill="none"
                viewBox="0 0 27 24"
                className="absolute top-[7px] left-2.5"
              >
                <path fill="#fff" d="M0 0H26.514V23.99H0z"></path>
                <path
                  fill="#111827"
                  d="M21.247 20.065l-2.83-2.82a6.59 6.59 0 001.407-4.078 6.657 6.657 0 10-6.657 6.657 6.59 6.59 0 004.077-1.407l2.82 2.83a.834.834 0 001.365-.271.833.833 0 00-.182-.911zM8.174 13.167a4.993 4.993 0 119.985 0 4.993 4.993 0 01-9.985 0z"
                ></path>
                <path
                  fill="#F1844C"
                  d="M3.875.975l1.238 1.807c.33.481.853.794 1.433.857l2.178.236-1.807 1.239c-.481.33-.794.852-.857 1.432l-.237 2.178-1.238-1.807a1.998 1.998 0 00-1.432-.857L.974 5.824l1.808-1.239c.48-.33.794-.853.857-1.432L3.875.975zM8.59 19.77l-.337.54a1.998 1.998 0 00-.21 1.656l.19.607-.54-.337a1.998 1.998 0 00-1.655-.21l-.607.19.337-.54c.308-.494.385-1.099.21-1.655l-.19-.607.54.337c.494.308 1.099.385 1.655.21l.607-.19zM23.575 6.068l.223 1.396c.092.576.43 1.083.927 1.388l1.205.74-1.396.222a1.998 1.998 0 00-1.388.928l-.74 1.204-.222-1.396a1.997 1.997 0 00-.927-1.387l-1.205-.74 1.396-.223a1.997 1.997 0 001.388-.927l.74-1.205z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="স্কিলস কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none placeholder:text-sm "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchDropdownOpen(true)}
              />
            </div>

            {isSearchDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                <div className="p-3 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-600">
                    জনপ্রিয় অনুসন্ধান
                  </span>
                </div>
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          {/* Nav Items */}
          <ul className="flex space-x-6 text-sm font-medium">
            {(nextLang == "en" ? menuItemsBn : menuItemsEn).map(
              (item, index) => (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    {item.title}
                    {item.dropdown && (
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Dropdown */}
                  {visibleIndex === index && item.dropdown && (
                    <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                      {item.dropdown.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <div
                              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${subItem.color}`}
                            >
                              {subItem.icon}
                            </div>
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>

          {/* Language Toggle */}
          <button
            onClick={() => switchLang()}
            className="flex items-center gap-1 border border-gray-200 px-1.5 py-1 rounded cursor-pointer"
          >
            <svg
              className="hidden md:block"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9494_69309)">
                <path
                  d="M8.4129 12.71C8.34261 12.8852 8.17283 13 7.98407 13C7.65462 13 7.43101 12.6651 7.5573 12.3608L10.0079 6.45676C10.1226 6.18024 10.3926 6 10.692 6C10.9914 6 11.2613 6.18024 11.3761 6.45676L13.8267 12.3608C13.953 12.6651 13.7294 13 13.3999 13C13.2112 13 13.0414 12.8852 12.9711 12.71L10.7344 7.13611C10.7275 7.11878 10.7107 7.10742 10.692 7.10742C10.6733 7.10742 10.6565 7.11878 10.6496 7.13611L8.4129 12.71ZM8.66745 10.6416C8.66745 10.434 8.83578 10.2656 9.04342 10.2656H12.3406C12.5482 10.2656 12.7165 10.434 12.7165 10.6416C12.7165 10.8492 12.5482 11.0176 12.3406 11.0176H9.04342C8.83578 11.0176 8.66745 10.8492 8.66745 10.6416Z"
                  fill="#6B7280"
                ></path>
                <path
                  d="M8.75662 1C8.94575 1 9.09907 1.15332 9.09907 1.34244C9.09907 1.53157 8.94575 1.68489 8.75662 1.68489H8.0862V6.54228C8.0862 6.79507 7.88128 7 7.62848 7C7.45399 7 7.29663 6.8996 7.2092 6.74859C7.0493 6.47242 6.86254 6.22503 6.64891 6.00643C6.37238 5.71704 6.07656 5.46945 5.76145 5.26367L6.0026 4.62701C6.24698 4.76849 6.50099 4.96141 6.76466 5.20579C7.02833 5.45016 7.2309 5.69775 7.37238 5.94855C7.36595 5.85209 7.35952 5.76206 7.35309 5.67846C7.35309 5.59485 7.34987 5.50804 7.34344 5.41801C7.34344 5.32797 7.34344 5.23151 7.34344 5.12862V1.68489H0.634436C0.445309 1.68489 0.291992 1.53157 0.291992 1.34244C0.291992 1.15332 0.44531 1 0.634436 1H8.75662ZM4.01546 6.12219C3.57817 6.12219 3.16016 6.01929 2.76145 5.8135C2.36273 5.60772 1.98653 5.26045 1.63283 4.7717C1.33459 4.34644 1.05532 3.78598 0.795026 3.09035C0.722542 2.89664 0.82885 2.68352 1.02533 2.61892C1.21787 2.55562 1.42501 2.65882 1.49615 2.8486C1.68952 3.36445 1.88942 3.7997 2.09585 4.15434C2.35309 4.57878 2.63926 4.89068 2.95437 5.09003C3.26948 5.28939 3.62961 5.38907 4.03476 5.38907C4.38845 5.38907 4.67141 5.3344 4.88363 5.22508C5.10228 5.10932 5.25984 4.95498 5.3563 4.76206C5.45276 4.5627 5.501 4.34405 5.501 4.10611C5.501 3.73312 5.3981 3.43087 5.19231 3.19936C4.99296 2.96785 4.74215 2.85209 4.4399 2.85209C4.22768 2.85209 4.06691 2.90032 3.95759 2.99678C3.84826 3.08682 3.7936 3.22508 3.7936 3.41158C3.7936 3.45659 3.80003 3.51768 3.81289 3.59486C3.83172 3.70781 3.76689 3.82758 3.65455 3.84975L3.44714 3.89069C3.27022 3.9256 3.09239 3.82419 3.04741 3.64955C3.04177 3.62763 3.03648 3.60618 3.03154 3.58521C3.01225 3.46945 3.0026 3.36013 3.0026 3.25723C3.0026 3.01929 3.06691 2.81994 3.19553 2.65916C3.33058 2.49839 3.50099 2.37942 3.70678 2.30225C3.919 2.21865 4.14087 2.17685 4.37238 2.17685C4.7518 2.17685 5.07977 2.26367 5.3563 2.4373C5.63283 2.6045 5.84826 2.83601 6.0026 3.13183C6.15694 3.42765 6.23411 3.7717 6.23411 4.16399C6.23411 4.51125 6.15373 4.83601 5.99296 5.13826C5.83219 5.43408 5.58781 5.67203 5.25984 5.85209C4.93186 6.03215 4.51707 6.12219 4.01546 6.12219ZM3.70678 2.51447C3.67463 2.30868 3.57817 2.12862 3.41739 1.97428C3.26305 1.8135 3.03476 1.70096 2.73251 1.63666L2.96402 1.20257L3.3981 1.31833C3.76466 1.45981 4.02833 1.62058 4.1891 1.80064C4.34987 1.98071 4.44312 2.209 4.46884 2.48553L3.70678 2.51447Z"
                  fill="#6B7280"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_9494_69309">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.291992)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <span>{nextLang === "en" ? "EN" : "বাং"}</span>
          </button>

          {/* Phone Number */}
          <div className="flex items-center text-primary">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-semibold">16910</span>
          </div>

          {/* Login Button */}
          <button className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-medium">
            লগ-ইন
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
