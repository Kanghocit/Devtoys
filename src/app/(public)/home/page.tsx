"use client";

import MainContent from "@/components/main";
import Suggest from "@/components/suggest";

export default function Home() {
  return (
    <div className="bg-white rounded-tl-lg">
      <MainContent />
      <div className="pb-4">
        <Suggest />
      </div>
    </div>
  );
}
