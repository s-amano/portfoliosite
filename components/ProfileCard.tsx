import React, { useMemo } from "react";
import Image from "next/image";
import { SnsIcon } from "./SnsIcon";

export const ProfileCard = React.memo(() => {
  const comments = useMemo(
    () => [
      "(猫の)名前はまだない",
      "巨人の肩の上に立つ",
      "車輪の再発明",
      "最近読んだ小説は「葉桜の季節に君を想うということ」",
      "最近観た映画は「トランス・ワールド」",
    ],
    []
  );
  const randomComment = useMemo(
    () => comments[Math.floor(Math.random() * comments.length)],
    [comments]
  );
  return (
    <div className="flex w-full justify-center flex-wrap content-between">
      <div className="bg-white text-center shadow-xl p-8 w-80 rounded-xl m-6">
        <div>
          <div className="flex justify-center mt-4">
            <Image
              className="rounded-full"
              src="/nekonew.png"
              width={60}
              height={60}
              alt="Avatar"
            />
          </div>
          <div className="mt-4">
            <p className="font-bold">Name</p>
            <p className="text-xs mt-2 text-gray-600">tenshin</p>
            <p className="font-bold mt-3">E-mail</p>
            <p className="text-xs mt-2 text-gray-600">
              amahaya0831[at]gmail.com
            </p>
            <p className="font-bold mt-3">ランダム配信ひとこと</p>
            <p className="text-xs mt-2 text-gray-600">{randomComment}</p>
          </div>
          <SnsIcon />
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";
