"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";
import BookBrowser from "./BookBrowser";

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

  if (showIntro === null) {
    return (
      <main className="min-h-screen bg-[#111A2E]" />
    );
  }

  if (showIntro) {
    return (
      <Intro
        onEnter={() => {
          setShowIntro(false);

          setTimeout(() => {
            document
              .getElementById("series-explorer")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }, 100);
        }}
      />
    );
  }

  return <BookBrowser books={books} />;
}