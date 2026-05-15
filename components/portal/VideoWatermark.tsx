"use client";

import { useEffect, useState } from "react";

type VideoWatermarkProps = {
  userPhone: string;
  userEmail: string;
};

type WatermarkPosition = {
  top: string;
  left: string;
};

export function VideoWatermark({ userPhone, userEmail }: VideoWatermarkProps): React.JSX.Element {
  const [position, setPosition] = useState<WatermarkPosition>({ top: "20%", left: "10%" });
  const label = `${userEmail} · ${userPhone.slice(-4)}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: `${Math.random() * 70 + 5}%`,
        left: `${Math.random() * 70 + 5}%`,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        ...position,
        color: "rgba(255,255,255,0.35)",
        fontSize: "13px",
        fontFamily: "monospace",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10,
        transform: "rotate(-25deg)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}
