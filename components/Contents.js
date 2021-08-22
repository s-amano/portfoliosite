import Link from 'next/link';
import Image from 'next/image';

export default function Contents({ contents, contentName }) {
  let content_name = 'ポートフォリオ';
  if (contentName == 'blogs') {
    content_name = 'ブログ';
  }
  return (
    <>
      <p className="text-3xl my-8 text-black">{`${content_name}一覧`}</p>
      <div className="flex w-max-10/12 justify-center flex-wrap content-between">
        {contents.map((content) => {
          const maxLength = 30;
          if (content.title.length > maxLength) {
            content.title = content.title.substr(0, maxLength) + '...';
          } else {
            content.title = content.title;
          }
          let date = content.date ? content.date : content.createdAt;
          date = date.substring(0, 10);
          return (
            <Link key={content.id} href={`/${contentName}/${content.id}`}>
              <div className="text-center m-6 flex h-20 w-80 rounded-3xl">
                <div className="h-20 w-20">
                  <Image
                    className="rounded-3xl"
                    src={content.image.url}
                    width={80}
                    height={80}
                    objectFit="cover"
                    alt="contentimg"
                  />
                </div>
                <div className="px-4 w-56">
                  <p className="text-sm text-left font-bold">{content.title}</p>
                  <div className="flex pl-2 mt-1 justify-between items-center">
                    <div className="h-7 p-1 w-52 text-left text-xs text-gray-500">{date}</div>
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
