"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import TopBar from "@/components/TopBar";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Home() {
  return (
    <ReduxWrapper>
      <main className="p-4">
        <TopBar />
        <Canvas />
      </main>
    </ReduxWrapper>
  );
}
