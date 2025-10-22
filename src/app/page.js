"use client";

import dynamic from "next/dynamic";

// Import Video only on client side
const Video = dynamic(() => import("@/components/Video"), { ssr: false });

export default function Page() {
  return <Video />;
}
