"use client"
import React from 'react'
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const links = [
  {
    id: 1,
    icon: GoHome,
    title: "Home",
    href: "/"
  },

  {
    id: 2,
    icon: SiYoutubeshorts,
    title: "Shorts",
    href: "/shorts"
  },

  {
    id: 3,
    icon: MdOutlineSubscriptions,
    title: "Subscriptions",
    href: "/feed/subscriptions"
  },

  {
    id: 4,
    icon: FaRegCircleUser,
    title: "You",
    href: "/feed/you"
  },

  {
    id: 5,
    icon: LuHistory,
    title: "History",
    href: "/feed/history"
  },
]

export default function SideBarLinks() {
  const pathname = usePathname()
  return (
    <div className=' flex flex-col border-b border-white/30 py-5'>
      {links.map(link => {
        return (
          <Link
            style={{ backgroundImage: "" }}
            href={link.href} key={link.id} className={`flex px-2  bg-repeat bg-center bg-cover text-xs xl:text-xl xl:px-5 py-2.5 ${pathname === link.href ? "bg-[url('/homeEffect.png')]" : ""} flex-col xl:flex-row rounded-md w-full items-center gap-2 text-white text-md hover:bg-white/20 duration-200`}>
            {<link.icon size={20}/>}
            {
              link.title
            }
          </Link>
        )
      })}
    </div>
  )
}
