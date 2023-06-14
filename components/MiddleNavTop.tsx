"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function MiddleNavTop() {
  const path = usePathname();
  return (
    <div className="bg-transparent backdrop-blur-sm border-b border-gray-600 sticky top-0 pl-3 left-0 flex gap-3 items-center">
      {path !== "/" && (
        <Link href="/">
          <FaArrowLeft className="cursor-pointer" />
        </Link>
      )}
      <h1 className="text-xl font-medium py-3">Home</h1>
    </div>
  );
}

export default MiddleNavTop;
