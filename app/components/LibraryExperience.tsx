"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";
import LibraryHome from "./LibraryHome";

type Book = {
  id: string;
  title: string;
  author: string;
  series: string;
  category: string;
  age: string;
  availability: string;
  cover: string;
};

export default function LibraryExperience({
  books,
}: {
  books: Book[];
}) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    setShowIntro(true);
  }, []);

  function enterLibrary() {
    localStorage.setItem("52ing-intro-seen", "true");

    setShowIntro(false);

    setTimeout(() => {
      document.getElementById("series-explorer")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  }

  if (showIntro === null) {
    return <main className="min-h-screen bg-[#111A2E]" />;
  }

  if (showIntro) {
    return <Intro onEnter={enterLibrary} />;
  }

  return <LibraryHome books={books} />;
}