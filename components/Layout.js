import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children, title = 'TOP' }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono bg-blue-50">
      <header className="mb-8">
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Home</a>
              </Link>

              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Blog</a>
              </Link>

              <Link href="/portfolio">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Portfolio</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
      <footer className="w-full h-20 flex justify-center items-center border-t border-gray-300 mb-2 mt-10">
        <Link className="flex items-center" href="/" target="_blank" rel="noopener noreferrer">
          <Image className="rounded-lg" src="/my_original.jpg" alt="profile" width={42} height={42} />
        </Link>
      </footer>
    </div>
  );
}
