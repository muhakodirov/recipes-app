"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Plus, Save, User } from "lucide-react";
import Link from "next/link";
import { Sidebar } from '../sidebar-menu/sidebar';

export default function Header() {
  return (
    <div>

      <header className="p-4 bg-white lg:bg-gray-50 shadow-sm lg:shadow-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">RecipeGram</h1>
          </Link>
          {/* Desktop Nav-Menu*/}
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/saved">
                <Save className="h-5 w-5 mr-2" />
                Saved
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
            <Link href="/create" className='flex items-center'>
              <Plus className="h-5 w-5 mr-2" />
              Add Recipe
              </Link >
            </Button>
            <Button variant="ghost" size="sm">
              <Link href="/profile" className='flex items-center'>
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link >
            </Button>
          </nav>
          {/* Mobile Nav-Menu*/}
          <nav className='flex md:hidden'>
            <Sidebar />
          </nav>
        </div>
      </header>
    </div>

  )
}
