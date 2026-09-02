"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [showStory, setShowStory] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#73D2DF] font-gaegu">
      {/* STORY BUTTON — TRAIL GRAPHIC */}
      <button
        onClick={() => setShowStory(true)}
        aria-label="오잉이의 이야기 보기"
        className="
          absolute
          left-0
          top-0
          z-30
          cursor-pointer
          border-0
          bg-transparent
          p-0
          transition
          duration-300
          hover:scale-105
          active:scale-95
        "
      >
        <Image
          src="/oing/trail-long.png"
          alt="오잉이의 이야기"
          width={420}
          height={160}
          className="
            h-auto
            w-[190px]
            object-contain
            sm:w-[260px]
            md:w-[320px]
          "
          priority
        />
      </button>

      {/* HERO */}
      <section className="relative px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* OING */}
          <div className="mb-4 flex justify-center sm:mb-6">
            <Image
              src="/52ing.PNG"
              alt="운석 오잉이"
              width={130}
              height={130}
              className="h-auto w-[105px] object-contain sm:w-[130px]"
              priority
            />
          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-bold tracking-tight text-[#1F2A44] sm:text-6xl md:text-7xl">
            오잉 도서관
          </h1>

          {/* SUBTITLE */}
          <p className="font-basic mt-4 text-xl font-bold text-[#1F2A44] sm:text-2xl">
            우리들의 운석의 새로운 궤도를 찾아서!
          </p>

          <p className="mt-2 text-lg text-[#1F2A44]/80 sm:text-xl">
            어린이와 청소년을 위한 한국어 책 도서관
          </p>

          {/* BOOK COUNT */}
          <div className="mt-5 inline-flex rounded-full bg-white/30 px-5 py-2 backdrop-blur-sm">
            <p className="text-base font-bold text-[#1F2A44] sm:text-lg">
              지금 {books.length}권의 책이 오잉 도서관에 있어요 ☄️
            </p>
          </div>
        </div>
      </section>

      {/* BOOK BROWSER */}
      <section className="bg-[#73D2DF] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="text-4xl font-bold text-[#1F2A44] sm:text-5xl">
              책 둘러보기
            </h2>

            <p className="mt-2 text-lg text-[#1F2A44]/70 sm:text-xl">
              오잉과 함께 새로운 이야기를 탐험해 보세요!
            </p>
          </div>

          <BookBrowser books={books} />
        </div>
      </section>

      {/* STORY MODAL */}
      {showStory && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#111A2E]/80
            p-4
            backdrop-blur-sm
          "
          onClick={() => setShowStory(false)}
        >
          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-5xl
              overflow-auto
              rounded-3xl
              bg-[#73D2DF]
              p-3
              shadow-2xl
              sm:p-5
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowStory(false)}
              aria-label="닫기"
              className="
                sticky
                top-0
                z-10
                ml-auto
                mb-2
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#1F2A44]
                text-2xl
                font-bold
                text-[#73D2DF]
                shadow-md
                transition
                hover:scale-110
              "
            >
              ×
            </button>

            {/* STORYBOARD */}
            <div className="flex justify-center">
              <Image
                src="/oing/oing-story.png"
                alt="오잉이의 이야기"
                width={1600}
                height={2200}
                className="h-auto w-full rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}