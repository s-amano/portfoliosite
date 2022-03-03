import React from "react";
import Link from "next/link";
import Image from "next/image";
import Seo from "./Seo";

interface Props {
  children: JSX.Element;
  title: string;
}

export const Layout: React.FC<Props> = React.memo((props: Props) => {
  const { children, title } = props;
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono bg-blue-50">
      <Seo pageTitle={title} />
      <header className="mb-8">
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-4 md:pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 p-1 rounded md:p-2">
                  HOME
                </a>
              </Link>

              <Link href="/profile">
                <a className="text-gray-300 hover:bg-gray-700 p-1 rounded md:p-2">
                  PROFILE
                </a>
              </Link>

              <Link href="/blogs">
                <a className="text-gray-300 hover:bg-gray-700 p-1 rounded md:p-2">
                  BLOG
                </a>
              </Link>

              <Link href="/tags">
                <a className="text-gray-300 hover:bg-gray-700 p-1 rounded md:p-2">
                  TAG
                </a>
              </Link>

              <Link href="/portfolio">
                <a className="text-gray-300 hover:bg-gray-700 py-1 rounded md:p-2">
                  PORTFOLIO
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
      <footer className="w-full h-20 flex justify-center items-center border-t border-gray-300 mb-2 mt-10">
        <Link href="/">
          <a target={"_blank"}>
            <Image
              className="rounded-lg"
              src="/my_original.jpg"
              alt="profile"
              width={42}
              height={42}
            />
          </a>
        </Link>
      </footer>
    </div>
  );
});

Layout.displayName = "Layout";