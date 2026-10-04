"use client";

import React, { useEffect, useState } from "react";

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      // 1920px is the reference width (FHD)
      const baseWidth = 1920;
      
      // Calculate scale based on the screen width
      const newScale = window.innerWidth / baseWidth;
      
      setScale(newScale);
      
      // Calculate inner container size so that when scaled, it exactly matches the screen!
      // This removes the black bars completely.
      setDimensions({
        width: baseWidth, // Always 1920px width internally
        height: window.innerHeight / newScale, // Dynamically adjust height
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        className="flex flex-col [&>*]:min-h-full [&>*]:w-full"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
