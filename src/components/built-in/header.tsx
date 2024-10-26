"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

import DropdownMenu from './dropdown';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const NavItems = ({ mobile = false }) => (
    <ul className={`flex ${mobile ? "flex-col space-y-4" : "space-x-4"}`}>
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
              }`}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              ACME Inc
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavItems />
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          <DropdownMenu />
          </div>
          <nav className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 bg-white">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                  <DialogDescription>Fixed the warning</DialogDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  <NavItems mobile />
                  <DropdownMenu />
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}