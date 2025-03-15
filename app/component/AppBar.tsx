'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from "next/link"
import {Disc,Menu} from "lucide-react"
import { Button } from "@/components/ui/button"


const AppBar = () => {
    const session = useSession()
  return (
      <header className="sticky top-0 z-40 px-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Disc className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold tracking-wider">
              VINYL<span className="text-purple-500">VERSE</span>
            </span>
          </div>

          {/* Mobile menu button */}
          <button className="block md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-purple-400 transition-colors">
              Features
            </Link>
            <Link href="#creators" className="text-sm font-medium text-purple-400 transition-colors">
              Creators
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-purple-400 transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-purple-400 transition-colors">
              Contact
            </Link>
        {session.data?.user && <Button className='rounded p-2 bg-blue-700 text-white' onClick={()=>signOut()}>logOut</Button> }
        {!session.data?.user && <Button className='rounded p-2 bg-blue-700 text-white' onClick={()=>signIn()}>signin</Button>}
             
          </nav>
        </div>
      </header>
       
  )
}

export default AppBar