import Link from "next/link";
import React from "react";

export const Navbar: React.FC = React.memo(() => {
  const NavbarLink = ({ navbarLink, navbarLinkName }) => {
    return (
      <Link href={navbarLink}>
        <a className="md:text-lg hover:border-b-4 hover:border-gray-600 border-gray-100 border-b-4 rounded md:p-2">
          {navbarLinkName}
        </a>
      </Link>
    );
  };
  return (
    <header className="mb-8">
      <nav className="w-screen flex items-center md:justify-center">
        <div className="flex items-center pl-10 h-14 md:w-[960px]">
          <div className="flex space-x-4 mt-4">
            <NavbarLink navbarLink="/" navbarLinkName="HOME" />

            <NavbarLink navbarLink="/blogs" navbarLinkName="BLOG" />
          </div>
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = "Navbar";
