"use client"
import React from 'react'
import { IoMusicalNotesSharp } from "react-icons/io5";
import { SiYoutubegaming } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    id: 1,
    icon: IoMusicalNotesSharp,
    title: "Music",
    href: "/channel/"
  },

  {
    id: 2,
    icon: SiYoutubegaming,
    title: "Gaming",
    href: "/channel/"
  },

  {
    id: 3,
    icon: FaTrophy,
    title: "Sports",
    href: "/channel/"
  }
]

export default function Explore() {
  const pathname = usePathname()
  return (
    <div className=' flex flex-col gap-5 border-b border-white/30 py-5'>
      {links.map(link => {
        return (
          <Link href={link.href} key={link.id} className={`flex px-5 py-2.5 ${pathname === link.href ? "bg-white/30" : ""} rounded-md w-full items-center gap-2 text-white text-md hover:bg-white/20 duration-200`}>
            {<link.icon size={20} />}
            {
              link.title
            }
          </Link>
        )
      })}
    </div>
  )
}
