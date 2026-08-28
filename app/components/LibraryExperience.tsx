"use client";

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
  return <LibraryHome books={books} />;
}