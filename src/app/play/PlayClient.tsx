"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const GameModal = dynamic(
  () => import("@/components/game/GameModal"),
  { ssr: false }
);

export default function PlayClient() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-[9999]">
      <GameModal onClose={handleClose} />
    </div>
  );
}
