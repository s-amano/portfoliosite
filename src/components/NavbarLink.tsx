import Link from "next/link";
import React from "react";

interface Props {
  navbarLinkName: string;
}

export const NavbarLink: React.FC<Props> = React.memo((props: Props) => {
  const { navbarLinkName } = props;
  return (
    <Link href="/">
      <a className="md:text-lg hover:border-b-4 hover:border-gray-600 border-gray-100 border-b-4 rounded md:p-2">
        {navbarLinkName}
      </a>
    </Link>
  );
});

NavbarLink.displayName = "NavbarLink";
