"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { TiHome } from "react-icons/ti";

const btns = [
  {
    id: 1,
    IconName: FaTwitter,
    btnText: "",
    mainIcon: true,
    onClick: () => {},
  },
  {
    id: 2,
    IconName: TiHome,
    btnText: "Home",
    onClick: () => {},
    href: "/",
  },
  {
    id: 3,
    IconName: AiOutlineSearch,
    btnText: "Explore",
    onClick: () => {},
  },
  {
    id: 4,
    IconName: IoNotificationsOutline,
    btnText: "Notifications",
    onClick: () => {},
  },
  {
    id: 5,
    IconName: MdOutlineMarkEmailUnread,
    btnText: "Messages",
    onClick: () => {},
  },
  {
    id: 6,
    IconName: CiViewList,
    btnText: "Lists",
    onClick: () => {},
  },
  {
    id: 7,
    IconName: BsBookmarkStar,
    btnText: "Bookmarks",
    onClick: () => {},
  },
  {
    id: 8,
    IconName: CgProfile,
    btnText: "Profile",
    onClick: () => {},
    href: "/profile",
  },
];

function LeftSide() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col items-end md:item-center p-3 min-h-[100dvh] max-h-[100dvh] no-scrollbar overflow-auto justify-between">
        <div className="flex flex-col items-end sm:items-start">
          {btns.map((btn) => (
            <Link href={btn.href || ""} key={btn.id}>
              <div
                className={`flex ${
                  !btn.href
                    ? "select-none text-white/50 cursor-default"
                    : "text-white"
                } cursor-pointer items-end ${
                  !btn.mainIcon ? "p-4 md:px-5 gap-4" : "p-4  py-5"
                } ${btn.href ? "hover:bg-white/10" : ""} ${
                  pathname === btn.href ? "bg-white/10" : ""
                } ${
                  !btn.mainIcon && pathname === btn.href ? "text-3xl" : ""
                } rounded-full transition w-fit items-center`}
              >
                <btn.IconName
                  className={`text-2xl ${
                    btn.mainIcon && "text-white text-3xl"
                  }`}
                />
                <h1 className="text-xl hidden sm:inline">{btn.btnText}</h1>
              </div>
            </Link>
          ))}
        </div>

        <button
          // @ts-ignore
          onClick={() => window.logout_modal.showModal()}
          className="btn mb-5 bg-red-600 mt-3 border-0 hover:bg-red-600/70 ml-0 w-14 h-14 sm:w-full sm:h-auto rounded-full text-white"
        >
          <CgLogOut className="text-xl" />
          <span className="hidden sm:inline-block">LOGOUT</span>
        </button>
        <dialog id="logout_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello, {data?.user?.name}!</h3>
            <p className="py-4">Are you sure you want to logout?</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => void signOut()} className="btn">
                LOGOUT
              </button>
              <button className="btn bg-red-500 text-white">CLOSE</button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default LeftSide;
