"use client"
import { AlignJustify, BookMarked, CircleFadingPlus, CircleUserRound, Divide, House  } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';

const navItems = [
    { icon: House, href: '/', label: "Home" },
    { icon: BookMarked, href: '/saved', label: "Saved" },
    { icon: CircleUserRound, href: '/', label: "Profile" },
  ]

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" > <AlignJustify />  </Button>
      </SheetTrigger>
      <SheetContent className='w-[250px]'>
        <SheetHeader>
            <SheetTitle></SheetTitle> 
        </SheetHeader>
        <div className='mt-16 grid grid-rows-3 gap-10  grid-cols-1 text-2xl font-sans text-center'>
            {navItems.map(item => (
                <div className='flex gap-2 justify-center items-center text-center '>
                    <Link className='flex gap-2 justify-center items-center text-center relative group' href={item.href} >
                        <item.icon className='transition-colors duration-200 size-12 text-gray-800 rounded-xl hover:bg-gray-200 p-2'/> 
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {item.label}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
        <footer className='mt-24 '>
            <button  title='Create a new recipe' className='border w-32 mx-auto rounded-lg py-2 flex justify-center hover:w-16 hover:bg-gray-50 transition-all'>
                <Link href="/" > <CircleFadingPlus className='size-10 text-green-700'/> </Link>
            </button>
        </footer>
      </SheetContent>
    </Sheet>
  )
}
