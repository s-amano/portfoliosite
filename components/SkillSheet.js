import Image from "next/image";

export default function SkillSheet({ skill }) {
  return (
    <>
      {skill.map((skill) => {
        return (
          <div
            key={skill.id}
            className="flex relative text-left bg-white mx-6 w-96 rounded-xl shadow-xl px-8 py-4 my-8"
          >
            <div className="w-64">
              <div className="absolute -top-4 left-2">
                <p className="text-2xl font-bold border-b-2 border-gray-700">
                  {skill.title}
                </p>
              </div>
              <div className="mt-4 ml-2">
                <p className="font-bold">使用歴</p>
                <p className="text-xs mt-2 ml-2 text-gray-600">{skill.time}</p>
                <p className="font-bold mt-3">経験</p>
                <p className="text-xs mt-2 ml-2 text-gray-600">
                  {skill.experience}
                </p>
                <p className="font-bold mt-3">補足</p>
                <p className="text-xs mt-2 ml-2 text-gray-600">
                  {skill.supplement}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Image
                src={skill.image.url}
                width={50}
                height={(50 * skill.image.height) / skill.image.width}
                alt="Avatar"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
