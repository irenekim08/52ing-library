"use client";

import Image from "next/image";
import { useEffect } from "react";

type OingStoryProps = {
  onClose: () => void;
};

export default function OingStory({ onClose }: OingStoryProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="oing-story-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="oing-story-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="오잉이의 이야기"
      >
        <button
          className="oing-story-close"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>

        <div className="oing-story-content">
          <Image
            src="/oing/oing-story.png"
            alt="오잉이의 이야기"
            width={1400}
            height={2000}
            className="oing-story-image"
            priority
          />
        </div>
      </div>
    </div>
  );
}