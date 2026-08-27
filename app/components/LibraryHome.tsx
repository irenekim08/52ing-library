"use client";

import Image from "next/image";
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

export default function LibraryHome({ books }: { books: Book[] }) {
  return (
    <main className="min-h-screen bg-[#73D2DF] p-8">
      {/* HERO */}
      <div className="mb-12 text-center">
        <div className="mb-5 flex justify-center">
          <Image
            src="/52ing.PNG"
            alt="운석 오잉이"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-5xl font-bold text-[#1F2A44]">
          오잉 도서관
        </h1>

        <p className="mt-4 text-gray-600">
          우리들의 운석의 새로운 궤도를 찾아서!
        </p>

        <p className="mt-2 text-gray-500">
          어린이와 청소년을 위한 한국어 책 도서관
        </p>

        <p className="mt-3 text-gray-500">
          지금 {books.length}권의 책이 오잉 도서관에 있어요 ☄️
        </p>
      </div>

      {/* LIBRARY */}
      <section>
        <h2 className="mb-8 text-3xl font-bold text-[#1F2A44]">
          책 둘러보기
        </h2>

        <BookBrowser books={books} />
      </section>
    </main>
  );
}