"use client";

import { useState } from "react";

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

function BookCard({ book }: { book: Book }) {
  return (
    <div className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* little orbit decoration */}
      <div className="absolute -top-2 -right-2 text-xl rotate-[-20deg]">
        ✦
      </div>

      {/* SMALLER COVER */}
      <div className="flex justify-center mb-3">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="
              w-28
              sm:w-32
              aspect-[2/3]
              object-cover
              rounded-xl
              shadow-md
              group-hover:rotate-1
              transition
            "
          />
        ) : (
          <div className="w-28 sm:w-32 aspect-[2/3] flex items-center justify-center text-3xl bg-[#FFFDF8] rounded-xl">
            📚
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="font-bold text-base text-[#1F2A44] leading-tight">
          {book.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {book.author}
        </p>

        <div className="flex justify-center flex-wrap gap-2 mt-3">
          {book.category && (
            <span className="bg-[#73D2DF]/40 px-3 py-1 rounded-full text-xs">
              {book.category}
            </span>
          )}

          {book.age && (
            <span className="bg-[#FCF057]/60 px-3 py-1 rounded-full text-xs">
              {book.age}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookBrowser({ books }: { books: Book[] }) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const seriesGroups: Record<string, Book[]> = {};

  books.forEach((book) => {
    const seriesName = book.series?.trim();

    if (seriesName) {
      if (!seriesGroups[seriesName]) {
        seriesGroups[seriesName] = [];
      }

      seriesGroups[seriesName].push(book);
    }
  });

  const individualBooks = books.filter(
    (book) => !book.series || book.series.trim() === ""
  );

  /* =========================
     SELECTED SERIES VIEW
  ========================== */

  if (selectedSeries) {
    const selectedBooks = seriesGroups[selectedSeries] || [];

    return (
      <div className="relative">
        {/* space decorations */}
        <div className="absolute top-0 right-4 text-3xl opacity-40">
          ✦
        </div>

        <div className="absolute top-20 left-4 text-2xl opacity-30">
          ☄️
        </div>

        <button
          onClick={() => setSelectedSeries(null)}
          className="
            mb-8
            bg-[#FCF057]
            px-5
            py-3
            rounded-full
            font-bold
            text-[#1F2A44]
            shadow-sm
            hover:scale-105
            transition
          "
        >
          ← 시리즈로 돌아가기
        </button>

        <div className="relative overflow-hidden bg-[#73D2DF]/30 rounded-[2rem] p-8 mb-10">
          {/* orbit */}
          <div className="absolute -right-20 -top-20 w-64 h-64 border-[3px] border-[#73D2DF]/40 rounded-full" />

          <div className="absolute right-16 top-8 text-3xl">
            🪐
          </div>

          <h2 className="relative text-3xl font-bold text-[#1F2A44]">
            {selectedSeries}
          </h2>

          <p className="relative text-[#1F2A44]/70 mt-2">
            오잉이 발견한 이야기 {selectedBooks.length}권 ☄️
          </p>
        </div>

        {/* smaller cards = more columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {selectedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     NORMAL LIBRARY VIEW
  ========================== */

  return (
    <div className="relative">
      {/* floating space things */}
      <div className="absolute -top-10 right-4 text-4xl opacity-50">
        🪐
      </div>

      <div className="absolute top-32 -left-2 text-2xl opacity-30">
        ✦
      </div>

      {/* SERIES */}

      {Object.keys(seriesGroups).length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#73D2DF]" />

            <h2 className="text-2xl font-bold text-[#1F2A44]">
              시리즈 탐험하기
            </h2>

            <span className="text-xl">☄️</span>
          </div>

          <p className="text-gray-500 mb-6">
            같은 우주에서 온 책들을 모아봤어요.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-16">
            {Object.entries(seriesGroups).map(
              ([seriesName, seriesBooks]) => (
                <button
                  key={seriesName}
                  onClick={() => setSelectedSeries(seriesName)}
                  className="
                    group
                    relative
                    text-left
                    bg-[#73D2DF]/25
                    rounded-[2rem]
                    p-4
                    hover:bg-[#73D2DF]/40
                    hover:-translate-y-1
                    transition-all
                    shadow-sm
                    hover:shadow-md
                    overflow-hidden
                  "
                >
                  {/* decorative orbit */}
                  <div className="absolute -right-10 -top-10 w-28 h-28 border-2 border-[#73D2DF]/50 rounded-full" />

                  <div className="relative flex justify-center mb-3">
                    {seriesBooks[0].cover ? (
                      <img
                        src={seriesBooks[0].cover}
                        alt={seriesName}
                        className="
                          w-24
                          sm:w-28
                          aspect-[2/3]
                          object-cover
                          rounded-xl
                          shadow-md
                          group-hover:rotate-2
                          transition
                        "
                      />
                    ) : (
                      <div className="w-24 sm:w-28 aspect-[2/3] flex items-center justify-center bg-white rounded-xl text-3xl">
                        📚
                      </div>
                    )}
                  </div>

                  <h3 className="relative text-base font-bold text-[#1F2A44] text-center leading-tight">
                    {seriesName}
                  </h3>

                  <p className="relative mt-2 text-[#1F2A44]/60 text-sm text-center">
                    {seriesBooks.length}권의 이야기
                  </p>

                  <div className="relative mt-3 text-center">
                    <span className="inline-block bg-[#FCF057] px-3 py-1 rounded-full text-xs font-bold">
                      탐험하기 →
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        </>
      )}

      {/* INDIVIDUAL BOOKS */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-[2px] bg-[#FCF057]" />

        <h2 className="text-2xl font-bold text-[#1F2A44]">
          책 탐험하기
        </h2>

        <span className="text-xl">🌙</span>
      </div>

      <p className="text-gray-500 mb-6">
        오잉의 우주를 자유롭게 돌아다녀 보세요.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {individualBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}