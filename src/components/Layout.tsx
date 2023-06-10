import React from "react";
import Link from "next/link";
import Image from "next/image";
import Seo from "./Seo";
import { Navbar } from "./Navbar";

interface Props {
  children: JSX.Element;
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
}

export const Layout: React.FC<Props> = React.memo((props: Props) => {
  const { children, pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight } =
    props;
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono bg-gray-100">
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImg={pageImg}
        pageImgWidth={pageImgWidth}
        pageImgHeight={pageImgHeight}
        pagePath={pagePath}
      />
      <Navbar />
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
      <footer className="w-full h-20 flex justify-center items-center border-t border-gray-300 mb-2 mt-10">
        <Link href="/">
          <a>
            <Image className="rounded-lg" src="/nekonew.png" alt="profile" width={42} height={42} />
          </a>
        </Link>
      </footer>
    </div>
  );
});

Layout.displayName = "Layout";
