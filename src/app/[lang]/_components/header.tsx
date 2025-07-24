"use client";

import { usePathname, useRouter } from "next/navigation";
import DesktopNavbar from "./desktop-nav";

export default function Header({ currentLang }: { currentLang: "en" | "bn" }) {
  const router = useRouter();
  const pathname = usePathname();

  const nextLang = currentLang === "en" ? "bn" : "en";

  const switchLang = () => {
    const newPath = pathname.replace(/^\/(en|bn)/, `/${nextLang}`);
    router.push(newPath);
  };

  return (
    <header>
      <DesktopNavbar nextLang={nextLang} switchLang={switchLang} />
    </header>
  );
}
