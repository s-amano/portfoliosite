import Image from 'next/image';

export default function SkillSheet() {
  return (
    <div className="flex relative text-left bg-white mx-6 w-96 rounded-xl shadow-xl px-8 py-4">
      <div>
        <div className="absolute -top-4 left-2">
          <p className="text-2xl font-bold border-b-2 border-gray-700">Golang</p>
        </div>
        <div className="mt-4 ml-2">
          <p className="font-bold">使用歴</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">10ヶ月</p>
          <p className="font-bold mt-3">経験</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">Timersインターン/UnknownDiary</p>
          <p className="font-bold mt-3">補足</p>
          <p className="text-xs mt-2 ml-2 text-gray-600">主にAWS Lambdaの開発で使ってきました</p>
        </div>
      </div>
      <div>
        <Image src="/golang.png" width={60} height={72} alt="Avatar" />
      </div>
    </div>
  );
}
