'use client'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ErrorProps {
    title?: string
  }

function Error({ title = "Fehler" }: ErrorProps) {
    return (
        <div className="min-h-screen bg-gray-50 ">
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <p className="hidden md:block"> Back to Home </p> 
            </Link>
          </Button>
  
          <div className="bg-red-100 mt-5 md:mt-20  border-l-4 border-red-500 shadow-lg rounded-lg p-5 mb-5">
            <div className="flex items-start space-x-3">
                <AlertCircle className="h-8 md:h-12 w-6 md:w-12 text-red-500" />
                <div>
                <h3 className="text-red-800 font-semibold text-lg md:text-2xl">{title}</h3>
                <p className="text-red-700 mt-1 text-sm md:text-xl"> No Ressources </p>
                </div>
            </div>
        </div>

        </div>
      </div>
      )
}

export default Error