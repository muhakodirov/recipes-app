import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-14">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              RecipeGram
            </Link>
            <p className="mt-2 text-slate-300">
              Discover, create, and share delicious recipes with food lovers around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="hover:text-green-400 transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-green-400 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-green-400 transition-colors">
                  Neues Rezept erstellen
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Twitter />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Youtube />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-2 text-slate-300">Stay updated with our latest recipes and tips!</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-00 border-slate-700 text-white placeholder-slate-400"
              />
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} RecipeGram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}