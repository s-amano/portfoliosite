import Link from 'next/link';
import Image from 'next/image';

export default function Blog({ blog }) {
  return (
    <>
      <p className="text-3xl my-8 text-black">ブログ一覧</p>
      <div className="flex w-10/12 justify-center flex-wrap content-between">
        {blog.map((blog) => {
          const maxLength = 30;
          if (blog.title.length > maxLength) {
            blog.title = blog.title.substr(0, maxLength) + '...';
          } else {
            blog.title = blog.title;
          }
          return (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="text-center m-6 flex h-20 w-80 rounded-3xl">
                <div className="h-20 w-20">
                  <Image
                    className="rounded-3xl"
                    src={blog.image.url}
                    width={80}
                    height={80}
                    objectFit="cover"
                    alt="blogimg"
                  />
                </div>
                <div className="px-4 w-56">
                  <p className="text-sm text-left font-bold">{blog.title}</p>
                  <div className="flex pl-2 mt-1 justify-between items-center">
                    <div className="h-7 p-1 w-52 text-left text-xs text-gray-500">{blog.createdAt}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
