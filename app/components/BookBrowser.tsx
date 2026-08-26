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
    <div className="group relative bg-[#DDF7F8] rounded-[2rem] p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    {/* 대여 상태 */}
    {book.availability && (
    <div
        className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
        book.availability.trim() === "Available"
            ? "bg-[#73D2DF] text-[#1F2A44]"
            : book.availability.trim() === "Borrowed"
            ? "bg-[#FCF057] text-[#1F2A44]"
            : book.availability.trim() === "Overdue"
            ? "bg-[#FF8A8A] text-[#1F2A44]"
            : book.availability.trim() === "In repair"
            ? "bg-[#D9D9D9] text-[#1F2A44]"
            : book.availability.trim() === "Fragile / In library only"
            ? "bg-[#C9B6FF] text-[#1F2A44]"
            : "bg-gray-200 text-gray-600"
        }`}
    >
        {book.availability.trim() === "Available"
        ? "● 대여 가능"
        : book.availability.trim() === "Borrowed"
        ? "● 대여 중"
        : book.availability.trim() === "Overdue"
        ? "● 반납 지연"
        : book.availability.trim() === "In repair"
        ? "🔧 수리 중"
        : book.availability.trim() === "Fragile / In library only"
        ? "📚 관내 열람"
        : book.availability}
    </div>
    )}

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
            loading="lazy"
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

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedAge, setSelectedAge] = useState("전체");

  const [visibleBooks, setVisibleBooks] = useState(30);

  const seriesGroups: Record<string, Book[]> = {};

  const categories = [
    "전체",
    ...Array.from(
        new Set(
        books
            .map((book) => book.category)
            .filter(Boolean)
        )
    ),
    ];

    const ages = [
    "전체",
    ...Array.from(
        new Set(
        books
            .map((book) => book.age)
            .filter(Boolean)
        )
    ),
    ];

    const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.series.toLowerCase().includes(searchText);

    const matchesCategory =
        selectedCategory === "전체" ||
        book.category === selectedCategory;

    const matchesAge =
        selectedAge === "전체" ||
        book.age === selectedAge;

    return matchesSearch && matchesCategory && matchesAge;
    });

  filteredBooks.forEach((book) => {
    const seriesName = book.series?.trim();

    if (seriesName) {
      if (!seriesGroups[seriesName]) {
        seriesGroups[seriesName] = [];
      }

      seriesGroups[seriesName].push(book);
    }
  });

  const individualBooks = filteredBooks.filter(
    (book) => !book.series || book.series.trim() === ""
  );

  /* =========================
     SELECTED SERIES VIEW
  ========================== */

  if (selectedSeries) {
    const selectedBooks = seriesGroups[selectedSeries] || [];

    return (
      <div className="relative">

        {/* FLOATING SPACE OBJECTS */}
        <div className="pointer-events-none absolute -top-8 left-[10%] text-xl twinkle">
        ✦
        </div>

        <div className="pointer-events-none absolute top-20 right-[8%] text-2xl float-slow">
        ✧
        </div>

        <div className="pointer-events-none absolute top-80 left-[4%] text-xl twinkle-slow">
        ✦
        </div>

        <div className="pointer-events-none absolute top-[500px] right-[3%] text-3xl float-medium">
        ☄️
        </div>

        <div className="pointer-events-none absolute top-[800px] left-[8%] text-xl twinkle">
        ✧
        </div>

        {/* your existing floating space things */}
        <div className="absolute -top-10 right-4 text-4xl opacity-50">
        🪐
        </div>
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

        {/* 🚀 오잉 탐색 조종석 */}
    <div className="relative mb-12 overflow-hidden rounded-[2rem] border-2 border-[#73D2DF] bg-white p-6 shadow-sm">

    {/* decorative orbit */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border-2 border-[#73D2DF]/30" />

    <div className="pointer-events-none absolute right-8 top-4 text-xl float-slow">
        ✦
    </div>

    <div className="relative flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCF057] text-xl">
        🚀
        </div>

        <div>
        <h2 className="font-bold text-xl text-[#1F2A44]">
            오잉 탐색 조종석
        </h2>

        <p className="text-sm text-gray-500">
            찾고 싶은 책의 좌표를 입력하세요!
        </p>
        </div>
    </div>

    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* 🔭 SEARCH */}
        <div>
        <label className="text-xs font-bold text-[#1F2A44]">
            🔭 책 검색
        </label>

        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="제목, 작가, 시리즈..."
            className="
            mt-2
            w-full
            rounded-2xl
            border-2
            border-[#73D2DF]/40
            px-4
            py-3
            outline-none
            focus:border-[#73D2DF]
            "
        />
        </div>

        {/* 🪐 CATEGORY */}
        <div>
        <label className="text-xs font-bold text-[#1F2A44]">
            🪐 카테고리
        </label>

        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="
            mt-2
            w-full
            rounded-2xl
            border-2
            border-[#73D2DF]/40
            bg-white
            px-4
            py-3
            outline-none
            "
        >
            {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
            ))}
        </select>
        </div>

        {/* 🌙 AGE */}
        <div>
        <label className="text-xs font-bold text-[#1F2A44]">
            🌙 추천 연령
        </label>

        <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="
            mt-2
            w-full
            rounded-2xl
            border-2
            border-[#FCF057]/50
            bg-white
            px-4
            py-3
            outline-none
            "
        >
            {ages.map((age) => (
            <option key={age} value={age}>
                {age}
            </option>
            ))}
        </select>
        </div>

    </div>

    <p className="relative mt-5 text-sm text-[#1F2A44]/60">
        📡 현재 탐지된 책: {filteredBooks.length}권
    </p>
    </div>

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
                    bg-[#DDF7F8]/25
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
        {individualBooks.slice(0, visibleBooks).map((book) => (
            <BookCard key={book.id} book={book} />
        ))}
        </div>

      {visibleBooks < individualBooks.length && (
        <div className="flex flex-col items-center mt-10">
            <button
            onClick={() => setVisibleBooks((prev) => prev + 30)}
            className="
                group
                relative
                overflow-hidden
                rounded-full
                bg-[#FCF057]
                px-8
                py-4
                font-bold
                text-[#1F2A44]
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                active:translate-y-0
            "
            >
            <span className="relative z-10">
                🚀 더 많은 책 탐험하기
            </span>

            <span className="absolute -right-2 -top-3 text-lg opacity-40 transition-transform duration-500 group-hover:rotate-45">
                ✦
            </span>
            </button>

            <p className="mt-3 text-sm text-[#1F2A44]/60">
            {Math.min(visibleBooks, individualBooks.length)} / {individualBooks.length}권 탐험 중
            </p>
        </div>
        )}
    </div>
  );
}