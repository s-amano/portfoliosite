import React from "react";
import { NavbarLink } from "./NavbarLink";

export const Navbar: React.FC = React.memo(() => {
  return (
    <header className="mb-8">
      <nav className="w-screen flex items-center md:justify-center">
        <div className="flex items-center pl-10 h-14 md:w-[960px]">
          <div className="flex space-x-4 mt-4">
            <NavbarLink navbarLinkName="HOME" />

            <NavbarLink navbarLinkName="BLOG" />
          </div>
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = "Navbar";
