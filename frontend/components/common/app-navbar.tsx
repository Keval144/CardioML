"use client";
import Link from "next/link";
import { useState } from "react";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarLogo,
  NavItems,
} from "./navbar";
import { ThemeSwitch } from "./theme-switch";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "../shadcn-ui/button";

export function AppNavbar() {
  const navItems = [
    { name: "Fun Facts", link: "/facts" },
    {
      name: "Model Info",
      link: "/model-info",
    },
    {
      name: "Disclaimer",
      link: "/disclaimer",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="z-10 flex items-center gap-2">
          <ThemeSwitch variant="link" className="pl-4" />
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="text-primary-foreground h-8 rounded-2xl px-3 text-sm font-medium"
            >
              <Link href="/predict" className="group flex items-center gap-1">
                Predict Now
                <IconArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
          </div>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          {/* Mobile Predict */}
          <div className="bg-primary flex w-full flex-col gap-3 rounded-xl p-2 text-center text-white">
            <Link href={"/predict"} className="w-full">
              Predict Now
            </Link>
          </div>
          <ThemeSwitch
            variant="link"
            className="pr-5.5 text-neutral-600 dark:text-white"
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
