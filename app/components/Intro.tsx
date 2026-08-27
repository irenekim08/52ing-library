"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type IntroProps = {
  onEnter: () => void;
};

export default function Intro({ onEnter }: IntroProps) {
  const [scene, setScene] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setScene(1), 800),
      setTimeout(() => setScene(2), 2600),
      setTimeout(() => setScene(3), 5200),
      setTimeout(() => setScene(4), 7800),
      setTimeout(() => setScene(5), 10500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  function enterLibrary() {
    setLeaving(true);

    localStorage.setItem("52ing-intro-seen", "true");

    setTimeout(() => {
      onEnter();
    }, 700);
  }

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111A2E] px-6 text-center transition-all duration-700 ${
        leaving ? "scale-110 opacity-0" : "opacity-100"
      }`}
    >
      {/* STARS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="star star-1">✦</div>
        <div className="star star-2">✧</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">·</div>
        <div className="star star-5">✧</div>
        <div className="star star-6">✦</div>
        <div className="star star-7">·</div>
        <div className="star star-8">✧</div>
      </div>

      {/* ORBITS */}
      <div
        className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full border border-[#73D2DF]/20 transition-all duration-[2000ms] ${
          scene >= 3 ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute h-[650px] w-[650px] rounded-full border border-[#FCF057]/10 transition-all duration-[2500ms] ${
          scene >= 4 ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      />

      {/* BOOK PLANETS */}
      {scene >= 3 && (
        <>
          <div className="book-planet book-planet-1">📕</div>
          <div className="book-planet book-planet-2">📗</div>
          <div className="book-planet book-planet-3">📘</div>
        </>
      )}

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* OING */}
        <div
          className={`relative mb-8 transition-all duration-[1500ms] ${
            scene >= 1
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-12 scale-75 opacity-0"
          }`}
        >
          <div className="meteor-glow" />

          <Image
            src="/52ing.PNG"
            alt="운석 오잉이"
            width={220}
            height={220}
            priority
            className="relative animate-[float_4s_ease-in-out_infinite] object-contain"
          />
        </div>

        {/* STORY */}
        <div className="min-h-[190px]">
          {scene >= 1 && (
            <p className="intro-text mb-4 text-lg text-white/90">
              아직 별똥별이 되지 못한
            </p>
          )}

          {scene >= 2 && (
            <h1 className="intro-title mb-6 text-3xl font-bold text-[#FCF057] sm:text-5xl">
              작은 운석, 오잉.
            </h1>
          )}

          {scene >= 3 && (
            <p className="intro-text text-base leading-8 text-white/75 sm:text-lg">
              어디로 가야 할지 몰라
              <br />
              넓은 우주를 홀로 떠돌고 있었어요.
            </p>
          )}

          {scene >= 4 && (
            <p className="intro-text mt-6 text-base leading-8 text-[#73D2DF] sm:text-lg">
              그러던 어느 날,
              <br />
              오잉은 수많은 이야기들을 발견했어요.
            </p>
          )}

          {scene >= 5 && (
            <div className="intro-final mt-8">
              <p className="text-base leading-8 text-white/80 sm:text-lg">
                책을 하나씩 읽을 때마다,
                <br />
                오잉의 새로운 궤도가 조금씩 만들어졌답니다.
              </p>

              <h2 className="mt-8 text-4xl font-bold text-[#FCF057] sm:text-6xl">
                오잉 도서관
              </h2>

              <p className="mt-3 text-sm text-white/50">
                당신과 함께 새로운 궤도를 찾아요 ☄️
              </p>

              <button
                onClick={enterLibrary}
                className="group mt-8 rounded-full bg-[#FCF057] px-8 py-4 font-bold text-[#1F2A44] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
              >
                새로운 궤도 탐험하기
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SKIP */}
      <button
        onClick={enterLibrary}
        className="absolute bottom-8 right-8 text-sm text-white/40 transition hover:text-white/80"
      >
        우주 여행 건너뛰기 →
      </button>
    </main>
  );
}