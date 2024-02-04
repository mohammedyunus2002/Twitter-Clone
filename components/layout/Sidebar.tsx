"use client"
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetButton from './SidebarTweetButton';
import { signOut, useSession } from "next-auth/react";


const items = [
  {
    icon: BsHouseFill,
    label: 'Home',
    href: '/',
  },
  {
    icon: BsBellFill,
    label: 'Notifications',
    href: '/notifications',
    auth: true
  },
  {
    icon: FaUser,
    label: 'Profile',
    href: '/users/123',
    auth: true
  },
]

export default  function Sidebar() {
  const { data: session } = useSession();    
    
    return ( 
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        auth={item.auth}
                        />
                    ))}
                    {session && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout' />}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
     );
}
 
