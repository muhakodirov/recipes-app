"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Plus, Save, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div>

    <header className="p-4 bg-white lg:bg-gray-50 shadow-sm lg:shadow-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">InRecipes</h1>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/saved">
              <Save className="h-5 w-5 mr-2" />
              Saved
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Plus className="h-5 w-5 mr-2" />
            Add Recipe
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 mr-2" />
            Profile
          </Button>
        </nav>
      </div>
    </header>
    </div>

  )
}
