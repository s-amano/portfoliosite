import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GrUpdate } from "react-icons/gr";
import { SnsIcon } from "./SnsIcon";

export const ProfileCard = React.memo(() => {
  const comments = useMemo(
    () => [
      "(猫の)名前はまだない",
      "巨人の肩の上に立つ",
      "車輪の再発明",
      "最近読んだ小説は 「向日葵の咲かない夏」",
      "人生1の小説は「白夜行」",
      "最近観た映画は「トランス・ワールド」",
      "早めに猫になりたい",
    ],
    [],
  );
  const [randomComment, setRandomComment] = useState("");
  useEffect(() => {
    setRandomComment(comments[Math.floor(Math.random() * comments.length)]);
  }, [comments]);

  const onClickRandomComment = useCallback(
    () => setRandomComment(comments[Math.floor(Math.random() * comments.length)]),
    [comments],
  );

  return (
    <div className="flex bg-white justify-center rounded-xl p-8 shadow-xl text-center">
      <div>
        <div className="flex justify-center mt-4">
          <Image
            className="rounded-full"
            src="/nekonew.png"
            width={100}
            height={100}
            alt="Avatar"
          />
        </div>
        <div className="mt-2 w-80">
          <p className="text-base mt-2 text-black font-bold">
            <span className="flex items-center justify-center">
              天野心太郎
              <button onClick={onClickRandomComment}>
                <GrUpdate className="mx-1" />
              </button>
            </span>
          </p>

          <p className="text-xs mt-2 text-gray-600">{randomComment}</p>
        </div>
        <SnsIcon />
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";
